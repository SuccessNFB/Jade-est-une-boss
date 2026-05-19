import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    await supabaseAdmin.from('orders').insert({
      stripe_session_id: session.id,
      customer_email:    session.customer_details?.email ?? '',
      customer_name:     session.customer_details?.name  ?? '',
      total_amount:      (session.amount_total ?? 0) / 100,
      currency:          session.currency ?? 'eur',
      status:            'paid',
      shipping_address:  session.shipping_details?.address ?? null,
      items:             [],
    })
  }

  return NextResponse.json({ received: true })
}
