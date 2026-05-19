import { NextRequest, NextResponse } from 'next/server'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    await getResend().emails.send({
      from:       FROM_EMAIL,
      to:         ADMIN_EMAIL,
      replyTo:    email,
      subject:    `[Contact ICEKEY] ${subject ?? 'Nouveau message'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #1C1B1F;">Nouveau message de ${name}</h2>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject ?? '—'}</p>
          <hr/>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
