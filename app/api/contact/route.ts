import { NextRequest, NextResponse } from 'next/server'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'
import { escapeHtml } from '@/lib/utils/escapeHtml'
import { rateLimit, rateLimitKey } from '@/lib/utils/rateLimit'

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(rateLimitKey(req), { limit: 5, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
  }

  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const safeName    = escapeHtml(String(name).slice(0, 100))
    const safeEmail   = escapeHtml(String(email).slice(0, 200))
    const safeSubject = escapeHtml(String(subject ?? '').slice(0, 200))
    const safeMessage = escapeHtml(String(message).slice(0, 5000))

    await getResend().emails.send({
      from:    FROM_EMAIL,
      to:      ADMIN_EMAIL,
      replyTo: email,
      subject: `[Contact ICEKEY] ${safeSubject || 'Nouveau message'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #1C1B1F;">Nouveau message de ${safeName}</h2>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Sujet :</strong> ${safeSubject || '—'}</p>
          <hr/>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
