/**
 * ICEKEY — Supabase Edge Function: weekly-report
 *
 * Cron: every Monday at 08:00 Paris time (07:00 UTC in winter / 06:00 UTC in summer)
 * Schedule: "0 7 * * 1"  (adjust to "0 6 * * 1" during summer / CEST)
 *
 * Deploy:
 *   supabase functions deploy weekly-report --no-verify-jwt
 *
 * Secrets required (set via `supabase secrets set`):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
 */

// Deno / Edge runtime — no npm imports. We use Supabase REST API directly via fetch.

const SITE_URL   = 'https://icekey.shop'
const FROM_EMAIL = 'ICEKEY <contact@icekey.shop>'
const ADMIN_EMAIL = 'contact@icekey.shop'

// ─── Types (mirror of weeklyReport.ts — kept inline for Deno portability) ─────

interface TopProduct {
  id:        string
  name:      string
  sku:       string
  category:  string
  price:     number
  unitsSold: number
  revenue:   number
}

interface CategoryStat {
  category:      string
  orders:        number
  revenue:       number
  avgOrderValue: number
}

interface StockAlert {
  id:       string
  name:     string
  sku:      string
  category: string
  stock:    number
  price:    number
}

interface NewsletterGrowth {
  totalSubscribers: number
  newThisWeek:      number
  growthPercent:    number
}

interface WeeklyReportData {
  weekStart:        string
  weekEnd:          string
  topProducts:      TopProduct[]
  categoryStats:    CategoryStat[]
  stockAlerts:      StockAlert[]
  newsletterGrowth: NewsletterGrowth
  totalRevenue:     number
  totalOrders:      number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getWeekBounds(): { weekStart: Date; weekEnd: Date } {
  const now  = new Date()
  const day  = now.getUTCDay()
  const diff = (day === 0 ? -6 : 1) - day

  const monday = new Date(now)
  monday.setUTCDate(now.getUTCDate() + diff - 7) // previous week
  monday.setUTCHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setUTCDate(monday.getUTCDate() + 6)
  sunday.setUTCHours(23, 59, 59, 999)

  return { weekStart: monday, weekEnd: sunday }
}

function formatDateFR(dt: Date): string {
  return dt.toLocaleDateString('fr-FR', {
    day:      '2-digit',
    month:    'long',
    year:     'numeric',
    timeZone: 'UTC',
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Supabase REST helper ─────────────────────────────────────────────────────

async function supabaseSelect<T>(
  table: string,
  params: Record<string, string>,
  env: { url: string; key: string }
): Promise<T[]> {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${env.url}/rest/v1/${table}?${qs}`, {
    headers: {
      apikey:        env.key,
      Authorization: `Bearer ${env.key}`,
      Accept:        'application/json',
      Prefer:        'return=representation',
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase ${table} query failed: ${res.status} ${text}`)
  }
  return res.json() as Promise<T[]>
}

// ─── Report HTML Builder ──────────────────────────────────────────────────────

function buildHtml(data: WeeklyReportData): string {
  const {
    weekStart, weekEnd, topProducts, categoryStats,
    stockAlerts, newsletterGrowth, totalRevenue, totalOrders,
  } = data

  const avgOrder = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'

  const kpiHtml = `
  <div style="display:flex;gap:16px;margin-bottom:8px;">
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">CA SEMAINE</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:700;">${totalRevenue.toFixed(2)} €</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">COMMANDES</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:700;">${totalOrders}</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">PANIER MOYEN</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:700;">${avgOrder} €</p>
    </div>
  </div>`

  const tdS = 'padding:10px 0;border-bottom:1px solid #f0f0ee;font-size:14px;vertical-align:top;'
  const thS = 'text-align:left;font-size:11px;letter-spacing:0.1em;color:#999;padding:8px 0;border-bottom:1px solid #e8e8e8;'
  const secTitle = 'font-size:13px;letter-spacing:0.15em;color:#888;font-family:sans-serif;text-transform:uppercase;margin:32px 0 12px;border-bottom:2px solid #1C1B1F;padding-bottom:6px;'

  // Top products
  const topRows = topProducts.length > 0
    ? topProducts.slice(0, 10).map((p, i) => `
      <tr>
        <td style="${tdS}color:#888;font-size:12px;">#${i + 1}</td>
        <td style="${tdS}font-weight:600;">${escapeHtml(p.name)}</td>
        <td style="${tdS}color:#666;">${escapeHtml(p.category)}</td>
        <td style="${tdS}text-align:right;">${p.unitsSold}</td>
        <td style="${tdS}text-align:right;font-weight:700;">${p.revenue.toFixed(2)} €</td>
      </tr>`).join('')
    : `<tr><td colspan="5" style="${tdS}color:#888;text-align:center;">Aucune vente cette semaine.</td></tr>`

  // Category stats
  const catRows = categoryStats.length > 0
    ? [...categoryStats].sort((a, b) => b.revenue - a.revenue).map((c) => `
      <tr>
        <td style="${tdS}font-weight:600;text-transform:capitalize;">${escapeHtml(c.category)}</td>
        <td style="${tdS}text-align:right;">${c.orders}</td>
        <td style="${tdS}text-align:right;">${c.revenue.toFixed(2)} €</td>
        <td style="${tdS}text-align:right;">${c.avgOrderValue.toFixed(2)} €</td>
      </tr>`).join('')
    : `<tr><td colspan="4" style="${tdS}color:#888;text-align:center;">Aucune donnée.</td></tr>`

  // Stock alerts
  const stockRows = stockAlerts.length > 0
    ? [...stockAlerts].sort((a, b) => a.stock - b.stock).map((p) => `
      <tr>
        <td style="${tdS}font-weight:600;">${escapeHtml(p.name)}</td>
        <td style="${tdS}font-size:12px;color:#666;">${escapeHtml(p.sku)}</td>
        <td style="${tdS}text-align:right;">
          <span style="display:inline-block;background:${p.stock === 0 ? '#ef4444' : '#f59e0b'};color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;font-family:sans-serif;">
            ${p.stock === 0 ? 'RUPTURE' : `${p.stock} restant${p.stock > 1 ? 's' : ''}`}
          </span>
        </td>
        <td style="${tdS}text-align:right;">${p.price.toFixed(2)} €</td>
      </tr>`).join('')
    : `<tr><td colspan="4" style="${tdS}color:#22c55e;text-align:center;font-weight:600;">Tous les stocks sont OK</td></tr>`

  // Newsletter
  const growthColor = newsletterGrowth.growthPercent >= 0 ? '#22c55e' : '#ef4444'
  const growthSign  = newsletterGrowth.growthPercent >= 0 ? '+' : ''
  const newsletterHtml = `
  <div style="display:flex;gap:16px;">
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">TOTAL ABONNÉS</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:700;">${newsletterGrowth.totalSubscribers.toLocaleString('fr-FR')}</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">NOUVEAUX</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:700;">+${newsletterGrowth.newThisWeek}</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">CROISSANCE</p>
      <p style="margin:8px 0 0;font-size:22px;font-weight:700;color:${growthColor};">${growthSign}${newsletterGrowth.growthPercent.toFixed(1)}%</p>
    </div>
  </div>`

  const year = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>ICEKEY Rapport Hebdomadaire</title></head>
<body style="font-family:'Georgia',serif;background:#f9f9f7;margin:0;padding:0;">
<div style="max-width:680px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <div style="background:#1C1B1F;padding:32px 40px;text-align:center;">
    <p style="margin:0;color:#00D9FF;font-size:11px;letter-spacing:0.3em;font-family:sans-serif;">COLD IS THE NEW GOLD</p>
    <h1 style="margin:8px 0 0;color:#fff;font-size:28px;letter-spacing:0.05em;">ICEKEY</h1>
    <p style="margin:12px 0 0;color:#888;font-size:13px;font-family:sans-serif;">Rapport Hebdomadaire &middot; ${escapeHtml(weekStart)} &ndash; ${escapeHtml(weekEnd)}</p>
  </div>

  <div style="padding:40px;color:#1C1B1F;">
    <h2 style="margin-top:0;font-size:18px;">Résumé de la semaine</h2>
    ${kpiHtml}

    <p style="${secTitle}">Top Produits</p>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="${thS}">#</th>
          <th style="${thS}">Produit</th>
          <th style="${thS}">Catégorie</th>
          <th style="${thS}text-align:right;">Qté</th>
          <th style="${thS}text-align:right;">Revenu</th>
        </tr>
      </thead>
      <tbody>${topRows}</tbody>
    </table>

    <p style="${secTitle}">Performance par Catégorie</p>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="${thS}">Catégorie</th>
          <th style="${thS}text-align:right;">Commandes</th>
          <th style="${thS}text-align:right;">Revenu</th>
          <th style="${thS}text-align:right;">Panier Moyen</th>
        </tr>
      </thead>
      <tbody>${catRows}</tbody>
    </table>

    <p style="${secTitle}">Alertes Stock (≤ 3 unités)</p>
    ${stockAlerts.length > 0 ? `<p style="color:#ef4444;font-size:13px;margin-bottom:12px;">⚠ ${stockAlerts.length} produit(s) en stock critique.</p>` : ''}
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="${thS}">Produit</th>
          <th style="${thS}">SKU</th>
          <th style="${thS}text-align:right;">Stock</th>
          <th style="${thS}text-align:right;">Prix</th>
        </tr>
      </thead>
      <tbody>${stockRows}</tbody>
    </table>

    <p style="${secTitle}">Newsletter</p>
    ${newsletterHtml}
  </div>

  <div style="padding:24px 40px;background:#f5f5f3;text-align:center;font-size:12px;color:#888;">
    <p style="margin:0;">&copy; ${year} ICEKEY &middot; Rapport généré automatiquement</p>
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

    const env = { url: supabaseUrl, key: serviceKey }
    const { weekStart, weekEnd } = getWeekBounds()

    const weekStartISO = weekStart.toISOString()
    const weekEndISO   = weekEnd.toISOString()

    // ── 1. Fetch orders for the week ─────────────────────────────────────────
    const orders = await supabaseSelect<{
      id:           string
      items:        unknown
      total_amount: number
      status:       string
      created_at:   string
    }>('orders', {
      select:          'id,items,total_amount,status,created_at',
      created_at:      `gte.${weekStartISO}`,
      'created_at.lte': weekEndISO,
      status:          'eq.paid',
    }, env)

    // ── 2. Compute top products & category stats ──────────────────────────────
    const productRevMap: Record<string, TopProduct>       = {}
    const categoryMap:   Record<string, CategoryStat>     = {}

    let totalRevenue = 0
    let totalOrders  = 0

    for (const order of orders) {
      totalRevenue += order.total_amount
      totalOrders  += 1

      const items = Array.isArray(order.items) ? order.items : []
      for (const item of items as Array<{
        product?: { id?: string; name?: string; sku?: string; category?: string; price?: number }
        quantity?: number
      }>) {
        const p        = item.product ?? {}
        const id       = p.id       ?? 'unknown'
        const name     = p.name     ?? 'Unknown'
        const sku      = p.sku      ?? ''
        const category = p.category ?? 'other'
        const price    = p.price    ?? 0
        const qty      = item.quantity ?? 1
        const revenue  = price * qty

        // Product map
        if (!productRevMap[id]) {
          productRevMap[id] = { id, name, sku, category, price, unitsSold: 0, revenue: 0 }
        }
        productRevMap[id].unitsSold += qty
        productRevMap[id].revenue   += revenue

        // Category map
        if (!categoryMap[category]) {
          categoryMap[category] = { category, orders: 0, revenue: 0, avgOrderValue: 0 }
        }
        categoryMap[category].revenue += revenue
      }

      // Category order count (per order, not per item)
      const firstItem = (items as Array<{ product?: { category?: string } }>)[0]
      const cat = firstItem?.product?.category ?? 'other'
      if (!categoryMap[cat]) {
        categoryMap[cat] = { category: cat, orders: 0, revenue: 0, avgOrderValue: 0 }
      }
      categoryMap[cat].orders += 1
    }

    const topProducts: TopProduct[] = Object.values(productRevMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    const categoryStats: CategoryStat[] = Object.values(categoryMap).map((c) => ({
      ...c,
      avgOrderValue: c.orders > 0 ? c.revenue / c.orders : 0,
    }))

    // ── 3. Stock alerts ───────────────────────────────────────────────────────
    const lowStockProducts = await supabaseSelect<{
      id:       string
      name:     string
      sku:      string
      category: string
      stock:    number
      price:    number
    }>('products', {
      select:    'id,name,sku,category,stock,price',
      stock:     'lte.3',
      is_active: 'eq.true',
      order:     'stock.asc',
    }, env)

    const stockAlerts: StockAlert[] = lowStockProducts.map((p) => ({
      id:       p.id,
      name:     p.name,
      sku:      p.sku,
      category: p.category,
      stock:    p.stock,
      price:    p.price,
    }))

    // ── 4. Newsletter growth ──────────────────────────────────────────────────
    const allSubscribers = await supabaseSelect<{
      id:            string
      subscribed_at: string
    }>('newsletter_subscribers', {
      select: 'id,subscribed_at',
    }, env)

    const totalSubscribers = allSubscribers.length
    const newThisWeek = allSubscribers.filter(
      (s) => new Date(s.subscribed_at) >= weekStart
    ).length

    const previousTotal = totalSubscribers - newThisWeek
    const growthPercent = previousTotal > 0
      ? (newThisWeek / previousTotal) * 100
      : (newThisWeek > 0 ? 100 : 0)

    const newsletterGrowth: NewsletterGrowth = {
      totalSubscribers,
      newThisWeek,
      growthPercent,
    }

    // ── 5. Build report ───────────────────────────────────────────────────────
    const reportData: WeeklyReportData = {
      weekStart:   formatDateFR(weekStart),
      weekEnd:     formatDateFR(weekEnd),
      topProducts,
      categoryStats,
      stockAlerts,
      newsletterGrowth,
      totalRevenue,
      totalOrders,
    }

    const html = buildHtml(reportData)

    // ── 6. Send via Resend ────────────────────────────────────────────────────
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      [ADMIN_EMAIL],
        subject: `ICEKEY — Rapport Hebdomadaire ${reportData.weekStart} – ${reportData.weekEnd}`,
        html,
      }),
    })

    if (!emailRes.ok) {
      const errText = await emailRes.text()
      throw new Error(`Resend error: ${emailRes.status} ${errText}`)
    }

    const emailData = await emailRes.json() as { id?: string }

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id, weekStart: weekStartISO, weekEnd: weekEndISO }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err) {
    console.error('[weekly-report] Error:', err)
    return new Response(
      JSON.stringify({ success: false, error: err instanceof Error ? err.message : String(err) }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
