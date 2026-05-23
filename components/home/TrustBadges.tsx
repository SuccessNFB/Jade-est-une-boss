'use client'

import { motion } from 'framer-motion'
import { Shield, RefreshCw, Truck, Award, Gem, Zap } from 'lucide-react'

const BADGES = [
  { icon: Award,     title: 'Certifié GRA',       desc: 'Chaque pierre livrée avec certificat numéroté.' },
  { icon: Gem,       title: 'VVS · Couleur D',     desc: 'Le top de la gamme. Passe tous les diamond tests.' },
  { icon: Zap,       title: 'Livraison 4–7 jours', desc: 'Expédition express depuis notre partenaire. Suivi inclus.' },
  { icon: Truck,     title: 'Livraison offerte',   desc: 'Gratuite dès €100 en France, Belgique, Suisse.' },
  { icon: RefreshCw, title: 'Retour 30 jours',     desc: 'Satisfait ou remboursé, sans justification.' },
  { icon: Shield,    title: 'Paiement sécurisé',   desc: 'Stripe 3D Secure. CB, Apple Pay, PayPal, Klarna.' },
]

export function TrustBadges() {
  return (
    <section
      className="section-pad border-t"
      style={{ background: '#141412', borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#F5C542] mb-4">
            Nos engagements
          </p>
          <h2 className="font-serif text-3xl font-bold text-white">
            Zéro compromis
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {BADGES.map((b, i) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center text-center gap-4 p-5 rounded-2xl transition-all duration-300 group cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(245,197,66,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(245,197,66,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: 'rgba(245,197,66,0.08)' }}
                >
                  <Icon style={{ width: 18, height: 18, color: '#F5C542' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white leading-tight mb-1.5">{b.title}</p>
                  <p className="text-xs text-white/70 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
