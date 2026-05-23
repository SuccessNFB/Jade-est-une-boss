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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00D9FF] mb-3">
              Bestsellers
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Les coups de cœur
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={String(tab.key)}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-200"
                style={{
                  background: activeTab === tab.key
                    ? '#00D9FF'
                    : 'rgba(255,255,255,0.05)',
                  color: activeTab === tab.key
                    ? '#08090E'
                    : 'rgba(255,255,255,0.45)',
                  border: activeTab === tab.key
                    ? '1px solid transparent'
                    : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {tab.label}
              </button>
            ))}
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
                initial={{ opacity: 0, y: 20 }}
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
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white/40 hover:text-white transition-colors duration-200"
          >
            Voir toute la collection
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
