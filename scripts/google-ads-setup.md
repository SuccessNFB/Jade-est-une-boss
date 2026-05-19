# ICEKEY — Google Ads Automation Setup Guide

> Goal: 5 Performance Max campaigns (one per price tier), self-optimizing by August.
> Zero daily manual intervention required once launched.

---

## 1. Account Structure Overview

```
Google Ads Account: ICEKEY
├── Campaign: ICEKEY | Entry (<€100)
├── Campaign: ICEKEY | Mid (€100–€200)
├── Campaign: ICEKEY | Premium (€200–€400)
├── Campaign: ICEKEY | Luxury (€400–€700)
└── Campaign: ICEKEY | Ultra (€700+)
```

Each campaign maps to a `custom_label_0` value in the Google Merchant Center feed:
`entry`, `mid`, `premium`, `luxury`, `ultra`.

---

## 2. Google Merchant Center Setup

### Feed URL
```
https://icekey.shop/api/feed/google
```
- Format: RSS 2.0 with Google Shopping namespace
- Refresh: hourly (`Cache-Control: public, max-age=3600`)
- Schedule in GMC: every 24h (GMC fetches daily; the endpoint always has fresh data)

### Feed Labels Used for Campaign Targeting
| Label         | Field            | Values                                      |
|---------------|------------------|---------------------------------------------|
| custom_label_0 | Price Tier       | entry, mid, premium, luxury, ultra          |
| custom_label_1 | Category         | chain, pendant, ring, watch, bracelet, etc. |
| custom_label_2 | Metal            | silver-925, gold-9k, gold-14k, gold-18k, platinum |

### Required GMC Settings
- Business country: France (FR)
- Currency: EUR
- Shipping: Free shipping configured at account level for FR (matches feed: 0 EUR)
- Tax: not required for France (VAT included in price)
- Brand: ICEKEY
- GTIN: not required (MPN provided via `sku`)

---

## 3. Campaign Configuration — Per Tier

### 3.1 Entry Tier — ICEKEY | Entry (<€100)

| Setting             | Value                                      |
|---------------------|--------------------------------------------|
| Campaign type       | Performance Max                            |
| Goal                | Online sales (purchases)                   |
| Budget              | €15–25/day to start                        |
| Bidding             | Maximize conversion value                  |
| Target ROAS         | 200% (2x) — raise to 250% after 30+ conv. |
| Product filter      | custom_label_0 = entry                     |
| Audience signals    | See §4 below                               |
| Final URL expansion | Enabled                                    |
| Asset group name    | Entry — Bijoux Accessibles                 |

**Budget rationale:** Entry products (<€100) have the highest conversion volume.
Start with a generous budget to accumulate conversion data quickly.
Google needs ~50 conversions/month per campaign to exit the learning phase.

---

### 3.2 Mid Tier — ICEKEY | Mid (€100–€200)

| Setting             | Value                                      |
|---------------------|--------------------------------------------|
| Budget              | €20–35/day                                 |
| Target ROAS         | 250% (2.5x) — raise to 350% after 30+ conv. |
| Product filter      | custom_label_0 = mid                       |
| Asset group name    | Mid — Le Sweet Spot                        |

**Notes:** Mid tier is the highest-volume revenue tier. Prioritize budget once
entry campaigns exit learning phase. Chains (8–12mm) and pendants perform best.

---

### 3.3 Premium Tier — ICEKEY | Premium (€200–€400)

| Setting             | Value                                      |
|---------------------|--------------------------------------------|
| Budget              | €25–40/day                                 |
| Target ROAS         | 300% (3x) — raise to 400% after 30+ conv. |
| Product filter      | custom_label_0 = premium                   |
| Asset group name    | Premium — Upgrade Your Game                |

**Notes:** Longer consideration window (3–7 days). Enable remarketing audiences.
Custom pendants and 14–18mm chains drive AOV.

---

### 3.4 Luxury Tier — ICEKEY | Luxury (€400–€700)

| Setting             | Value                                      |
|---------------------|--------------------------------------------|
| Budget              | €20–30/day                                 |
| Target ROAS         | 400% (4x) — raise to 500% after 20+ conv. |
| Product filter      | custom_label_0 = luxury                    |
| Asset group name    | Luxury — Own the Room                      |

**Notes:** Lower conversion volume. Be patient — do NOT raise ROAS target too
quickly or campaigns will under-spend. 20 conversions/month is sufficient.

---

### 3.5 Ultra Tier — ICEKEY | Ultra (€700+)

| Setting             | Value                                      |
|---------------------|--------------------------------------------|
| Budget              | €15–25/day                                 |
| Target ROAS         | 500% (5x)                                  |
| Product filter      | custom_label_0 = ultra                     |
| Asset group name    | Ultra — Secure Your Piece                  |

**Notes:** Very low conversion volume. Consider starting with "Maximize
conversion value" (no ROAS target) for the first 60 days to gather data.
Transition to 500% ROAS once 15+ conversions recorded.

---

## 4. Audience Signals (all campaigns)

Performance Max uses audience signals as hints, not hard restrictions.
Add all of the following to each campaign's asset group:

### Customer Match Lists (upload monthly)
- **All customers** — past purchasers (upload from Supabase `orders` table)
- **Newsletter subscribers** — from `newsletter_subscribers` table
- **High-value customers** — orders > €300 (segment separately)

### Google Audiences
- **In-market:** Jewelry & Watches, Luxury Goods, Fashion & Style
- **Affinity:** Fashion Enthusiasts, Trendsetters, Hip-Hop Culture
- **Life events:** Recently engaged (for rings/sets)

### Custom Segments (keyword-based)
```
moissanite jewelry
iced out jewelry france
bijoux hip hop france
chaîne cubaine argent
moissanite certifiée GRA
bijoux femme tendance
collier diamant homme
```

### Remarketing
- All website visitors (last 30 days)
- Product page viewers (last 14 days)
- Cart abandoners (last 7 days) — highest priority
- Purchasers (exclude from prospecting, include in upsell campaigns)

---

## 5. Asset Group Structure

Each campaign has **1 asset group per major category** within that tier.

Example for Mid tier:
```
Asset Group: Mid — Chains
  Headlines (15 max):
    - Chaîne Cubaine Moissanite GRA
    - Livraison Gratuite France
    - ICEKEY — Cold Is the New Gold
    - Bijoux Hip Hop Premium
    - Paiement Sécurisé
    - Qualité Certifiée GRA
    - Expédition 48h Ouvrées
    - Chaînes 8–12mm Iced Out
    - Moissanite Éclat Diamant
    - Collection Exclusive ICEKEY
    [5 more unique headlines]

  Long Headlines (5 max):
    - Chaînes moissanite certifiée GRA — Livraison offerte en France
    - ICEKEY : le bijou hip hop qui brille comme le diamant
    - 100% moissanite GRA | Livraison 48h | Retours offerts
    - Finitions premium, prix accessible. Découvrez ICEKEY.
    - La chaîne cubaine moissanite qui change tout.

  Descriptions (4 max):
    - Moissanite certifiée GRA, éclat supérieur au diamant. Livraison offerte partout en France.
    - Bijoux hip hop premium. Chaînes, pendentifs, bagues. Expédiés sous 48h ouvrées.
    - Qualité certifiée. Prix transparents. Retours sans frais. ICEKEY — le choix des connaisseurs.
    - Offrez-vous l'iced out sans compromis. Paiement sécurisé, livraison suivie, satisfait ou remboursé.

  Images (up to 20):
    - Product shots (white background, 1200×1200)
    - Lifestyle shots (worn, styled)
    - Close-up detail shots (stone, clasp)
    - Brand/logo image

  Videos (optional but recommended):
    - 15s product highlight reel
    - 30s brand story
```

---

## 6. Conversion Goals Setup

### Primary Conversion: Purchase
- Source: Google tag (gtag) + Stripe webhook confirmation
- Value: Dynamic (actual order total)
- Attribution: Data-driven (default)
- Counting: Every conversion (multiple purchases per session counted)

### Secondary Conversions (observation only, do NOT optimize):
- Add to cart
- Begin checkout
- Product page view > 30s
- Newsletter signup

### Google Tag Setup (in `app/layout.tsx`)
```html
<!-- Global Site Tag (gtag.js) — Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

### Purchase Event (fire in `/app/api/stripe/webhook/route.ts` after payment confirmed)
```typescript
// Also fire client-side on /checkout/success page
gtag('event', 'conversion', {
  send_to:        'AW-XXXXXXXXX/YYYYYYYYYY',
  value:          orderTotal,
  currency:       'EUR',
  transaction_id: orderId,
});
```

---

## 7. Budget Allocation Recommendations

### Phase 1 — Launch (Weeks 1–4)
Total daily budget: **€95–155/day**

| Campaign | Daily Budget | Priority |
|----------|-------------|----------|
| Entry    | €20–25      | 1st      |
| Mid      | €25–35      | 2nd      |
| Premium  | €25–40      | 3rd      |
| Luxury   | €15–30      | 4th      |
| Ultra    | €10–25      | 5th      |

Start all campaigns simultaneously. Entry & Mid will spend fastest.

### Phase 2 — Optimize (Weeks 5–8)
After campaigns exit learning phase (50+ conversions each):
- Raise ROAS targets by 25% increments every 2 weeks
- Shift budget toward best-performing tiers
- Pause underperforming asset groups

### Phase 3 — Scale (Week 9+)
- Increase budget on campaigns hitting ROAS targets consistently
- Add seasonal promotions as separate asset groups
- Introduce brand campaigns (keyword: "ICEKEY")

---

## 8. Automated Rules (set in Google Ads UI)

### Pause low-performing products
```
IF product impression_share < 10% AND clicks > 100 AND conversions = 0
THEN mark product as excluded (manual review)
Frequency: Weekly, Monday 6am
```

### Budget auto-increase on strong ROAS
```
IF campaign ROAS > target_roas × 1.3 AND budget_utilization > 85%
THEN increase budget by 15% (max +€20/day)
Frequency: Weekly, Monday 8am
```

### Alert on ROAS drop
```
IF 7-day ROAS < target_roas × 0.7
THEN send email alert to contact@icekey.shop
Frequency: Daily
```

---

## 9. Merchant Center Feed Health Checklist

Run this check weekly until feeds are stable:

- [ ] All active products approved in GMC
- [ ] No "missing required attribute" errors
- [ ] Image quality: min 800×800px, white or lifestyle background
- [ ] Prices match live site (no discrepancies)
- [ ] Shipping configured correctly (free, France only)
- [ ] custom_label_0 values present on all items (entry/mid/premium/luxury/ultra)
- [ ] No disapproved items due to policy violations
- [ ] Feed last fetched < 24h ago

---

## 10. Weekly Optimization Checklist (Automated — Zero Manual Work)

The following happens automatically via Edge Functions and Google's own ML:

- **Monday 8am** — Weekly performance report emailed to contact@icekey.shop
  (via `/supabase/functions/weekly-report`)
- **Daily 9am** — Stock alerts for products ≤ 3 units
  (via `/supabase/functions/stock-alert`)
- **Hourly** — Google feed refreshed at `/api/feed/google`
- **Google PMax ML** — Bids, placements, and creative selection optimized continuously

Human review required only when:
- ROAS drops > 30% vs target for 7+ consecutive days
- New product category launches
- Seasonal campaign adjustments (holidays, sales)
- Budget increases beyond +50% of initial

---

## 11. Environment Variables Required

Add to Vercel + Supabase secrets:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# Resend (email)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
```

---

## 12. Timeline to Full Automation

| Week | Milestone |
|------|-----------|
| 1    | GMC feed live, all 5 PMax campaigns created |
| 2–4  | Learning phase — do not touch campaigns |
| 4    | First ROAS data available, adjust targets if needed |
| 5–6  | Begin raising ROAS targets (25% increments) |
| 7–8  | Budget reallocation based on tier performance |
| 8    | Full automation active — zero daily intervention |

> **Rule:** Never make more than 1 significant change per campaign per week.
> Google PMax needs 7–14 days to re-optimize after each change.
