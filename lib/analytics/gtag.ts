/* ── Type helpers ─────────────────────────────────────────── */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

/* ── Google Ads conversion IDs ───────────────────────────── */
const GADS_ID           = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID           ?? ''
const CONVERSION_LABEL  = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? ''

/* ─────────────────────────────────────────────────────────── */

/** Fired on the /checkout/success page — the money event */
export function trackPurchase(opts: {
  transactionId: string
  value:         number
  currency?:     string
  items?:        { id: string; name: string; price: number; quantity: number }[]
}) {
  const { transactionId, value, currency = 'EUR', items = [] } = opts

  /* GA4 enhanced ecommerce */
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items: items.map((i) => ({
      item_id:   i.id,
      item_name: i.name,
      price:     i.price,
      quantity:  i.quantity,
    })),
  })

  /* Google Ads conversion */
  if (GADS_ID && CONVERSION_LABEL) {
    gtag('event', 'conversion', {
      send_to:        `${GADS_ID}/${CONVERSION_LABEL}`,
      value,
      currency,
      transaction_id: transactionId,
    })
  }
}

/** Fired when a user views a product page — feeds remarketing */
export function trackViewItem(opts: {
  id:       string
  name:     string
  price:    number
  category: string
}) {
  gtag('event', 'view_item', {
    currency: 'EUR',
    value:    opts.price,
    items: [{
      item_id:       opts.id,
      item_name:     opts.name,
      item_category: opts.category,
      price:         opts.price,
      quantity:      1,
    }],
  })
}

/** Fired when a product is added to cart */
export function trackAddToCart(opts: {
  id:       string
  name:     string
  price:    number
  quantity: number
  category: string
}) {
  gtag('event', 'add_to_cart', {
    currency: 'EUR',
    value:    opts.price * opts.quantity,
    items: [{
      item_id:       opts.id,
      item_name:     opts.name,
      item_category: opts.category,
      price:         opts.price,
      quantity:      opts.quantity,
    }],
  })
}

/** Fired when the user clicks "Secure Checkout" */
export function trackBeginCheckout(opts: {
  value: number
  items: { id: string; name: string; price: number; quantity: number }[]
}) {
  gtag('event', 'begin_checkout', {
    currency: 'EUR',
    value:    opts.value,
    items:    opts.items.map((i) => ({
      item_id:  i.id,
      item_name: i.name,
      price:    i.price,
      quantity: i.quantity,
    })),
  })
}

/** Fired when a user signs up — for Google Ads audience building */
export function trackSignUp() {
  gtag('event', 'sign_up', { method: 'email' })

  if (GADS_ID) {
    gtag('event', 'conversion', {
      send_to: `${GADS_ID}/signup`,
    })
  }
}
