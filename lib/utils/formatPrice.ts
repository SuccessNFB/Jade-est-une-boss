export function formatPrice(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style:                 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPriceCompact(amount: number): string {
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}k€`
  return `${amount}€`
}

export function stripeCentsToCurrency(cents: number): number {
  return cents / 100
}

export function currencyToStripeCents(amount: number): number {
  return Math.round(amount * 100)
}
