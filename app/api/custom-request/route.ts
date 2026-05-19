import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/resend'
import { customRequestNotificationHtml } from '@/lib/email/templates'
import { escapeHtml } from '@/lib/utils/escapeHtml'
import { rateLimit, rateLimitKey } from '@/lib/utils/rateLimit'

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(rateLimitKey(req), { limit: 5, windowMs: 60_000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Trop de requêtes' }, { status: 429 })
  }

  try {
    const { configuration, customer_email, customer_name, notes } = await req.json()

    if (!customer_email || !configuration) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from('custom_requests')
      .insert({
        configuration,
        customer_email,
        customer_name: customer_name ?? '',
        notes:         notes ?? null,
        status:        'pending',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Custom request insert error:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    const safeName = escapeHtml(String(customer_name ?? '').slice(0, 100))
    const ref      = data.id.slice(0, 8).toUpperCase()

    await getResend().emails.send({
      from:    FROM_EMAIL,
      to:      ADMIN_EMAIL,
      subject: `[ICEKEY] Nouvelle demande sur mesure — ${safeName || customer_email}`,
      html:    customRequestNotificationHtml({ customerName: customer_name ?? '', customerEmail: customer_email, configuration, notes }),
    })

    await getResend().emails.send({
      from:    FROM_EMAIL,
      to:      customer_email,
      subject: 'Votre demande sur mesure ICEKEY a bien été reçue',
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: #1C1B1F; padding: 32px 40px; text-align: center;">
            <h1 style="margin: 0; color: #fff; font-size: 24px; letter-spacing: 0.05em;">ICEKEY</h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="margin-top:0;">Demande reçue ✓</h2>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Bonjour ${safeName},<br/>
              Votre demande de pendentif sur mesure a bien été enregistrée (réf. <strong>#${ref}</strong>).<br/><br/>
              Un membre de l'équipe vous contactera sous <strong>48h ouvrées</strong> avec un devis personnalisé.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error('Custom request error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
