'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PRICE_TIERS } from '@/types'

const ACCENTS = [
  { bg: 'rgba(0,217,255,0.06)',  border: 'rgba(0,217,255,0.12)',  color: '#00D9FF' },
  { bg: 'rgba(0,217,255,0.08)',  border: 'rgba(0,217,255,0.16)',  color: '#00D9FF' },
  { bg: 'rgba(201,168,76,0.06)', border: 'rgba(201,168,76,0.12)', color: '#C9A84C' },
  { bg: 'rgba(201,168,76,0.08)', border: 'rgba(201,168,76,0.16)', color: '#C9A84C' },
  { bg: 'rgba(201,168,76,0.10)', border: 'rgba(201,168,76,0.22)', color: '#E8C878' },
]

export function PriceTiers() {
  return (
    <section
      className="section-pad overflow-hidden"
      style={{ background: '#0A0B12' }}
    >
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00D9FF] mb-4">
            5 gammes
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            Un niveau pour{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #C9A84C, #E8C878)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              chaque flex
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRICE_TIERS.map((tier, i) => {
            const accent = ACCENTS[i]
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/shop?tier=${tier.id}`}
                  className="group flex flex-col h-full p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: accent.bg,
                    border: `1px solid ${accent.border}`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(-4px)'
                    el.style.borderColor = accent.color + '44'
                    el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${accent.color}18`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(0)'
                    el.style.borderColor = accent.border
                    el.style.boxShadow = 'none'
                  }}
                >
                  {/* Number */}
                  <span
                    className="text-[10px] font-black tracking-[0.3em] mb-4 block"
                    style={{ color: 'rgba(255,255,255,0.15)' }}
                  >
                    0{i + 1}
                  </span>

                  {/* Price range */}
                  <p
                    className="text-sm font-black tracking-wide mb-1"
                    style={{ color: accent.color }}
                  >
                    {tier.range}
                  </p>

                  {/* Label */}
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{tier.label}</h3>

                  {/* Description */}
                  <p className="text-white/35 text-xs leading-relaxed flex-1 mb-6">
                    {tier.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-200 group-hover:gap-3"
                    style={{ color: accent.color }}
                  >
                    {tier.cta} <ArrowRight style={{ width: 12, height: 12 }} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
