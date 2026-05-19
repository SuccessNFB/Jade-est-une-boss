/**
 * ICEKEY — Supabase Edge Function: stock-alert
 *
 * Cron: every day at 09:00 Paris time (08:00 UTC in winter / 07:00 UTC in summer)
 * Schedule: "0 8 * * *"  (adjust to "0 7 * * *" during CEST)
 *
 * Queries products WHERE stock <= 3 AND is_active = true.
 * Sends an alert email to admin via Resend if any are found.
 *
 * Deploy:
 *   supabase functions deploy stock-alert --no-verify-jwt
 *
 * Secrets required (set via `supabase secrets set`):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
 */

const FROM_EMAIL  = 'ICEKEY <contact@icekey.shop>'
const ADMIN_EMAIL = 'contact@icekey.shop'
const SITE_URL    = 'https://icekey.shop'

// ─── Types ────────────────────────────────────────────────────────────────────

interface LowStockProduct {
  id:       string
  name:     string
  sku:      string
  category: string
  stock:    number
  price:    number
}

// ─── Supabase REST helper ─────────────────────────────────────────────────────

async function fetchLowStockProducts(
  supabaseUrl: string,
  serviceKey: string
): Promise<LowStockProduct[]> {
  const params = new URLSearchParams({
    select:    'id,name,sku,category,stock,price',
    stock:     'lte.3',
    is_active: 'eq.true',
    order:     'stock.asc',
  })

  const res = await fetch(`${supabaseUrl}/rest/v1/products?${params}`, {
    headers: {
      apikey:        serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept:        'application/json',
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase products query failed: ${res.status} ${text}`)
  }

  return res.json() as Promise<LowStockProduct[]>
}

// ─── Email builder ────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildAlertHtml(products: LowStockProduct[]): string {
  const outOfStock   = products.filter((p) => p.stock === 0)
  const criticalStock = products.filter((p) => p.stock > 0 && p.stock <= 3)
  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/Paris',
  })

  const thS = 'text-align:left;font-size:11px;letter-spacing:0.1em;color:#999;padding:8px 0;border-bottom:1px solid #e8e8e8;'
  const tdS = 'padding:10px 0;border-bottom:1px solid #f0f0ee;font-size:14px;vertical-align:top;'

  function buildRows(list: LowStockProduct[], isOutOfStock: boolean): string {
    return list.map((p) => `
      <tr>
        <td style="${tdS}font-weight:600;">${escapeHtml(p.name)}</td>
        <td style="${tdS}font-size:12px;color:#666;">${escapeHtml(p.sku)}</td>
        <td style="${tdS}text-transform:capitalize;">${escapeHtml(p.category)}</td>
        <td style="${tdS}text-align:right;">
          <span style="display:inline-block;background:${isOutOfStock ? '#ef4444' : '#f59e0b'};color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;font-family:sans-serif;">
            ${p.stock === 0 ? 'RUPTURE' : `${p.stock} restant${p.stock > 1 ? 's' : ''}`}
          </span>
        </td>
        <td style="${tdS}text-align:right;">${p.price.toFixed(2)} €</td>
      </tr>`).join('')
  }

  const outOfStockSection = outOfStock.length > 0 ? `
    <h3 style="color:#ef4444;font-size:16px;margin:24px 0 8px;">Ruptures de stock (${outOfStock.length})</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="${thS}">Produit</th>
          <th style="${thS}">SKU</th>
          <th style="${thS}">Catégorie</th>
          <th style="${thS}text-align:right;">Stock</th>
          <th style="${thS}text-align:right;">Prix</th>
        </tr>
      </thead>
      <tbody>${buildRows(outOfStock, true)}</tbody>
    </table>` : ''

  const criticalSection = criticalStock.length > 0 ? `
    <h3 style="color:#f59e0b;font-size:16px;margin:24px 0 8px;">Stock critique — 1 à 3 unités (${criticalStock.length})</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="${thS}">Produit</th>
          <th style="${thS}">SKU</th>
          <th style="${thS}">Catégorie</th>
          <th style="${thS}text-align:right;">Stock</th>
          <th style="${thS}text-align:right;">Prix</th>
        </tr>
      </thead>
      <tbody>${buildRows(criticalStock, false)}</tbody>
    </table>` : ''

  const year = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>ICEKEY — Alerte Stock</title></head>
<body style="font-family:'Georgia',serif;background:#f9f9f7;margin:0;padding:0;">
<div style="max-width:680px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <div style="background:#1C1B1F;padding:32px 40px;text-align:center;">
    <p style="margin:0;color:#00D9FF;font-size:11px;letter-spacing:0.3em;font-family:sans-serif;">COLD IS THE NEW GOLD</p>
    <h1 style="margin:8px 0 0;color:#fff;font-size:28px;letter-spacing:0.05em;">ICEKEY</h1>
    <p style="margin:12px 0 0;color:#ef4444;font-size:13px;font-family:sans-serif;font-weight:700;">⚠ ALERTE STOCK — ${today}</p>
  </div>

  <div style="padding:40px;color:#1C1B1F;">
    <p style="font-size:15px;margin-top:0;">
      <strong>${products.length} produit${products.length > 1 ? 's' : ''}</strong> nécessite${products.length > 1 ? 'nt' : ''} votre attention immédiate.
    </p>

    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;margin-bottom:24px;font-size:13px;color:#991b1b;">
      Action requise : réapprovisionner les références ci-dessous dès que possible pour éviter les ventes manquées.
    </div>

    ${outOfStockSection}
    ${criticalSection}

    <div style="text-align:center;margin-top:32px;">
      <a href="${SITE_URL}"
         style="display:inline-block;background:#1C1B1F;color:#fff;padding:14px 36px;border-radius:50px;font-weight:700;font-family:sans-serif;font-size:14px;letter-spacing:0.05em;text-decoration:none;">
        Gérer les stocks
      </a>
    </div>
  </div>

  <div style="padding:24px 40px;background:#f5f5f3;text-align:center;font-size:12px;color:#888;">
    <p style="margin:0;">&copy; ${year} ICEKEY &middot; Alerte automatique quotidienne</p>
    <p style="margin:6px 0 0;"><a href="${SITE_URL}" style="color:#00D9FF;">${SITE_URL.replace('https://', '')}</a></p>
  </div>
</div>
</body>
</html>`
}

// ─── Main handler ─────────────────────────────────────────────────────────────

Deno.serve(async (_req: Request) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const resendKey   = Deno.env.get('RESEND_API_KEY')

    if (!supabaseUrl || !serviceKey || !resendKey) {
      throw new Error('Missing required environment variables')
    }

    // ── 1. Fetch low-stock products ───────────────────────────────────────────
    const products = await fetchLowStockProducts(supabaseUrl, serviceKey)

    if (products.length === 0) {
      console.log('[stock-alert] All stocks OK — no alert needed.')
      return new Response(
        JSON.stringify({ success: true, alertSent: false, reason: 'All stocks OK' }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // ── 2. Build and send alert email ─────────────────────────────────────────
    const html    = buildAlertHtml(products)
    const outCount = products.filter((p) => p.stock === 0).length
    const subject = outCount > 0
      ? `ICEKEY ⚠ ${outCount} rupture${outCount > 1 ? 's' : ''} + ${products.length - outCount} stock${products.length - outCount > 1 ? 's' : ''} critique${products.length - outCount > 1 ? 's' : ''}`
      : `ICEKEY ⚠ ${products.length} stock${products.length > 1 ? 's' : ''} critique${products.length > 1 ? 's' : ''} — action requise`

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [ADMIN_EMAIL],
        subject,
        html,
      }),
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      throw new Error(`Resend error: ${emailRes.status} ${errText}`)
    }

    const emailData = await emailRes.json() as { id?: string }

    console.log(`[stock-alert] Alert sent for ${products.length} products. Email ID: ${emailData.id}`)

    return new Response(
      JSON.stringify({
        success:    true,
        alertSent:  true,
        productCount: products.length,
        outOfStock: outCount,
        emailId:    emailData.id,
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err) {
    console.error('[stock-alert] Error:', err)
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : String(err) }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
