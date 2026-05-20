import { NextResponse }              from 'next/server'
import { getResend }                 from '@/lib/email/resend'
import { newsletterWelcomeHtml }     from '@/lib/email/templates'
import { escapeHtml }                from '@/lib/utils/escapeHtml'

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const safeName  = firstName ? escapeHtml(String(firstName)) : 'là'
    const safeEmail = escapeHtml(String(email))

    const resend = getResend()
    await resend.emails.send({
      from:    'ICEKEY <bienvenue@icekey.shop>',
      to:      safeEmail,
      subject: `Bienvenue dans la famille ICEKEY ❄️ — ta remise -5% est activée`,
      html:    newsletterWelcomeHtml({
        email:     safeEmail,
        firstName: safeName !== 'là' ? safeName : undefined,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch {
    /* Non-critical — don't block the user flow */
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
