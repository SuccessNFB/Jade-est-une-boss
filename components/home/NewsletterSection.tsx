'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Diamond, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NewsletterSection() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-ice-50 via-white to-gold-300/10">
      <div className="section-container max-w-2xl text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Diamond className="w-8 h-8 text-ice-400 mx-auto mb-6" fill="currentColor" />

          <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Restez informés
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-3">
            Soyez les premiers
          </h2>
          <p className="text-charcoal/55 mb-8 leading-relaxed">
            Nouvelles collections, offres exclusives et avant-premières.
            <br />
            <strong className="text-charcoal/70">-10% sur votre première commande</strong> en vous inscrivant.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-ice-100 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-ice-500" />
              </div>
              <p className="font-serif text-xl font-semibold text-charcoal">Merci !</p>
              <p className="text-sm text-charcoal/55">
                Votre code -10% arrive dans votre boîte mail.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="votre@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full border border-gray-200
                           focus:border-ice-500 focus:outline-none text-sm text-charcoal
                           placeholder:text-charcoal/30 bg-white shadow-sm"
              />
              <Button type="submit" variant="primary" size="md" loading={loading} className="flex-shrink-0">
                S&apos;inscrire
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}

          <p className="text-xs text-charcoal/30 mt-4">
            Pas de spam. Désabonnement en un clic. Données protégées (RGPD).
          </p>
        </motion.div>
      </div>
    </section>
  )
}
