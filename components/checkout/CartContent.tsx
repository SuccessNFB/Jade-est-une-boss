'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CartSummary } from './CartSummary'
import { TrustSignals } from './TrustSignals'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'
import { ArrowRight, Lock } from 'lucide-react'
import { formatPrice } from '@/lib/utils/formatPrice'
import toast from 'react-hot-toast'

export function CartContent() {
  const [loading, setLoading] = useState(false)
  const items    = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.totalPrice())

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items }),
      })

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}))
        toast.error(error ?? 'Erreur lors du paiement. Veuillez réessayer.')
        return
      }

      const { url } = await res.json()
      if (!url) {
        toast.error('Lien de paiement introuvable. Veuillez réessayer.')
        return
      }

      window.location.href = url
    } catch {
      toast.error('Impossible de contacter le serveur. Vérifiez votre connexion.')
    } finally {
      setLoading(false)
    }
  }

  if (!items.length) return <CartSummary />

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <CartSummary />
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          <div className="rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal">Récapitulatif</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Sous-total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Livraison</span>
                <span className={subtotal >= 100 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                  {subtotal >= 100 ? 'Offerte ✓' : formatPrice(9.90)}
                </span>
              </div>
            </div>
            <div className="flex justify-between pt-4 border-t font-bold text-charcoal">
              <span>Total</span>
              <span className="font-serif text-xl">
                {formatPrice(subtotal >= 100 ? subtotal : subtotal + 9.90)}
              </span>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full"
              loading={loading}
              onClick={handleCheckout}
            >
              <Lock className="w-4 h-4" />
              Payer maintenant
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <TrustSignals />

          {subtotal < 100 && (
            <div className="rounded-xl bg-ice-50 border border-ice-200 p-4 text-xs text-ice-600">
              Plus que <strong>{formatPrice(100 - subtotal)}</strong> pour la livraison offerte !
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
