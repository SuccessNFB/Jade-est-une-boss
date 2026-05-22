import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createClient }              from '@/lib/supabase/server'
import { getResend, ADMIN_EMAIL }    from '@/lib/email/resend'
import { escapeHtml }                from '@/lib/utils/escapeHtml'
import { rateLimit, rateLimitKey }   from '@/lib/utils/rateLimit'

const CATEGORIES = ['livraison', 'retour', 'produit', 'garantie', 'paiement', 'autre'] as const

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(rateLimitKey(req), { limit: 5, windowMs: 60_000 })
  if (!allowed) return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let body: { category: string; order_id?: string; message: string; email?: string; name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload invalide' }, { status: 400 })
  }

  const { category, order_id, message, email, name } = body

  if (!CATEGORIES.includes(category as typeof CATEGORIES[number]) || !message?.trim()) {
    return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
  }

  const customerEmail = user?.email ?? email ?? ''
  const customerName  = user?.user_metadata?.first_name ?? name ?? ''

  if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  }

  const safeMessage = escapeHtml(message.trim().slice(0, 5000))
  const safeOrderId = order_id ? escapeHtml(order_id.trim().slice(0, 100)) : null
  const safeName    = escapeHtml((customerName ?? '').slice(0, 100))
  const safeEmail   = escapeHtml(customerEmail)

  const admin = createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: ticket, error } = await admin
    .from('support_tickets')
    .insert({
      customer_email: safeEmail,
      customer_name:  safeName,
      user_id:        user?.id ?? null,
      category,
      order_id:       safeOrderId,
      message:        safeMessage,
      status:         'open',
    })
    .select('id')
    .single()

  if (error) {
    console.error('Ticket insert error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }

  /* Notify admin */
  await getResend().emails.send({
    from:    `ICEKEY SAV <contact@icekey.shop>`,
    to:      ADMIN_EMAIL,
    replyTo: safeEmail,
    subject: `[SAV #${ticket.id.slice(-6).toUpperCase()}] ${category} — ${safeName || safeEmail}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f7; padding: 24px;">
        <h2 style="color:#1C1B1F; margin-bottom: 4px;">Nouveau ticket SAV</h2>
        <p style="color:#999; font-size: 12px; margin-bottom: 20px;">
          ID : ${ticket.id} · Catégorie : <strong>${category}</strong>
        </p>
        <table style="width:100%; font-size:14px; border-collapse:collapse;">
          <tr><td style="padding:6px 0; color:#666; width:120px;">Client</td><td><strong>${safeName || '—'}</strong></td></tr>
          <tr><td style="padding:6px 0; color:#666;">Email</td><td>${safeEmail}</td></tr>
          ${safeOrderId ? `<tr><td style="padding:6px 0; color:#666;">Commande</td><td>${safeOrderId}</td></tr>` : ''}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #eee;">
          <p style="white-space: pre-wrap; font-size: 14px; color: #333; margin: 0;">${safeMessage}</p>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #999;">
          Répondre directement à cet email pour contacter le client.
        </p>
      </div>
    `,
  }).catch(() => {})

  return NextResponse.json({ ok: true, ticketId: ticket.id })
}
