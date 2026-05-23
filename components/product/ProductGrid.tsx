'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Grid3X3, List, ChevronDown } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import type { Category, PriceTier, Metal } from '@/types'
import { PRICE_TIERS, METALS } from '@/types'
import { cn } from '@/lib/utils/cn'

interface ProductGridProps {
  initialCategory?: Category
  initialTier?:     PriceTier
  initialSearch?:   string
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{title}</p>
        <ChevronDown className={cn('w-3 h-3 text-white/65 transition-transform', open && 'rotate-180')} />
      </button>
      {open && children}
    </div>
  )
}

const COLOR_SWATCHES = [
  { value: 'silver', label: 'Argent',  bg: '#C0C0C0' },
  { value: 'gold',   label: 'Or',      bg: '#D4AF37' },
  { value: 'rose',   label: 'Or Rose', bg: '#E8B4B8' },
]

export function ProductGrid({ initialCategory, initialTier, initialSearch }: ProductGridProps) {
  const [category,    setCategory]    = useState<Category | undefined>(initialCategory)
  const [tier,        setTier]        = useState<PriceTier | undefined>(initialTier)
  const [metal,       setMetal]       = useState<Metal | undefined>()
  const [color,       setColor]       = useState<string>('')
  const [search,      setSearch]      = useState(initialSearch ?? '')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly,  setOnSaleOnly]  = useState(false)
  const [sortBy,      setSortBy]      = useState<'new' | 'price-asc' | 'price-desc' | 'popular'>('new')
  const [viewMode,    setViewMode]    = useState<'grid' | 'list'>('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { products, loading } = useProducts({ category, priceTier: tier, search })

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

  function Sidebar() {
    return (
      <div className="space-y-0">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Filtres</p>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[10px] font-bold text-[#D4AF37] hover:underline tracking-wide"
            >
              Réinitialiser
            </button>
          )}
        </div>

        <FilterSection title="Gamme de prix">
          <div className="space-y-2.5">
            {PRICE_TIERS.map((t) => (
              <label key={t.id} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={tier === t.id}
                    onChange={() => setTier(tier === t.id ? undefined : t.id)}
                    className="w-3.5 h-3.5 accent-[#D4AF37]"
                  />
                  <span className="text-xs text-white/65 group-hover:text-white/80 transition-colors">{t.label}</span>
                </div>
                <span className="text-[10px] text-white/60">{t.range}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Métal">
          <div className="space-y-2.5">
            {(Object.entries(METALS) as [Metal, { label: string; color: string; surcharge: number }][]).map(([key, val]) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={metal === key}
                  onChange={() => setMetal(metal === key ? undefined : key)}
                  className="w-3.5 h-3.5 accent-[#D4AF37]"
                />
                <span
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                  style={{ background: val.color, border: '1px solid rgba(255,255,255,0.15)' }}
                />
                <span className="text-xs text-white/65 group-hover:text-white/80 transition-colors">{val.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Coloris">
          <div className="flex gap-2.5">
            {COLOR_SWATCHES.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(color === c.value ? '' : c.value)}
                title={c.label}
                className="w-7 h-7 rounded-full transition-all hover:scale-110"
                style={{
                  background: c.bg,
                  border: color === c.value
                    ? '2px solid #D4AF37'
                    : '2px solid rgba(255,255,255,0.15)',
                  boxShadow: color === c.value ? '0 0 0 2px rgba(212,175,55,0.25)' : 'none',
                }}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Disponibilité">
          <div className="space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#D4AF37]"
              />
              <span className="text-xs text-white/65">En stock uniquement</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#D4AF37]"
              />
              <span className="text-xs text-white/65">En promotion</span>
            </label>
          </div>
        </FilterSection>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-3">Recherche</p>
          <input
            type="search"
            placeholder="Cuban, tennis, pendentif..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-xs text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/40"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-8 items-start">

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-28">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">

        {/* Sort bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white/70 hover:text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filtres
            {hasActiveFilters && (
              <span
                className="w-4 h-4 rounded-full text-[#08090E] text-[9px] font-black flex items-center justify-center"
                style={{ background: '#D4AF37' }}
              >
                !
              </span>
            )}
          </button>

          <span className="text-sm text-white/65">
            {loading ? '…' : `${sorted.length} bijou${sorted.length !== 1 ? 'x' : ''}`}
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-xl text-xs text-white/60 focus:outline-none cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <option value="new">Nouveautés</option>
              <option value="popular">Best Sellers</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
            </select>

            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => setViewMode('grid')}
                className="p-2 transition-colors"
                style={{
                  background: viewMode === 'grid' ? 'rgba(212,175,55,0.15)' : 'transparent',
                  color: viewMode === 'grid' ? '#D4AF37' : 'rgba(255,255,255,0.3)',
                }}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="p-2 transition-colors"
                style={{
                  background: viewMode === 'list' ? 'rgba(212,175,55,0.15)' : 'transparent',
                  color: viewMode === 'list' ? '#D4AF37' : 'rgba(255,255,255,0.3)',
                }}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {tier        && <Chip label={PRICE_TIERS.find((t) => t.id === tier)?.label ?? tier} onRemove={() => setTier(undefined)} />}
            {metal       && <Chip label={METALS[metal]?.label} onRemove={() => setMetal(undefined)} />}
            {color       && <Chip label={COLOR_SWATCHES.find((c) => c.value === color)?.label ?? color} onRemove={() => setColor('')} />}
            {inStockOnly && <Chip label="En stock" onRemove={() => setInStockOnly(false)} />}
            {onSaleOnly  && <Chip label="En promo"  onRemove={() => setOnSaleOnly(false)} />}
            {search      && <Chip label={`"${search}"`} onRemove={() => setSearch('')} />}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className={cn('grid gap-4', viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1')}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={cn('rounded-2xl animate-pulse', viewMode === 'grid' ? 'aspect-[3/4]' : 'h-28')}
                style={{ background: '#141414' }}
              />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className={cn('grid gap-4', viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1')}>
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

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 p-6 overflow-y-auto lg:hidden"
              style={{ background: '#121210', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white text-sm">Filtres</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar />
              <button
                onClick={() => setSidebarOpen(false)}
                className="mt-6 w-full py-3 rounded-full text-[#08090E] font-bold text-sm transition-colors"
                style={{ background: '#D4AF37' }}
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

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37]"
      style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
    >
      {label}
      <button onClick={onRemove} className="text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-20">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
        style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        📦
      </div>
      <h3 className="font-serif text-xl font-bold text-white mb-2">Aucun produit trouvé</h3>
      <p className="text-sm text-white/55 mb-6">Modifiez vos filtres pour plus de résultats.</p>
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-full text-[#08090E] font-bold text-sm transition-colors"
        style={{ background: '#D4AF37' }}
      >
        Voir toute la collection
      </button>
    </div>
  )
}
