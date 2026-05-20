'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Grid3X3, List, ChevronDown } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import type { Category, PriceTier, Metal } from '@/types'
import { PRICE_TIERS, METALS } from '@/types'
import { cn } from '@/lib/utils/cn'
import { formatPrice } from '@/lib/utils/formatPrice'

/* ── Types ──────────────────────────────────────────────────── */
interface ProductGridProps {
  initialCategory?: Category
  initialTier?:     PriceTier
  initialSearch?:   string
}

/* ── Sidebar filter section wrapper ─────────────────────────── */
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-charcoal">{title}</p>
        <ChevronDown className={cn('w-3.5 h-3.5 text-charcoal/40 transition-transform', open && 'rotate-180')} />
      </button>
      {open && children}
    </div>
  )
}

const COLOR_SWATCHES = [
  { value: 'silver', label: 'Argent',  bg: '#C0C0C0' },
  { value: 'gold',   label: 'Or',      bg: '#FFD700' },
  { value: 'rose',   label: 'Or Rose', bg: '#F4A29B' },
]

export function ProductGrid({ initialCategory, initialTier, initialSearch }: ProductGridProps) {
  /* ── State ──────────────────────────────────────────────── */
  const [category,    setCategory]    = useState<Category | undefined>(initialCategory)
  const [tier,        setTier]        = useState<PriceTier | undefined>(initialTier)
  const [metal,       setMetal]       = useState<Metal | undefined>()
  const [color,       setColor]       = useState<string>('')
  const [search,      setSearch]      = useState(initialSearch ?? '')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly,  setOnSaleOnly]  = useState(false)
  const [sortBy,      setSortBy]      = useState<'new' | 'price-asc' | 'price-desc' | 'popular'>('new')
  const [viewMode,    setViewMode]    = useState<'grid' | 'list'>('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false) // mobile

  const { products, loading } = useProducts({ category, priceTier: tier, search })

  /* ── Client-side filtering & sorting ───────────────────── */
  let filtered = [...products]
  if (metal)       filtered = filtered.filter((p) => p.metal === metal)
  if (inStockOnly) filtered = filtered.filter((p) => p.stock > 0)
  if (onSaleOnly)  filtered = filtered.filter((p) => p.compare_at_price && p.compare_at_price > p.price)

  const sorted = filtered.sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0
  })

  function resetFilters() {
    setCategory(undefined)
    setTier(undefined)
    setMetal(undefined)
    setColor('')
    setSearch('')
    setInStockOnly(false)
    setOnSaleOnly(false)
  }

  const hasActiveFilters = !!(category || tier || metal || color || inStockOnly || onSaleOnly || search)

  /* ── Sidebar ─────────────────────────────────────────────── */
  function Sidebar() {
    return (
      <div className="space-y-0">
        {/* Reset */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal">Filtres</p>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[10px] font-semibold text-[#00D9FF] hover:underline tracking-wide"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Tier */}
        <FilterSection title="Gamme de prix">
          <div className="space-y-2">
            {PRICE_TIERS.map((t) => (
              <label key={t.id} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tier === t.id}
                    onChange={() => setTier(tier === t.id ? undefined : t.id)}
                    className="w-3.5 h-3.5 accent-[#00D9FF]"
                  />
                  <span className="text-xs text-charcoal/70 group-hover:text-charcoal transition-colors">{t.label}</span>
                </div>
                <span className="text-[10px] text-charcoal/40">{t.range}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Metal */}
        <FilterSection title="Métal">
          <div className="space-y-2">
            {(Object.entries(METALS) as [Metal, { label: string; color: string; surcharge: number }][]).map(([key, val]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={metal === key}
                  onChange={() => setMetal(metal === key ? undefined : key)}
                  className="w-3.5 h-3.5 accent-[#00D9FF]"
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                  style={{ background: val.color }}
                />
                <span className="text-xs text-charcoal/70 group-hover:text-charcoal transition-colors">{val.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Color swatch */}
        <FilterSection title="Coloris">
          <div className="flex gap-2.5">
            {COLOR_SWATCHES.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(color === c.value ? '' : c.value)}
                title={c.label}
                className={cn(
                  'w-7 h-7 rounded-full border-2 transition-all hover:scale-110',
                  color === c.value
                    ? 'border-[#00D9FF] shadow-[0_0_0_2px_#00D9FF40]'
                    : 'border-transparent'
                )}
                style={{ background: c.bg, outline: '2px solid rgba(0,0,0,0.08)' }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Disponibilité">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#00D9FF]"
              />
              <span className="text-xs text-charcoal/70">En stock uniquement</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#00D9FF]"
              />
              <span className="text-xs text-charcoal/70">En promotion</span>
            </label>
          </div>
        </FilterSection>

        {/* Search */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-charcoal mb-3">Recherche</p>
          <input
            type="search"
            placeholder="Cuban, tennis, pendentif..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#00D9FF] focus:outline-none"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-8 items-start">

      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-28">
        <Sidebar />
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 min-w-0">

        {/* Sort bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-200 text-xs font-semibold text-charcoal hover:border-[#00D9FF] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filtres
            {hasActiveFilters && (
              <span className="w-4 h-4 rounded-full bg-[#00D9FF] text-charcoal text-[9px] font-black flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Result count */}
          <span className="text-sm text-charcoal/40">
            {loading ? '...' : `${sorted.length} bijou${sorted.length !== 1 ? 'x' : ''}`}
          </span>

          <div className="flex items-center gap-2 ml-auto">
            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-charcoal focus:border-[#00D9FF] focus:outline-none"
            >
              <option value="new">Nouveautés</option>
              <option value="popular">Best Sellers</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
            </select>

            {/* View toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn('p-2 transition-colors', viewMode === 'grid' ? 'bg-charcoal text-white' : 'text-charcoal/40 hover:text-charcoal')}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn('p-2 transition-colors', viewMode === 'list' ? 'bg-charcoal text-white' : 'text-charcoal/40 hover:text-charcoal')}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {tier     && <Chip label={PRICE_TIERS.find((t) => t.id === tier)?.label ?? tier} onRemove={() => setTier(undefined)} />}
            {metal    && <Chip label={METALS[metal]?.label} onRemove={() => setMetal(undefined)} />}
            {color    && <Chip label={COLOR_SWATCHES.find((c) => c.value === color)?.label ?? color} onRemove={() => setColor('')} />}
            {inStockOnly && <Chip label="En stock" onRemove={() => setInStockOnly(false)} />}
            {onSaleOnly  && <Chip label="En promo"  onRemove={() => setOnSaleOnly(false)} />}
            {search   && <Chip label={`"${search}"`} onRemove={() => setSearch('')} />}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className={cn('grid gap-5', viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1')}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={cn('rounded-2xl bg-gray-100 animate-pulse', viewMode === 'grid' ? 'aspect-[3/4]' : 'h-28')} />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className={cn('grid gap-5', viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1')}>
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

      {/* ── Mobile sidebar drawer ────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-charcoal">Filtres</h3>
                <button onClick={() => setSidebarOpen(false)} className="text-charcoal/40 hover:text-charcoal">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar />
              <button
                onClick={() => setSidebarOpen(false)}
                className="mt-6 w-full bg-[#00D9FF] text-charcoal font-bold py-3 rounded-full text-sm hover:bg-[#00EEFF] transition-colors"
              >
                Voir {sorted.length} résultat{sorted.length !== 1 ? 's' : ''}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FF] border border-[#00D9FF]/30 text-xs font-semibold text-charcoal">
      {label}
      <button onClick={onRemove} className="text-charcoal/40 hover:text-charcoal transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 text-2xl">
        📦
      </div>
      <h3 className="font-serif text-xl font-bold text-charcoal mb-2">Aucun produit trouvé</h3>
      <p className="text-sm text-charcoal/50 mb-6">Essayez de modifier vos filtres pour plus de résultats.</p>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-full bg-[#00D9FF] text-charcoal font-semibold text-sm hover:bg-[#00EEFF] transition-colors"
      >
        Voir tout la collection
      </button>
    </div>
  )
}
