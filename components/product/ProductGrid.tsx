'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import type { Category, PriceTier } from '@/types'
import { PRICE_TIERS } from '@/types'

const CATEGORIES: { value: Category | ''; label: string }[] = [
  { value: '',         label: 'Tout' },
  { value: 'ring',     label: 'Bagues' },
  { value: 'necklace', label: 'Colliers' },
  { value: 'pendant',  label: 'Pendentifs' },
  { value: 'bracelet', label: 'Bracelets' },
  { value: 'earring',  label: 'Boucles d\'oreille' },
]

interface ProductGridProps {
  initialCategory?: Category
  initialTier?:     PriceTier
  initialSearch?:   string
}

export function ProductGrid({ initialCategory, initialTier, initialSearch }: ProductGridProps) {
  const [category, setCategory] = useState<Category | undefined>(initialCategory)
  const [tier,     setTier]     = useState<PriceTier | undefined>(initialTier)
  const [search,   setSearch]   = useState(initialSearch ?? '')
  const [sortBy,   setSortBy]   = useState<'new' | 'price-asc' | 'price-desc'>('new')

  const { products, loading } = useProducts({ category, priceTier: tier, search })

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value || undefined)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                category === (c.value || undefined)
                  ? 'bg-charcoal text-white'
                  : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Price tier filter */}
          <select
            value={tier ?? ''}
            onChange={(e) => setTier((e.target.value as PriceTier) || undefined)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-charcoal focus:border-ice-500 focus:outline-none"
          >
            <option value="">Tous les prix</option>
            {PRICE_TIERS.map((t) => (
              <option key={t.id} value={t.id}>{t.range}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-charcoal focus:border-ice-500 focus:outline-none"
          >
            <option value="new">Nouveautés</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Rechercher un bijou..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-ice-500 focus:outline-none mb-8"
      />

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-charcoal/40 mb-6">
          {sorted.length} bijou{sorted.length !== 1 ? 'x' : ''} trouvé{sorted.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-20 text-charcoal/40">
          <SlidersHorizontal className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucun bijou ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {sorted.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
