import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Paiement – ICEKEY' }

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-charcoal/50 text-sm">Redirection vers Stripe Checkout…</p>
    </div>
  )
}
