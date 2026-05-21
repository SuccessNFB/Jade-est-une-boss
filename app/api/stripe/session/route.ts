import { NextRequest, NextResponse } from 'next/server'
import { stripe }                   from '@/lib/stripe/client'

/* Returns lightweight session data needed for the conversion pixel */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('id')
  if (!sessionId) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })

    const items = (session.line_items?.data ?? []).map((li) => ({
      name:     li.description ?? '',
      price:    (li.amount_total ?? 0) / 100 / (li.quantity ?? 1),
      quantity: li.quantity ?? 1,
    }))

    return NextResponse.json({
      id:       session.id,
      value:    (session.amount_total ?? 0) / 100,
      currency: session.currency?.toUpperCase() ?? 'EUR',
      items,
    })
  } catch {
    return NextResponse.json({ error: 'Session introuvable' }, { status: 404 })
  }
}
