import { NextRequest, NextResponse } from 'next/server'
import { stripe }                   from '@/lib/stripe/client'
import { createClient }             from '@supabase/supabase-js'
import { getResend, FROM_EMAIL }    from '@/lib/email/resend'
import { orderConfirmationHtml, supplierOrderHtml } from '@/lib/email/templates'
import type Stripe from 'stripe'

const SITE_URL      = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://icekey.shop'
const SUPPLIER_EMAIL = process.env.SUPPLIER_EMAIL

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    /* ── Fetch line items with product metadata ── */
    const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
      limit:  100,
      expand: ['data.price.product'],
    })

    const items = lineItemsResponse.data.map((li) => ({
      name:        li.description ?? '',
      quantity:    li.quantity ?? 1,
      price:       (li.amount_total ?? 0) / 100 / (li.quantity ?? 1),
      amount_total: (li.amount_total ?? 0) / 100,
    }))

    const totalAmount   = (session.amount_total ?? 0) / 100
    const customerEmail = session.customer_details?.email ?? ''
    const customerName  = session.customer_details?.name  ?? ''
    const phone         = session.customer_details?.phone ?? null
    const addr          = session.shipping_details?.address

    /* ── Save order to Supabase ── */
    const { error: insertError } = await supabase.from('orders').insert({
      stripe_session_id: session.id,
      customer_email:    customerEmail,
      customer_name:     customerName,
      customer_phone:    phone,
      total_amount:      totalAmount,
      currency:          session.currency ?? 'eur',
      status:            'paid',
      shipping_address:  addr ?? null,
      items,
    })

    if (insertError) throw new Error(`Order insert failed: ${insertError.message}`)

    /* ── Customer confirmation email ── */
    if (customerEmail) {
      await getResend().emails.send({
        from:    FROM_EMAIL,
        to:      customerEmail,
        subject: `Votre commande ICEKEY est confirmée ✓`,
        html:    orderConfirmationHtml({
          customerName,
          orderId:      session.id,
          items,
          totalAmount,
          shippingFree: totalAmount >= 100,
        }),
      }).catch(() => {})
    }

    /* ── Supplier forwarding email ── */
    if (SUPPLIER_EMAIL && addr) {
      /* Collect product_ids from Stripe metadata to look up images + supplier_sku */
      const productIds: string[] = []
      for (const li of lineItemsResponse.data) {
        const prod = li.price?.product
        if (prod && typeof prod === 'object' && 'metadata' in prod) {
          const pid = (prod as Stripe.Product).metadata?.product_id
          if (pid) productIds.push(pid)
        }
      }

      /* Fetch product data from Supabase */
      const dbMap = new Map<string, { images: { url: string }[]; sku: string; supplier_sku?: string }>()
      if (productIds.length) {
        const { data: dbProducts } = await supabase
          .from('products')
          .select('id, images, sku, supplier_sku')
          .in('id', productIds)
        for (const p of dbProducts ?? []) {
          dbMap.set(p.id, p)
        }
      }

      /* Build supplier items with images */
      const supplierItems = lineItemsResponse.data.map((li) => {
        const prod    = li.price?.product
        const pid     = (typeof prod === 'object' && prod && 'metadata' in prod)
          ? (prod as Stripe.Product).metadata?.product_id
          : undefined
        const dbProd  = pid ? dbMap.get(pid) : undefined
        const imgPath = dbProd?.images?.[0]?.url
        const imgUrl  = imgPath
          ? (imgPath.startsWith('http') ? imgPath : `${SITE_URL}${imgPath}`)
          : undefined

        return {
          name:         li.description ?? '',
          quantity:     li.quantity ?? 1,
          sku:          dbProd?.sku ?? '',
          supplierSku:  dbProd?.supplier_sku ?? undefined,
          imageUrl:     imgUrl,
        }
      })

      await getResend().emails.send({
        from:    `ICEKEY Orders <contact@icekey.shop>`,
        to:      SUPPLIER_EMAIL,
        subject: `New Order #${session.id.slice(-8).toUpperCase()} — Please ship`,
        html:    supplierOrderHtml({
          orderId:  session.id,
          items:    supplierItems,
          shipping: {
            name:         customerName,
            line1:        addr.line1 ?? '',
            line2:        addr.line2,
            city:         addr.city ?? '',
            postal_code:  addr.postal_code ?? '',
            country:      addr.country ?? '',
            phone,
          },
        }),
      }).catch(() => {})
    }
  }

  return NextResponse.json({ received: true })
}
