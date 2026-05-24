'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import type { Category } from '@/types'

const TABS: { key: Category | undefined; label: string }[] = [
  { key: undefined,  label: 'Tout' },
  { key: 'bracelet', label: 'Bracelets' },
  { key: 'pendant',  label: 'Pendentifs' },
  { key: 'ring',     label: 'Bagues' },
  { key: 'chain',    label: 'Chaînes' },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<Category | undefined>(undefined)
  const { products, loading }     = useProducts({ featured: true, category: activeTab, limit: 8 })

  return (
    <section style={{ background: '#0A0A0A' }}>

      {/* ── Huge section header — VibeVault style ──────── */}
      <div className="section-container pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <p
                className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}
              >
                Bestsellers
              </p>
              <h2
                className="font-serif font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
              >
                Nos pièces les plus<br className="hidden sm:block" /> populaires
              </h2>
            </div>

            <Link href="/shop" className="flex-shrink-0">
              <motion.span
                className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-bold text-sm"
                style={{ background: '#D4AF37', color: '#0A0A0A' }}
                whileHover={{ background: '#E8C572', boxShadow: '0 0 28px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                Voir la boutique
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>

          {/* Description + filter tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Pendentifs, chaînes, bagues, bracelets. Toutes nos pièces
              moissanite VVS certifiées GRA. Portez-vous avec éclat.
            </p>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={String(tab.key)}
                  onClick={() => setActiveTab(tab.key)}
                  className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-200"
                  style={{
                    background: activeTab === tab.key ? '#D4AF37' : 'rgba(255,255,255,0.06)',
                    color:      activeTab === tab.key ? '#0A0A0A'  : 'rgba(255,255,255,0.6)',
                    border:     activeTab === tab.key ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'var(--font-space-mono), monospace',
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

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl animate-pulse"
                style={{ background: '#141414' }}
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
