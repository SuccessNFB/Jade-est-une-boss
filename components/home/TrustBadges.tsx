'use client'

import { motion } from 'framer-motion'
import { Shield, RefreshCw, Truck, Award, Gem, Zap } from 'lucide-react'

const BADGES = [
  { icon: Award,     title: 'Certifié GRA',         desc: 'Chaque pierre livrée avec certificat d\'authenticité numéroté.' },
  { icon: Gem,       title: 'VVS · Couleur D',       desc: 'Clarté VVS, couleur D — le top de la gamme. Passe tous les tests.' },
  { icon: Zap,       title: 'Livraison 4-7 jours',   desc: 'Expédition express depuis notre partenaire NUOYA. Suivi inclus.' },
  { icon: Truck,     title: 'Livraison offerte',      desc: 'Gratuite dès €100 d\'achat en France, Belgique, Suisse.' },
  { icon: RefreshCw, title: 'Retour 30 jours',        desc: 'Satisfait ou remboursé, sans justification. Retour gratuit.' },
  { icon: Shield,    title: 'Paiement sécurisé',      desc: 'Stripe 3D Secure. CB, Apple Pay, PayPal, Klarna.' },
]

export function TrustBadges() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Nos engagements
          </p>
          <h2 className="font-serif text-3xl font-bold text-charcoal">
            Zéro compromis
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {BADGES.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-product flex items-center justify-center">
                  <Icon className="w-5 h-5 text-ice-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-charcoal leading-tight">{b.title}</p>
                  <p className="text-xs text-charcoal/50 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
