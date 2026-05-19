const BASE_STYLES = `
  font-family: 'Georgia', serif;
  background-color: #f9f9f7;
  margin: 0; padding: 0;
`

const CARD_STYLES = `
  max-width: 560px;
  margin: 40px auto;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`

const HEADER_STYLES = `
  background: #1C1B1F;
  padding: 32px 40px;
  text-align: center;
`

const BODY_STYLES = `
  padding: 40px;
  color: #1C1B1F;
`

const FOOTER_STYLES = `
  padding: 24px 40px;
  background: #f5f5f3;
  text-align: center;
  font-size: 12px;
  color: #888;
`

interface OrderItem {
  name:     string
  quantity: number
  price:    number
}

export function orderConfirmationHtml(opts: {
  customerName:  string
  orderId:       string
  items:         OrderItem[]
  totalAmount:   number
  shippingFree:  boolean
}) {
  const { customerName, orderId, items, totalAmount, shippingFree } = opts

  const itemRows = items
    .map(
      (i) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0ee; font-size: 14px;">${i.name}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0ee; text-align: center; font-size: 14px; color: #666;">×${i.quantity}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0ee; text-align: right; font-size: 14px; font-weight: 600;">${(i.price * i.quantity).toFixed(2)} €</td>
      </tr>
    `
    )
    .join('')

  return `<!DOCTYPE html>
<html><body style="${BASE_STYLES}">
<div style="${CARD_STYLES}">
  <div style="${HEADER_STYLES}">
    <p style="margin:0; color: #00D9FF; font-size: 11px; letter-spacing: 0.3em; font-family: sans-serif;">COLD IS THE NEW GOLD</p>
    <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 28px; letter-spacing: 0.05em;">ICEKEY</h1>
  </div>

  <div style="${BODY_STYLES}">
    <h2 style="margin-top: 0; font-size: 20px;">Commande confirmée ✓</h2>
    <p style="color: #555; font-size: 14px; line-height: 1.6;">
      Bonjour ${customerName},<br/>
      Merci pour votre confiance. Votre commande <strong>#${orderId.slice(0, 8).toUpperCase()}</strong> a bien été reçue et est en cours de préparation.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
      <thead>
        <tr>
          <th style="text-align: left; font-size: 11px; letter-spacing: 0.1em; color: #999; padding-bottom: 8px; border-bottom: 2px solid #1C1B1F;">ARTICLE</th>
          <th style="text-align: center; font-size: 11px; letter-spacing: 0.1em; color: #999; padding-bottom: 8px; border-bottom: 2px solid #1C1B1F;">QTÉ</th>
          <th style="text-align: right; font-size: 11px; letter-spacing: 0.1em; color: #999; padding-bottom: 8px; border-bottom: 2px solid #1C1B1F;">PRIX</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    <div style="text-align: right; margin-top: 8px;">
      <p style="font-size: 13px; color: #888; margin: 4px 0;">
        Livraison : ${shippingFree ? '<span style="color:#22c55e">Offerte</span>' : '9,90 €'}
      </p>
      <p style="font-size: 18px; font-weight: 700; margin: 4px 0;">
        Total : ${totalAmount.toFixed(2)} €
      </p>
    </div>

    <div style="background: #f9f9f7; border-radius: 10px; padding: 20px; margin-top: 28px; font-size: 13px; color: #555;">
      <strong>Délai d'expédition</strong><br/>
      Votre bijou est préparé avec soin et expédié sous <strong>48h ouvrées</strong>.<br/>
      Vous recevrez un email de suivi dès l'envoi.
    </div>

    <p style="margin-top: 28px; font-size: 13px; color: #888; text-align: center;">
      Une question ? Répondez à cet email — on vous répond en moins de 24h.
    </p>
  </div>

  <div style="${FOOTER_STYLES}">
    <p style="margin: 0;">© ${new Date().getFullYear()} ICEKEY · Tous droits réservés</p>
    <p style="margin: 6px 0 0;"><a href="https://icekey.shop" style="color: #00D9FF;">icekey.shop</a></p>
  </div>
</div>
</body></html>`
}

export function newsletterWelcomeHtml(opts: { email: string; discountCode: string }) {
  return `<!DOCTYPE html>
<html><body style="${BASE_STYLES}">
<div style="${CARD_STYLES}">
  <div style="${HEADER_STYLES}">
    <p style="margin:0; color: #00D9FF; font-size: 11px; letter-spacing: 0.3em; font-family: sans-serif;">COLD IS THE NEW GOLD</p>
    <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 28px; letter-spacing: 0.05em;">ICEKEY</h1>
  </div>

  <div style="${BODY_STYLES}">
    <h2 style="margin-top: 0; font-size: 22px;">Bienvenue dans la famille ❄️</h2>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">
      Vous faites maintenant partie des insiders ICEKEY.<br/>
      En remerciement, voici votre code de bienvenue pour <strong>-10%</strong> sur votre première commande :
    </p>

    <div style="background: #1C1B1F; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 0.2em; color: #888; font-family: sans-serif;">VOTRE CODE</p>
      <p style="margin: 8px 0 0; font-size: 28px; font-weight: 700; letter-spacing: 0.15em; color: #00D9FF;">${opts.discountCode}</p>
    </div>

    <p style="font-size: 13px; color: #888; text-align: center; margin-bottom: 28px;">
      Valable 30 jours · Sans minimum d'achat
    </p>

    <div style="text-align: center;">
      <a href="https://icekey.shop/shop"
         style="display: inline-block; background: #00D9FF; color: #1C1B1F; padding: 14px 36px; border-radius: 50px; font-weight: 700; font-family: sans-serif; font-size: 14px; letter-spacing: 0.05em; text-decoration: none;">
        Découvrir la collection
      </a>
    </div>
  </div>

  <div style="${FOOTER_STYLES}">
    <p style="margin: 0;">© ${new Date().getFullYear()} ICEKEY · Tous droits réservés</p>
    <p style="margin: 6px 0 0;"><a href="https://icekey.shop" style="color: #00D9FF;">icekey.shop</a></p>
  </div>
</div>
</body></html>`
}

export function customRequestNotificationHtml(opts: {
  customerName:  string
  customerEmail: string
  configuration: Record<string, unknown>
  notes?:        string
}) {
  const config = JSON.stringify(opts.configuration, null, 2)
  return `<!DOCTYPE html>
<html><body style="${BASE_STYLES}">
<div style="${CARD_STYLES}">
  <div style="${HEADER_STYLES}">
    <h1 style="margin: 0; color: #FFD700; font-size: 20px; letter-spacing: 0.05em;">ICEKEY — Nouvelle demande sur mesure</h1>
  </div>
  <div style="${BODY_STYLES}">
    <p><strong>Client :</strong> ${opts.customerName} (${opts.customerEmail})</p>
    <p><strong>Configuration :</strong></p>
    <pre style="background:#f5f5f3; padding:16px; border-radius:8px; font-size:12px; overflow:auto;">${config}</pre>
    ${opts.notes ? `<p><strong>Notes :</strong> ${opts.notes}</p>` : ''}
  </div>
</div>
</body></html>`
}
