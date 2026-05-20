'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CartSummary } from './CartSummary'
import { TrustSignals } from './TrustSignals'
import { Button }       from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'
import { useAuthGuard } from '@/components/auth/useAuthGuard'
import { ArrowRight, Lock, ShoppingBag, Tag, User } from 'lucide-react'
import { formatPrice } from '@/lib/utils/formatPrice'
import toast from 'react-hot-toast'

function EmptyCart() {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-5">
        <ShoppingBag className="w-9 h-9 text-charcoal/20" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Ton panier est vide</h2>
      <p className="text-charcoal/50 text-sm mb-8">Start building your collection.</p>
      <Link href="/shop">
        <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00D9FF] text-charcoal font-bold text-sm hover:bg-[#00EEFF] hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
          <ShoppingBag className="w-4 h-4" />
          Shop Now
        </button>
      </Link>
    </div>
  )
}

export function CartContent() {
  const [loading,    setLoading]    = useState(false)
  const [promoCode,  setPromoCode]  = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const { user, requireAuth } = useAuthGuard()
  const items    = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.totalPrice())

  async function handleCheckout() {
    if (!requireAuth('/cart')) return
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

  function handlePromoApply() {
    if (!promoCode.trim()) return
    if (promoCode.toUpperCase() === 'BIENVENUE10') {
      setPromoApplied(true)
      toast.success('Code promo appliqué — -10% !')
    } else {
      toast.error('Code promo invalide.')
    }
  }

  if (!items.length) {
    return (
      <div className="max-w-4xl mx-auto">
        <EmptyCart />
      </div>
    )
  }

  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal >= 100 ? 0 : 9.90
  const total    = subtotal - discount + shipping

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">

      {/* Items list */}
      <div className="lg:col-span-2 space-y-4">
        <CartSummary />

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00D9FF] hover:underline"
        >
          ← Continuer mes achats
        </Link>
      </div>

      {/* Order summary sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">

          {/* Summary card */}
          <div className="rounded-2xl border border-gray-100 p-6 space-y-4 bg-white shadow-sm">
            <h3 className="font-serif text-lg font-bold text-charcoal">Récapitulatif</h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Sous-total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Code BIENVENUE10</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-charcoal/60">Livraison</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                  {shipping === 0 ? 'Gratuite ✓' : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-100 font-bold text-charcoal">
              <span>Total</span>
              <span className="font-serif text-xl text-[#00D9FF]">{formatPrice(total)}</span>
            </div>

            {/* Promo code */}
            {!promoApplied && (
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm">
                  <Tag className="w-3.5 h-3.5 text-charcoal/30" />
                  <input
                    type="text"
                    placeholder="Code promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-charcoal placeholder-charcoal/30 text-xs"
                  />
                </div>
                <button
                  onClick={handlePromoApply}
                  className="px-3 py-2 rounded-xl bg-charcoal text-white text-xs font-semibold hover:bg-charcoal/80 transition-colors whitespace-nowrap"
                >
                  Appliquer
                </button>
              </div>
            )}

            {/* Auth nudge — shown when not logged in */}
            {!user && (
              <div className="rounded-xl bg-charcoal/5 border border-charcoal/10 p-4 text-center">
                <User className="w-5 h-5 text-charcoal/30 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-charcoal mb-0.5">Compte requis pour commander</p>
                <p className="text-[10px] text-charcoal/50 mb-3">Créez votre compte gratuitement et recevez -10% sur votre première commande.</p>
                <Link
                  href="/auth/signup?redirect=/cart"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D9FF] hover:underline"
                >
                  Rejoindre la famille ❄️ →
                </Link>
              </div>
            )}

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#00D9FF] text-charcoal font-bold text-sm hover:bg-[#00EEFF] hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all disabled:opacity-60"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Redirection...' : 'Secure Checkout'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="text-center text-[10px] text-charcoal/30">
              Paiement sécurisé SSL · Stripe
            </p>
          </div>

          {/* Free shipping nudge */}
          {shipping > 0 && (
            <div className="rounded-xl bg-[#E0F7FF] border border-[#00D9FF]/20 p-4 text-xs text-charcoal/70">
              Plus que <strong className="text-[#00D9FF]">{formatPrice(100 - subtotal)}</strong> pour la livraison offerte !
            </div>
          )}

          <TrustSignals />
        </div>
      </div>
    </div>
  )
}
