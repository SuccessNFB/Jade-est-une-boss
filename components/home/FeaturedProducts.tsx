'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import type { Category } from '@/types'

const TABS: { key: Category | undefined; label: string }[] = [
  { key: undefined,  label: 'Tout' },
  { key: 'chain',    label: 'Chaînes' },
  { key: 'pendant',  label: 'Pendentifs' },
  { key: 'ring',     label: 'Bagues' },
  { key: 'bracelet', label: 'Bracelets' },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<Category | undefined>(undefined)
  const { products, loading }     = useProducts({ featured: true, category: activeTab, limit: 8 })

  return (
    <section className="section-pad" style={{ background: '#08090E' }}>
      <div className="section-container">

        {/* Header — editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Eyebrow */}
          <p
            className="text-[10px] font-bold tracking-[0.35em] uppercase mb-4"
            style={{ color: '#00D9FF' }}
          >
            Bestsellers
          </p>

          {/* Title + tabs row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              className="font-display font-black text-white uppercase leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
            >
              Nos pièces<br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00D9FF, #C9A84C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                signature
              </span>
            </h2>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={String(tab.key)}
                  onClick={() => setActiveTab(tab.key)}
                  className="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200"
                  style={{
                    background: activeTab === tab.key ? '#00D9FF' : 'rgba(255,255,255,0.07)',
                    color:      activeTab === tab.key ? '#08090E'  : 'rgba(255,255,255,0.65)',
                    border:     activeTab === tab.key ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl animate-pulse"
                style={{ background: '#0E0F16' }}
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

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link href="/shop">
            <motion.span
              className="group inline-flex items-center gap-2.5 cursor-pointer
                         px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider
                         transition-all duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.75)',
              }}
              whileHover={{
                borderColor: 'rgba(0,217,255,0.4)',
                color: '#00D9FF',
              }}
            >
              Voir toute la collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
