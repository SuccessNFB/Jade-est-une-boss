'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import type { Category } from '@/types'

const TABS: { key: Category | undefined; label: string }[] = [
  { key: undefined,   label: 'Tout' },
  { key: 'chain',     label: 'Chaînes' },
  { key: 'pendant',   label: 'Pendentifs' },
  { key: 'ring',      label: 'Bagues' },
  { key: 'bracelet',  label: 'Bracelets' },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<Category | undefined>(undefined)
  const { products, loading }     = useProducts({ featured: true, category: activeTab, limit: 8 })

  return (
    <section className="section-padding bg-white">
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              Bestsellers
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Les coups de cœur
            </h2>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={String(tab.key)}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-charcoal text-white'
                    : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link href="/shop">
            <Button variant="ghost" size="lg" className="group">
              Voir toute la collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
