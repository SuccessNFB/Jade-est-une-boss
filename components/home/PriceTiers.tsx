'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PRICE_TIERS } from '@/types'

const TIER_ACCENTS = ['border-ice-500/30', 'border-ice-400/40', 'border-gold-300/30', 'border-gold-400/40', 'border-gold-300/60']
const TIER_GLOW    = ['hover:shadow-ice',  'hover:shadow-ice',  'hover:shadow-gold',  'hover:shadow-gold', 'hover:shadow-gold']

export function PriceTiers() {
  return (
    <section className="section-padding bg-charcoal overflow-hidden">
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-ice-400 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            5 gammes
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Un niveau pour{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-400">
              chaque flex
            </span>
          </h2>
        </motion.div>

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
                className={`group flex flex-col h-full p-6 rounded-2xl border bg-white/5
                            ${TIER_ACCENTS[i]} hover:bg-white/10
                            transition-all duration-300 ${TIER_GLOW[i]}`}
              >
                {/* Tier number */}
                <span className="text-xs font-bold text-white/20 tracking-widest mb-3">0{i + 1}</span>

                {/* Range */}
                <p className={`text-sm font-bold tracking-wide mb-1 ${i < 2 ? 'text-ice-400' : 'text-gold-300'}`}>
                  {tier.range}
                </p>

                {/* Label */}
                <h3 className="font-serif text-xl font-bold text-white mb-2">{tier.label}</h3>

                {/* Desc */}
                <p className="text-white/45 text-xs leading-relaxed flex-1 mb-4">
                  {tier.description}
                </p>

                {/* CTA */}
                <div className={`flex items-center gap-1.5 text-xs font-bold group-hover:gap-3 transition-all
                                 ${i < 2 ? 'text-ice-400' : 'text-gold-300'}`}>
                  {tier.cta} <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ROAS preview bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 p-4 rounded-2xl border border-white/10 bg-white/5"
        >
          <div className="flex flex-wrap justify-around gap-4 text-center">
            {PRICE_TIERS.map((tier) => (
              <div key={tier.id}>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">{tier.label}</p>
                <p className="text-ice-400 text-xs font-bold">ROAS {tier.roas_target}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
