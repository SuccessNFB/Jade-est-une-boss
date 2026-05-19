import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getResend, FROM_EMAIL } from '@/lib/email/resend'
import { newsletterWelcomeHtml } from '@/lib/email/templates'
import { rateLimit, rateLimitKey } from '@/lib/utils/rateLimit'

const DISCOUNT_CODE = 'BIENVENUE10'

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(rateLimitKey(req), { limit: 3, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
  }

  try {
    const { email, source } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email, source: source ?? 'homepage' })

    // Duplicate = already subscribed, not an error for the user
    if (error && error.code !== '23505') {
      console.error('Newsletter insert error:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    // Send welcome email only for new subscribers
    if (!error) {
      await getResend().emails.send({
        from:    FROM_EMAIL,
        to:      email,
        subject: `Votre -10% vous attend chez ICEKEY`,
        html:    newsletterWelcomeHtml({ email, discountCode: DISCOUNT_CODE }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
