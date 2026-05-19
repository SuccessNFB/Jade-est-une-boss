import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createClient } from '@supabase/supabase-js'
import { getResend, FROM_EMAIL } from '@/lib/email/resend'
import { orderConfirmationHtml } from '@/lib/email/templates'
import type Stripe from 'stripe'

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

    // Fetch real line items from Stripe
    const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
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

    await supabase.from('orders').insert({
      stripe_session_id: session.id,
      customer_email:    customerEmail,
      customer_name:     customerName,
      customer_phone:    session.customer_details?.phone ?? null,
      total_amount:      totalAmount,
      currency:          session.currency ?? 'eur',
      status:            'paid',
      shipping_address:  session.shipping_details?.address ?? null,
      items,
    })

    // Send order confirmation email
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
      })
    }
  }

  return NextResponse.json({ received: true })
}
