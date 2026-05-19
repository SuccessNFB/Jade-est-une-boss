/**
 * ICEKEY — Weekly Performance Report Generator
 *
 * Generates an HTML report with:
 *   - Top products by revenue (last 7 days)
 *   - Conversion rate by category
 *   - Stock alerts (products with ≤ 3 units)
 *   - Newsletter subscriber growth
 *
 * Called by the Supabase Edge Function weekly-report/index.ts (cron: Monday 8am Paris).
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WeeklyReportData {
  weekStart: string
  weekEnd: string
  topProducts: TopProduct[]
  categoryStats: CategoryStat[]
  stockAlerts: StockAlert[]
  newsletterGrowth: NewsletterGrowth
  totalRevenue: number
  totalOrders: number
}

export interface TopProduct {
  id: string
  name: string
  sku: string
  category: string
  price: number
  unitsSold: number
  revenue: number
}

export interface CategoryStat {
  category: string
  orders: number
  revenue: number
  avgOrderValue: number
}

export interface StockAlert {
  id: string
  name: string
  sku: string
  category: string
  stock: number
  price: number
}

export interface NewsletterGrowth {
  totalSubscribers: number
  newThisWeek: number
  growthPercent: number
}

// ─── Report Builder ───────────────────────────────────────────────────────────

/**
 * Builds an HTML report from pre-fetched data.
 * Data fetching happens in the Edge Function (Deno runtime) to avoid
 * importing Supabase in the Next.js bundle unnecessarily.
 */
export function buildWeeklyReportHtml(data: WeeklyReportData): string {
  const {
    weekStart,
    weekEnd,
    topProducts,
    categoryStats,
    stockAlerts,
    newsletterGrowth,
    totalRevenue,
    totalOrders,
  } = data

  // ── Styles ──────────────────────────────────────────────────────────────────
  const baseStyles = `font-family:'Georgia',serif;background:#f9f9f7;margin:0;padding:0;`
  const cardStyles = `max-width:680px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);`
  const headerStyles = `background:#1C1B1F;padding:32px 40px;text-align:center;`
  const bodyStyles = `padding:40px;color:#1C1B1F;`
  const footerStyles = `padding:24px 40px;background:#f5f5f3;text-align:center;font-size:12px;color:#888;`
  const sectionTitleStyles = `font-size:13px;letter-spacing:0.15em;color:#888;font-family:sans-serif;text-transform:uppercase;margin:32px 0 12px;border-bottom:2px solid #1C1B1F;padding-bottom:6px;`
  const tableStyles = `width:100%;border-collapse:collapse;font-size:14px;`
  const thStyles = `text-align:left;font-size:11px;letter-spacing:0.1em;color:#999;padding:8px 0;border-bottom:1px solid #e8e8e8;`
  const tdStyles = `padding:10px 0;border-bottom:1px solid #f0f0ee;vertical-align:top;`
  const alertBadgeStyles = `display:inline-block;background:#ef4444;color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;font-family:sans-serif;`
  const warningBadgeStyles = `display:inline-block;background:#f59e0b;color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;font-family:sans-serif;`

  // ── KPI Cards ───────────────────────────────────────────────────────────────
  const kpiSection = `
  <div style="display:flex;gap:16px;margin-bottom:8px;">
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">CHIFFRE D'AFFAIRES</p>
      <p style="margin:8px 0 0;font-size:26px;font-weight:700;">${totalRevenue.toFixed(2)} €</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">COMMANDES</p>
      <p style="margin:8px 0 0;font-size:26px;font-weight:700;">${totalOrders}</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">PANIER MOYEN</p>
      <p style="margin:8px 0 0;font-size:26px;font-weight:700;">${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'} €</p>
    </div>
  </div>`

  // ── Top Products ─────────────────────────────────────────────────────────────
  const topProductRows = topProducts.length > 0
    ? topProducts
        .slice(0, 10)
        .map(
          (p, i) => `
          <tr>
            <td style="${tdStyles}color:#888;font-size:12px;">#${i + 1}</td>
            <td style="${tdStyles}font-weight:600;">${escapeHtml(p.name)}</td>
            <td style="${tdStyles}color:#666;">${escapeHtml(p.category)}</td>
            <td style="${tdStyles}text-align:right;">${p.unitsSold}</td>
            <td style="${tdStyles}text-align:right;font-weight:700;">${p.revenue.toFixed(2)} €</td>
          </tr>`
        )
        .join('')
    : `<tr><td colspan="5" style="${tdStyles}color:#888;text-align:center;">Aucune vente cette semaine.</td></tr>`

  const topProductsSection = `
  <p style="${sectionTitleStyles}">Top Produits — Revenus</p>
  <table style="${tableStyles}">
    <thead>
      <tr>
        <th style="${thStyles}">#</th>
        <th style="${thStyles}">Produit</th>
        <th style="${thStyles}">Catégorie</th>
        <th style="${thStyles}text-align:right;">Qté</th>
        <th style="${thStyles}text-align:right;">Revenu</th>
      </tr>
    </thead>
    <tbody>${topProductRows}</tbody>
  </table>`

  // ── Category Stats ────────────────────────────────────────────────────────────
  const categoryRows = categoryStats.length > 0
    ? categoryStats
        .sort((a, b) => b.revenue - a.revenue)
        .map(
          (c) => `
          <tr>
            <td style="${tdStyles}font-weight:600;text-transform:capitalize;">${escapeHtml(c.category)}</td>
            <td style="${tdStyles}text-align:right;">${c.orders}</td>
            <td style="${tdStyles}text-align:right;">${c.revenue.toFixed(2)} €</td>
            <td style="${tdStyles}text-align:right;">${c.avgOrderValue.toFixed(2)} €</td>
          </tr>`
        )
        .join('')
    : `<tr><td colspan="4" style="${tdStyles}color:#888;text-align:center;">Aucune donnée cette semaine.</td></tr>`

  const categorySection = `
  <p style="${sectionTitleStyles}">Performance par Catégorie</p>
  <table style="${tableStyles}">
    <thead>
      <tr>
        <th style="${thStyles}">Catégorie</th>
        <th style="${thStyles}text-align:right;">Commandes</th>
        <th style="${thStyles}text-align:right;">Revenu</th>
        <th style="${thStyles}text-align:right;">Panier Moyen</th>
      </tr>
    </thead>
    <tbody>${categoryRows}</tbody>
  </table>`

  // ── Stock Alerts ─────────────────────────────────────────────────────────────
  const stockRows = stockAlerts.length > 0
    ? stockAlerts
        .sort((a, b) => a.stock - b.stock)
        .map(
          (p) => `
          <tr>
            <td style="${tdStyles}font-weight:600;">${escapeHtml(p.name)}</td>
            <td style="${tdStyles}color:#666;font-size:12px;">${escapeHtml(p.sku)}</td>
            <td style="${tdStyles}text-align:right;">
              <span style="${p.stock === 0 ? alertBadgeStyles : warningBadgeStyles}">
                ${p.stock === 0 ? 'RUPTURE' : `${p.stock} restant${p.stock > 1 ? 's' : ''}`}
              </span>
            </td>
            <td style="${tdStyles}text-align:right;">${p.price.toFixed(2)} €</td>
          </tr>`
        )
        .join('')
    : `<tr><td colspan="4" style="${tdStyles}color:#22c55e;text-align:center;font-weight:600;">Tous les stocks sont OK ✓</td></tr>`

  const stockSection = `
  <p style="${sectionTitleStyles}">Alertes Stock (≤ 3 unités)</p>
  ${stockAlerts.length > 0 ? `<p style="color:#ef4444;font-size:13px;margin-bottom:12px;">⚠ ${stockAlerts.length} produit(s) en stock critique — action requise.</p>` : ''}
  <table style="${tableStyles}">
    <thead>
      <tr>
        <th style="${thStyles}">Produit</th>
        <th style="${thStyles}">SKU</th>
        <th style="${thStyles}text-align:right;">Stock</th>
        <th style="${thStyles}text-align:right;">Prix</th>
      </tr>
    </thead>
    <tbody>${stockRows}</tbody>
  </table>`

  // ── Newsletter ─────────────────────────────────────────────────────────────
  const growthColor = newsletterGrowth.growthPercent >= 0 ? '#22c55e' : '#ef4444'
  const growthSign  = newsletterGrowth.growthPercent >= 0 ? '+' : ''

  const newsletterSection = `
  <p style="${sectionTitleStyles}">Croissance Newsletter</p>
  <div style="display:flex;gap:16px;">
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">TOTAL ABONNÉS</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:700;">${newsletterGrowth.totalSubscribers.toLocaleString('fr-FR')}</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">NOUVEAUX CETTE SEMAINE</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:700;">${newsletterGrowth.newThisWeek}</p>
    </div>
    <div style="flex:1;background:#f9f9f7;border-radius:12px;padding:20px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.15em;color:#888;font-family:sans-serif;">CROISSANCE</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:700;color:${growthColor};">${growthSign}${newsletterGrowth.growthPercent.toFixed(1)}%</p>
    </div>
  </div>`

  // ── Assemble HTML ─────────────────────────────────────────────────────────
  const year = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ICEKEY — Rapport Hebdomadaire</title>
</head>
<body style="${baseStyles}">
<div style="${cardStyles}">

  <!-- Header -->
  <div style="${headerStyles}">
    <p style="margin:0;color:#00D9FF;font-size:11px;letter-spacing:0.3em;font-family:sans-serif;">COLD IS THE NEW GOLD</p>
    <h1 style="margin:8px 0 0;color:#ffffff;font-size:28px;letter-spacing:0.05em;">ICEKEY</h1>
    <p style="margin:12px 0 0;color:#888;font-size:13px;font-family:sans-serif;">Rapport Hebdomadaire · ${weekStart} – ${weekEnd}</p>
  </div>

  <!-- Body -->
  <div style="${bodyStyles}">
    <h2 style="margin-top:0;font-size:18px;">Résumé de la semaine</h2>
    ${kpiSection}
    ${topProductsSection}
    ${categorySection}
    ${stockSection}
    ${newsletterSection}
  </div>

  <!-- Footer -->
  <div style="${footerStyles}">
    <p style="margin:0;">© ${year} ICEKEY · Rapport généré automatiquement</p>
    <p style="margin:6px 0 0;"><a href="https://icekey.shop" style="color:#00D9FF;">icekey.shop</a></p>
  </div>

</div>
</body>
</html>`
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Derives the ISO week date range (Mon–Sun) for a given date.
 */
export function getWeekRange(date: Date): { weekStart: string; weekEnd: string } {
  const d    = new Date(date)
  const day  = d.getUTCDay()           // 0 = Sun, 1 = Mon …
  const diff = (day === 0 ? -6 : 1) - day  // Monday offset

  const monday = new Date(d)
  monday.setUTCDate(d.getUTCDate() + diff)
  monday.setUTCHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setUTCDate(monday.getUTCDate() + 6)
  sunday.setUTCHours(23, 59, 59, 999)

  const fmt = (dt: Date) =>
    dt.toLocaleDateString('fr-FR', {
      day:   '2-digit',
      month: 'long',
      year:  'numeric',
      timeZone: 'UTC',
    })

  return {
    weekStart: fmt(monday),
    weekEnd:   fmt(sunday),
  }
}
