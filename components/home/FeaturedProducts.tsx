'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import type { Category } from '@/types'

const TABS: { key: Category | undefined; label: string }[] = [
  { key: undefined,  label: 'All' },
  { key: 'bracelet', label: 'Bracelets' },
  { key: 'pendant',  label: 'Pendentifs' },
  { key: 'ring',     label: 'Bagues' },
  { key: 'chain',    label: 'Chaînes' },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<Category | undefined>(undefined)
  const { products, loading }     = useProducts({ featured: true, category: activeTab, limit: 8 })

  return (
    <section style={{ background: '#0F0F0D' }}>

      {/* ── Huge section header — VibeVault style ──────── */}
      <div className="section-container pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Title row: big text left + CTA right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h2
                className="font-display font-black text-white uppercase leading-[0.88]"
                style={{ fontSize: 'clamp(52px, 7.5vw, 96px)' }}
              >
                New Ice Jewelry<br />
                <span
                  style={{
                    WebkitTextStroke: '2px #F5C542',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  By Type
                </span>
              </h2>
            </div>

            {/* Right side: toggle + shop now — like VibeVault */}
            <div className="flex items-center gap-3 flex-shrink-0 lg:mb-3">
              {/* Decorative sun/sparkle */}
              <div className="hidden lg:block">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="10" fill="none" stroke="rgba(245,197,66,0.4)" strokeWidth="1" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1={24 + 13 * Math.cos((angle * Math.PI) / 180)}
                      y1={24 + 13 * Math.sin((angle * Math.PI) / 180)}
                      x2={24 + 20 * Math.cos((angle * Math.PI) / 180)}
                      y2={24 + 20 * Math.sin((angle * Math.PI) / 180)}
                      stroke="rgba(245,197,66,0.35)"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>
              </div>

              <Link href="/shop">
                <motion.span
                  className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-display font-black text-sm uppercase tracking-wider"
                  style={{ background: '#F5C542', color: '#0F0F0D' }}
                  whileHover={{ background: '#FAD555', boxShadow: '0 0 28px rgba(245,197,66,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shop Now
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </div>
          </div>

          {/* Description + filter tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Unleash your inner style icon — whether a pendant, chain, or ring,
              adorn yourself with confidence and swagger.
            </p>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={String(tab.key)}
                  onClick={() => setActiveTab(tab.key)}
                  className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200"
                  style={{
                    background: activeTab === tab.key ? '#F5C542' : 'rgba(255,255,255,0.06)',
                    color:      activeTab === tab.key ? '#0F0F0D'  : 'rgba(255,255,255,0.6)',
                    border:     activeTab === tab.key ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Product grid ──────────────────────────────────── */}
      <div className="section-container pb-20">

        {/* Counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            1/{products.length || '—'}
          </span>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span className="text-white/60 text-sm">←</span>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span className="text-white/60 text-sm">→</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl animate-pulse"
                style={{ background: '#1A1A17' }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            key={String(activeTab)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
