import { NextRequest, NextResponse } from 'next/server'
import { stripe }                   from '@/lib/stripe/client'
import { createClient }             from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { getWelcomeCouponId }       from '@/lib/stripe/welcomeCoupon'
import type { CartItem }            from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    // Validate quantities
    for (const item of items) {
      if (!item.product?.id || item.quantity < 1 || item.quantity > 10) {
        return NextResponse.json({ error: 'Quantité invalide' }, { status: 400 })
      }
    }

    /* ── Check if logged-in user is a first-timer ───────────── */
    let isFirstOrder = false
    const authClient = await createClient()
    const { data: { user } } = await authClient.auth.getUser()

    if (user) {
      const { count } = await authClient
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
      isFirstOrder = (count ?? 0) === 0
    }

    /* ── Fetch real prices from DB ────────────────────────── */
    const supabase = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const productIds  = items.map((i) => i.product.id)
    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('id, name, description, price, images, sku, stock, is_active')
      .in('id', productIds)
      .eq('is_active', true)

    if (dbError || !dbProducts?.length) {
      return NextResponse.json({ error: 'Produits introuvables' }, { status: 400 })
    }

    // Map DB products for fast lookup
    const dbMap = new Map(dbProducts.map((p) => [p.id, p]))

    // Verify all items exist and are in stock
    for (const item of items) {
      const p = dbMap.get(item.product.id)
      if (!p)                       return NextResponse.json({ error: `Produit introuvable` }, { status: 400 })
      if (p.stock < item.quantity)  return NextResponse.json({ error: `Stock insuffisant pour ${p.name}` }, { status: 400 })
    }

    const lineItems = items.map((item) => {
      const p = dbMap.get(item.product.id)!
      const images = (p.images as { url: string }[])
      return {
        price_data: {
          currency:    'eur',
          unit_amount: Math.round(p.price * 100), // server-side price
          product_data: {
            name:        p.name,
            description: p.description?.substring(0, 500),
            images:      images[0]?.url
              ? [`${process.env.NEXT_PUBLIC_SITE_URL}${images[0].url}`]
              : [],
            metadata: {
              product_id: p.id,
              sku:        p.sku,
              customization: item.customization ? JSON.stringify(item.customization) : '',
            },
          },
        },
        quantity: item.quantity,
      }
    })

    const subtotal = items.reduce((sum, i) => {
      const p = dbMap.get(i.product.id)!
      return sum + p.price * i.quantity
    }, 0)

    const shippingOptions = subtotal >= 100
      ? [{ shipping_rate_data: { type: 'fixed_amount' as const, fixed_amount: { amount: 0, currency: 'eur' }, display_name: 'Livraison offerte' } }]
      : [{ shipping_rate_data: {
            type: 'fixed_amount' as const,
            fixed_amount: { amount: 990, currency: 'eur' },
            display_name: 'Livraison standard',
            delivery_estimate: {
              minimum: { unit: 'business_day' as const, value: 2 },
              maximum: { unit: 'business_day' as const, value: 5 },
            },
          },
        }]

    /* ── Build Stripe session options ────────────────────── */
    const welcomeDiscount = isFirstOrder
      ? [{ coupon: await getWelcomeCouponId() }]
      : undefined

    const session = await stripe.checkout.sessions.create({
      payment_method_types:        ['card'],
      mode:                        'payment',
      locale:                      'fr',
      line_items:                  lineItems,
      shipping_address_collection: { allowed_countries: ['FR', 'BE', 'CH', 'LU', 'DE', 'ES', 'IT'] },
      shipping_options:            shippingOptions,
      /* discounts and allow_promotion_codes are mutually exclusive in Stripe */
      ...(welcomeDiscount
        ? { discounts: welcomeDiscount }
        : { allow_promotion_codes: true }),
      phone_number_collection:     { enabled: true },
      customer_email:              user?.email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata:    { source: 'icekey-web', user_id: user?.id ?? '', first_order: String(isFirstOrder) },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}
