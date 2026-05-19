import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import type { CartItem } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency:     'eur',
        unit_amount:  Math.round(item.product.price * 100),
        product_data: {
          name:        item.product.name,
          description: item.product.description?.substring(0, 500),
          images:      item.product.images[0]?.url
            ? [`${process.env.NEXT_PUBLIC_SITE_URL}${item.product.images[0].url}`]
            : [],
          metadata: {
            product_id:   item.product.id,
            sku:          item.product.sku,
            customization: item.customization ? JSON.stringify(item.customization) : '',
          },
        },
      },
      quantity: item.quantity,
    }))

    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    const shipping  = subtotal >= 100 ? [] : [{
      shipping_rate_data: {
        type:            'fixed_amount' as const,
        fixed_amount:    { amount: 990, currency: 'eur' },
        display_name:    'Livraison standard',
        delivery_estimate: {
          minimum: { unit: 'business_day' as const, value: 2 },
          maximum: { unit: 'business_day' as const, value: 5 },
        },
      },
    }]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:                 'payment',
      locale:               'fr',
      line_items:           lineItems,
      shipping_address_collection: { allowed_countries: ['FR', 'BE', 'CH', 'LU', 'DE', 'ES', 'IT'] },
      shipping_options:            subtotal >= 100
        ? [{ shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'eur' }, display_name: 'Livraison offerte' } }]
        : shipping,
      allow_promotion_codes: true,
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: {
        source: 'icekey-web',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}
