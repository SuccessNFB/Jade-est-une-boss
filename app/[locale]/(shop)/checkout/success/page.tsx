'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams }   from 'next/navigation'
import Link                  from 'next/link'
import { motion }            from 'framer-motion'
import { CheckCircle }       from 'lucide-react'
import { IcekeyLogo }        from '@/components/ui/IcekeyLogo'
import { Button }            from '@/components/ui/Button'
import { useCartStore }      from '@/store/cartStore'
import { trackPurchase, trackSignUp } from '@/lib/analytics/gtag'

export default function CheckoutSuccessPage() {
  const { clearCart }  = useCartStore()
  const searchParams   = useSearchParams()
  const firedRef       = useRef(false)   /* fire conversion once only */

  useEffect(() => {
    clearCart()
  }, [clearCart])

  useEffect(() => {
    if (firedRef.current) return
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return

    firedRef.current = true

    fetch(`/api/stripe/session?id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.value) {
          trackPurchase({
            transactionId: data.id,
            value:         data.value,
            currency:      data.currency,
            items:         data.items,
          })
        }
      })
      .catch(() => {})
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-product p-10 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-ice-50 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-ice-500" />
        </motion.div>

        <div className="flex justify-center mb-4">
          <IcekeyLogo variant="full" height={56} color="#333333" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-charcoal mb-3">
          Commande confirmée !
        </h1>
        <p className="text-charcoal/60 mb-2">
          Merci pour votre confiance. Un email de confirmation vous a été envoyé.
        </p>
        <p className="text-charcoal/40 text-sm mb-8">
          Votre bijou sera expédié sous 2–3 jours ouvrés avec suivi.
        </p>

        <div className="space-y-3">
          <Link href="/" className="block">
            <Button variant="primary" size="lg" className="w-full">
              Retour à l&apos;accueil
            </Button>
          </Link>
          <Link href="/shop" className="block">
            <Button variant="ghost" size="lg" className="w-full">
              Continuer mes achats
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
