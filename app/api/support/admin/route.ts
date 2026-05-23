import { NextRequest, NextResponse }  from 'next/server'
import { createClient }              from '@/lib/supabase/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { ADMIN_EMAIL }               from '@/lib/email/resend'
import { getResend }                 from '@/lib/email/resend'
import { escapeHtml }                from '@/lib/utils/escapeHtml'

const VALID_STATUSES = ['open', 'in_progress', 'resolved', 'closed'] as const

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) return null
  return user
}

/* GET — list all tickets */
export async function GET(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const status = new URL(req.url).searchParams.get('status') ?? 'open'
  const admin  = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const query = admin
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (status !== 'all') query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  return NextResponse.json({ tickets: data ?? [] })
}

/* PATCH — update status + optional reply */
export async function PATCH(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { ticketId, status, reply } = await req.json()
  if (!ticketId) return NextResponse.json({ error: 'ticketId requis' }, { status: 400 })
  if (status && !VALID_STATUSES.includes(status)) return NextResponse.json({ error: 'Status invalide' }, { status: 400 })

  const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (status) update.status = status
  if (reply)  update.admin_reply = escapeHtml(String(reply).slice(0, 5000))

  const { data: ticket, error } = await admin
    .from('support_tickets')
    .update(update)
    .eq('id', ticketId)
    .select('customer_email, customer_name, category, admin_reply')
    .single()

  if (error) return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })

  /* Email the customer if a reply was added */
  if (reply && ticket?.customer_email) {
    await getResend().emails.send({
      from:    'ICEKEY Support <contact@icekey.shop>',
      to:      ticket.customer_email,
      subject: `Réponse à votre demande ICEKEY (${ticket.category})`,
      html: `
        <div style="font-family:sans-serif; max-width:560px; margin:0 auto; background:#f9f9f7; padding:24px;">
          <h2 style="color:#1C1B1F;">Bonjour ${ticket.customer_name || ''} 👋</h2>
          <p style="font-size:14px; color:#555;">Notre équipe a répondu à ta demande :</p>
          <div style="background:#fff; border-radius:8px; border:1px solid #eee; padding:16px; margin:16px 0;">
            <p style="white-space:pre-wrap; font-size:14px; color:#333; margin:0;">${escapeHtml(reply)}</p>
          </div>
          <p style="font-size:12px; color:#999;">
            Pour continuer la conversation, réponds directement à cet email ou contacte-nous à
            <a href="mailto:contact@icekey.shop" style="color:#D4AF37;">contact@icekey.shop</a>.
          </p>
        </div>
      `,
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
