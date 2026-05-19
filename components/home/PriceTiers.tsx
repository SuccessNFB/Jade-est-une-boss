'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Diamond } from 'lucide-react'
import { PRICE_TIERS } from '@/types'

export function PriceTiers() {
  return (
    <section className="section-padding bg-charcoal overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-ice-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Nos gammes
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Une collection pour{' '}
            <span className="text-gradient-gold">chaque moment</span>
          </h2>
        </motion.div>

        {/* Tiers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRICE_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/shop?tier=${tier.id}`}
                className="group block h-full p-6 rounded-2xl border border-white/10 hover:border-ice-500/40
                           bg-white/5 hover:bg-white/10 transition-all duration-300
                           hover:shadow-ice"
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-ice-500/20 flex items-center justify-center transition-colors">
                    <Diamond className="w-5 h-5 text-ice-400" fill="currentColor" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gold-300 text-xs font-bold tracking-widest uppercase mb-1">
                      {tier.range}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-white mb-2">{tier.label}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{tier.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-ice-400 text-xs font-semibold group-hover:gap-2 transition-all">
                    Voir <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
