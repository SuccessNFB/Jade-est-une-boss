'use client'

import { motion } from 'framer-motion'
import { Shield, RefreshCw, Truck, Award, Gem, Headphones } from 'lucide-react'

const BADGES = [
  {
    icon:    Shield,
    title:   'Paiement sécurisé',
    desc:    'Stripe 3D Secure. Vos données ne nous parviennent jamais.',
  },
  {
    icon:    Award,
    title:   'Certifié GRA',
    desc:    'Chaque pierre livrée avec certificat d\'authenticité.',
  },
  {
    icon:    Gem,
    title:   'Moissanite Grade D',
    desc:    'Clarté VVS, couleur D – qualité maximale garantie.',
  },
  {
    icon:    Truck,
    title:   'Livraison offerte',
    desc:    'Expédition gratuite dès €100 en France & Europe.',
  },
  {
    icon:    RefreshCw,
    title:   'Retour 30 jours',
    desc:    'Satisfait ou remboursé, sans justification.',
  },
  {
    icon:    Headphones,
    title:   'SAV 7j/7',
    desc:    'Notre équipe répond en moins de 2h.',
  },
]

export function TrustBadges() {
  return (
    <section className="section-padding bg-gray-50">
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
            L&apos;excellence à chaque étape
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-product flex items-center justify-center">
                  <Icon className="w-5 h-5 text-ice-500" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-charcoal">{badge.title}</p>
                  <p className="text-xs text-charcoal/50 mt-1 leading-relaxed">{badge.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
