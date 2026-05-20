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

export function newsletterWelcomeHtml(opts: { email: string; firstName?: string; discountCode?: string }) {
  const name = opts.firstName ?? 'toi'
  return `<!DOCTYPE html>
<html><body style="${BASE_STYLES}">
<div style="${CARD_STYLES}">
  <div style="${HEADER_STYLES}">
    <p style="margin:0; color: #00D9FF; font-size: 11px; letter-spacing: 0.3em; font-family: sans-serif;">COLD IS THE NEW GOLD</p>
    <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 28px; letter-spacing: 0.05em;">ICEKEY</h1>
  </div>

  <div style="${BODY_STYLES}">
    <h2 style="margin-top: 0; font-size: 22px;">Bienvenue dans la famille, ${name} ❄️</h2>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">
      Tu fais maintenant partie des insiders ICEKEY.<br/>
      Bonne nouvelle — ta <strong>remise de -5%</strong> est déjà activée sur ta première commande.<br/>
      Aucun code à saisir. Elle s'applique automatiquement au moment du paiement.
    </p>

    ${opts.discountCode ? `
    <div style="background: #1C1B1F; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 0.2em; color: #888; font-family: sans-serif;">TON CODE PROMO</p>
      <p style="margin: 8px 0 0; font-size: 28px; font-weight: 700; letter-spacing: 0.15em; color: #00D9FF;">${opts.discountCode}</p>
      <p style="margin: 8px 0 0; font-size: 12px; color: #666; font-family: sans-serif;">Valable 30 jours · Sans minimum d'achat</p>
    </div>` : `
    <div style="background: #1C1B1F; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 0.2em; color: #888; font-family: sans-serif;">TA REMISE BIENVENUE</p>
      <p style="margin: 10px 0 0; font-size: 52px; font-weight: 700; color: #00D9FF; line-height: 1;">-5%</p>
      <p style="margin: 8px 0 0; font-size: 13px; color: #555; font-family: sans-serif;">Appliquée automatiquement · Première commande uniquement</p>
    </div>`}

    <div style="text-align: center; margin-top: 28px;">
      <a href="https://icekey.shop/shop"
         style="display: inline-block; background: #00D9FF; color: #1C1B1F; padding: 16px 40px; border-radius: 50px; font-weight: 700; font-family: sans-serif; font-size: 14px; letter-spacing: 0.05em; text-decoration: none;">
        Profiter de ma remise →
      </a>
    </div>

    <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 20px;">
      VVS certified · GRA certified · Livraison offerte dès 100€
    </p>
  </div>

  <div style="${FOOTER_STYLES}">
    <p style="margin: 0;">© ${new Date().getFullYear()} ICEKEY · Tous droits réservés</p>
    <p style="margin: 6px 0 0;"><a href="https://icekey.shop" style="color: #00D9FF;">icekey.shop</a></p>
  </div>
</div>
</body></html>`
}

export function abandonedCartHtml(opts: {
  customerName: string
  items:        { name: string; price: number; image?: string }[]
  cartUrl:      string
}) {
  const { customerName, items, cartUrl } = opts
  const itemList = items
    .slice(0, 3)
    .map(
      (i) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0ee; font-size: 14px; color: #1C1B1F;">${i.name}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0ee; text-align: right; font-size: 14px; font-weight: 600; color: #1C1B1F;">${i.price.toFixed(2)} €</td>
      </tr>`
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
    <h2 style="margin-top: 0; font-size: 22px;">You left something icy ❄️</h2>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">
      Hey ${customerName}, your cart is getting cold.<br/>
      Your pieces are still reserved — but not for long.
    </p>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tbody>${itemList}</tbody>
    </table>

    <div style="background: #1C1B1F; border-radius: 12px; padding: 18px 24px; margin: 24px 0; text-align: center;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 0.2em; color: #888; font-family: sans-serif;">STOCK LIMITÉ</p>
      <p style="margin: 8px 0 0; font-size: 15px; color: #00D9FF; font-weight: 700; font-family: sans-serif;">
        Les pièces partent vite. Sécurise la tienne maintenant.
      </p>
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <a href="${cartUrl}"
         style="display: inline-block; background: #00D9FF; color: #1C1B1F; padding: 16px 40px; border-radius: 50px; font-weight: 700; font-family: sans-serif; font-size: 15px; letter-spacing: 0.05em; text-decoration: none;">
        Reserve Your Piece →
      </a>
    </div>

    <p style="margin-top: 24px; font-size: 12px; color: #aaa; text-align: center;">
      30-day guarantee · Free shipping from €100 · VVS certified
    </p>
  </div>

  <div style="${FOOTER_STYLES}">
    <p style="margin: 0;">© ${new Date().getFullYear()} ICEKEY · Tous droits réservés</p>
    <p style="margin: 6px 0 0;"><a href="https://icekey.shop" style="color: #00D9FF;">icekey.shop</a></p>
  </div>
</div>
</body></html>`
}

export function flashSaleHtml(opts: {
  customerName:   string
  discountCode:   string
  discountPct:    number
  expiresHours:   number
  shopUrl:        string
}) {
  const { customerName, discountCode, discountPct, expiresHours, shopUrl } = opts

  return `<!DOCTYPE html>
<html><body style="${BASE_STYLES}">
<div style="${CARD_STYLES}">
  <div style="background: linear-gradient(135deg, #1C1B1F 0%, #0D1220 100%); padding: 32px 40px; text-align: center;">
    <p style="margin:0; color: #FFD700; font-size: 11px; letter-spacing: 0.3em; font-family: sans-serif;">FLASH SALE · LIMITÉ</p>
    <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 28px; letter-spacing: 0.05em;">ICEKEY 🔥</h1>
  </div>

  <div style="${BODY_STYLES}">
    <h2 style="margin-top: 0; font-size: 26px; line-height: 1.2;">
      48h only. <span style="color: #00D9FF;">-${discountPct}%</span> sur tout.
    </h2>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">
      ${customerName}, cette offre expire dans <strong>${expiresHours}h</strong>.<br/>
      Stock limité — les meilleures pièces partent en premier.
    </p>

    <div style="background: #1C1B1F; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 0.2em; color: #888; font-family: sans-serif;">TON CODE FLASH</p>
      <p style="margin: 8px 0 0; font-size: 32px; font-weight: 700; letter-spacing: 0.15em; color: #FFD700;">${discountCode}</p>
      <p style="margin: 8px 0 0; font-size: 12px; color: #666; font-family: sans-serif;">Valable ${expiresHours}h · Tous articles · Sans minimum</p>
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <a href="${shopUrl}"
         style="display: inline-block; background: #00D9FF; color: #1C1B1F; padding: 16px 40px; border-radius: 50px; font-weight: 700; font-family: sans-serif; font-size: 15px; letter-spacing: 0.05em; text-decoration: none;">
        Shop Now — Avant que ça parte →
      </a>
    </div>

    <p style="margin-top: 24px; font-size: 12px; color: #aaa; text-align: center;">
      VVS certified · 30-day guarantee · Livraison offerte dès €100
    </p>
  </div>

  <div style="${FOOTER_STYLES}">
    <p style="margin: 0;">© ${new Date().getFullYear()} ICEKEY · Tous droits réservés</p>
    <p style="margin: 6px 0 0;"><a href="https://icekey.shop" style="color: #00D9FF;">icekey.shop</a></p>
    <p style="margin: 8px 0 0; font-size: 11px;"><a href="https://icekey.shop/unsubscribe" style="color: #aaa;">Se désabonner</a></p>
  </div>
</div>
</body></html>`
}

export function bundleTeaserHtml(opts: {
  customerName: string
  bundleUrl:    string
}) {
  const { customerName, bundleUrl } = opts

  const BUNDLES = [
    { name: 'The Starter',  desc: 'Chaîne + bracelet — ta première pièce icy.',        price: '€149',  badge: '⭐ Popular' },
    { name: 'The Flex',     desc: 'Chaîne + pendentif + bracelet — full statement.',   price: '€279',  badge: '🔥 Best Value' },
    { name: 'The Boss',     desc: 'Set complet — pour ceux qui ne font pas les choses à moitié.', price: '€449', badge: '💎 Premium' },
  ]

  const bundleRows = BUNDLES.map(
    (b) => `
    <div style="border: 1px solid #eee; border-radius: 12px; padding: 20px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
      <div>
        <p style="margin: 0; font-size: 11px; letter-spacing: 0.15em; color: #00D9FF; font-family: sans-serif; font-weight: 700;">${b.badge}</p>
        <p style="margin: 4px 0 0; font-size: 17px; font-weight: 700; color: #1C1B1F;">${b.name}</p>
        <p style="margin: 4px 0 0; font-size: 13px; color: #777;">${b.desc}</p>
      </div>
      <div style="text-align: right; flex-shrink: 0; margin-left: 16px;">
        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #1C1B1F;">${b.price}</p>
        <p style="margin: 2px 0 0; font-size: 11px; color: #22c55e;">Économise 20%</p>
      </div>
    </div>`
  ).join('')

  return `<!DOCTYPE html>
<html><body style="${BASE_STYLES}">
<div style="${CARD_STYLES}">
  <div style="${HEADER_STYLES}">
    <p style="margin:0; color: #00D9FF; font-size: 11px; letter-spacing: 0.3em; font-family: sans-serif;">NEW DROP</p>
    <h1 style="margin: 8px 0 0; color: #ffffff; font-size: 28px; letter-spacing: 0.05em;">ICEKEY</h1>
  </div>

  <div style="${BODY_STYLES}">
    <h2 style="margin-top: 0; font-size: 22px; line-height: 1.3;">
      New combo just dropped. 🧊<br/>
      <span style="font-size: 16px; color: #555; font-weight: 400;">Build your full look, save 20%.</span>
    </h2>
    <p style="color: #555; font-size: 14px; line-height: 1.7;">
      ${customerName}, on a créé 3 bundles signés ICEKEY.<br/>
      Choisis ton niveau — et passe au niveau supérieur.
    </p>

    <div style="margin: 24px 0;">
      ${bundleRows}
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <a href="${bundleUrl}"
         style="display: inline-block; background: #00D9FF; color: #1C1B1F; padding: 16px 40px; border-radius: 50px; font-weight: 700; font-family: sans-serif; font-size: 15px; letter-spacing: 0.05em; text-decoration: none;">
        See the combo →
      </a>
    </div>

    <p style="margin-top: 24px; font-size: 12px; color: #aaa; text-align: center;">
      Stock limité · VVS certified · 30-day guarantee
    </p>
  </div>

  <div style="${FOOTER_STYLES}">
    <p style="margin: 0;">© ${new Date().getFullYear()} ICEKEY · Tous droits réservés</p>
    <p style="margin: 6px 0 0;"><a href="https://icekey.shop" style="color: #00D9FF;">icekey.shop</a></p>
    <p style="margin: 8px 0 0; font-size: 11px;"><a href="https://icekey.shop/unsubscribe" style="color: #aaa;">Se désabonner</a></p>
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
