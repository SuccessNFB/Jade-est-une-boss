'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { IcekeyLogo } from '@/components/ui/IcekeyLogo'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { cn } from '@/lib/utils/cn'

/* ── Megamenu data ──────────────────────────────────────────── */
const MEGA: Record<string, { cols: { title: string; links: { label: string; href: string }[] }[]; promo: { label: string; sub: string; href: string } }> = {
  CHAINS: {
    cols: [
      {
        title: 'Par style',
        links: [
          { label: 'Cuban Links',    href: '/shop?cat=chain&q=cuban' },
          { label: 'Tennis Chains',  href: '/shop?cat=chain&q=tennis' },
          { label: 'Rope Chains',    href: '/shop?cat=chain&q=rope' },
          { label: 'Box Chains',     href: '/shop?cat=chain&q=box' },
          { label: 'Figaro Chains',  href: '/shop?cat=chain&q=figaro' },
        ],
      },
      {
        title: 'Par taille',
        links: [
          { label: '8mm — Starter',    href: '/shop?cat=chain' },
          { label: '12mm — Statement', href: '/shop?cat=chain' },
          { label: '18mm — Premium',   href: '/shop?cat=chain' },
          { label: '24mm — Ultra',     href: '/shop?cat=chain' },
        ],
      },
    ],
    promo: { label: '🔥 Best Seller', sub: 'Cuban 12mm · 16"', href: '/shop?cat=chain' },
  },
  PENDANTS: {
    cols: [
      {
        title: 'Par type',
        links: [
          { label: 'Custom Pendants',  href: '/builder' },
          { label: 'Solitaire VVS',    href: '/shop?cat=pendant&q=solitaire' },
          { label: 'Religious',        href: '/shop?cat=pendant&q=religious' },
          { label: 'Hip-Hop Icons',    href: '/shop?cat=pendant&q=icon' },
          { label: 'Letter Pendants',  href: '/shop?cat=pendant&q=letter' },
        ],
      },
      {
        title: 'Collections',
        links: [
          { label: 'Nouveautés',   href: '/shop?cat=pendant&sort=newest' },
          { label: 'Best Sellers', href: '/shop?cat=pendant' },
          { label: 'Sur mesure',   href: '/builder' },
        ],
      },
    ],
    promo: { label: '✦ Custom Pendant', sub: 'Crée ta pièce unique', href: '/builder' },
  },
  MEN: {
    cols: [
      {
        title: 'Catégories',
        links: [
          { label: 'Chaînes',    href: '/shop?cat=chain' },
          { label: 'Bracelets', href: '/shop?cat=bracelet' },
          { label: 'Bagues',    href: '/shop?cat=ring' },
          { label: 'Montres',   href: '/shop?cat=watch' },
          { label: 'Pendentifs',href: '/shop?cat=pendant' },
        ],
      },
    ],
    promo: { label: '🏆 Best Sellers Men', sub: 'Les plus portés', href: '/shop' },
  },
  WOMEN: {
    cols: [
      {
        title: 'Catégories',
        links: [
          { label: 'Bagues',      href: '/shop?cat=ring' },
          { label: 'Boucles',     href: '/shop?cat=earring' },
          { label: 'Bracelets',   href: '/shop?cat=bracelet' },
          { label: 'Pendentifs',  href: '/shop?cat=pendant' },
          { label: 'Sets',        href: '/shop?cat=set' },
        ],
      },
    ],
    promo: { label: '💎 Curated for Her', sub: 'Sélection premium', href: '/shop' },
  },
}

/* ── Nav items ──────────────────────────────────────────────── */
const NAV = [
  { label: 'MEN',          href: '/shop',              hasMega: true,  accent: false },
  { label: 'WOMEN',        href: '/shop',              hasMega: true,  accent: false },
  { label: 'NEW DROPS 🔥', href: '/shop?sort=newest',  hasMega: false, accent: false },
  { label: 'BEST SELLERS', href: '/shop',              hasMega: false, accent: false },
  { label: 'CHAINS',       href: '/shop?cat=chain',    hasMega: true,  accent: false },
  { label: 'PENDANTS',     href: '/shop?cat=pendant',  hasMega: true,  accent: false },
  { label: 'RINGS',        href: '/shop?cat=ring',     hasMega: false, accent: false },
  { label: 'WATCHES',      href: '/shop?cat=watch',    hasMega: false, accent: false },
  { label: 'BRACELETS',    href: '/shop?cat=bracelet', hasMega: false, accent: false },
  { label: 'EARRINGS',     href: '/shop?cat=earring',  hasMega: false, accent: false },
  { label: 'CUSTOM',       href: '/builder',           hasMega: false, accent: false },
  { label: 'SALE 🔥',      href: '/shop?tier=entry',   hasMega: false, accent: true  },
]

export function Header() {
  const [megaOpen,    setMegaOpen]    = useState<string | null>(null)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const megaTimer                     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchRef                     = useRef<HTMLInputElement>(null)

  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  /* Megamenu hover with delay to prevent flicker */
  const openMega  = useCallback((label: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    if (MEGA[label]) setMegaOpen(label)
  }, [])
  const closeMega = useCallback(() => {
    megaTimer.current = setTimeout(() => setMegaOpen(null), 150)
  }, [])
  const keepMega  = useCallback(() => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [])

  /* Focus search input when opened */
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      {/* ── Main header ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal border-b border-white/10">
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <IcekeyLogo
                variant="horizontal"
                height={28}
                color="#ffffff"
                className="transition-opacity group-hover:opacity-70"
              />
            </Link>

            {/* Desktop nav — compact, scrollable on mid screens */}
            <nav className="hidden xl:flex items-center gap-0 overflow-x-auto scrollbar-none flex-1 justify-center">
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => openMega(item.label)}
                  onMouseLeave={closeMega}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-colors',
                      item.accent
                        ? 'text-[#00D9FF] hover:text-[#00EEFF]'
                        : 'text-white/70 hover:text-white',
                      megaOpen === item.label && 'text-white'
                    )}
                  >
                    {item.label}
                    {item.hasMega && MEGA[item.label] && (
                      <span className="inline-block ml-0.5 text-white/30">›</span>
                    )}
                  </Link>
                  {/* Active underline */}
                  {megaOpen === item.label && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00D9FF]"
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Tablet nav — show primary items */}
            <nav className="hidden lg:flex xl:hidden items-center gap-4 flex-1 justify-center">
              {[NAV[4], NAV[5], NAV[6], NAV[8], NAV[10]].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[11px] font-bold tracking-widest uppercase text-white/70 hover:text-white whitespace-nowrap transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 flex-shrink-0">

              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Recherche"
              >
                <Search className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="p-2.5 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10 hidden sm:flex"
                aria-label="Mon compte"
              >
                <User style={{ width: 18, height: 18 }} />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2.5 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Panier"
              >
                <ShoppingBag style={{ width: 18, height: 18 }} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#00D9FF] text-charcoal text-[9px] font-black flex items-center justify-center"
                      style={{ width: 18, height: 18 }}
                    >
                      {count > 9 ? '9+' : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Locale switcher */}
              <div className="hidden sm:block">
                <LocaleSwitcher />
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden p-2.5 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Menu"
              >
                <Menu style={{ width: 20, height: 20 }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Search bar (expands below header) ────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10 bg-charcoal"
            >
              <div className="section-container py-3">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                  <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chains, pendants, custom..."
                    className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Megamenu ─────────────────────────────────────────── */}
      <AnimatePresence>
        {megaOpen && MEGA[megaOpen] && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[80px] left-0 right-0 z-40 bg-charcoal border-t border-white/10 shadow-2xl"
            onMouseEnter={keepMega}
            onMouseLeave={closeMega}
          >
            <div className="section-container py-8">
              <div className="flex gap-12">
                {/* Subcategory columns */}
                {MEGA[megaOpen].cols.map((col) => (
                  <div key={col.title} className="min-w-[140px]">
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                      {col.title}
                    </p>
                    <ul className="space-y-2">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setMegaOpen(null)}
                            className="text-sm text-white/70 hover:text-[#00D9FF] transition-colors font-medium"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={NAV.find((n) => n.label === megaOpen)?.href ?? '/shop'}
                      onClick={() => setMegaOpen(null)}
                      className="inline-flex items-center gap-1 mt-4 text-[10px] font-bold tracking-widest uppercase text-[#00D9FF] hover:underline"
                    >
                      Voir tout →
                    </Link>
                  </div>
                ))}

                {/* Promo card */}
                <div className="ml-auto">
                  <Link
                    href={MEGA[megaOpen].promo.href}
                    onClick={() => setMegaOpen(null)}
                    className="block w-48 h-full rounded-xl bg-gradient-to-br from-[#00D9FF]/20 to-white/5 border border-[#00D9FF]/20 p-5 hover:border-[#00D9FF]/60 hover:bg-[#00D9FF]/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#00D9FF]/20 flex items-center justify-center text-xl mb-3">
                      ◆
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                      {MEGA[megaOpen].promo.label}
                    </p>
                    <p className="text-xs text-white/40 mt-1">{MEGA[megaOpen].promo.sub}</p>
                    <span className="inline-block mt-3 text-[10px] font-bold tracking-widest uppercase text-[#00D9FF]">
                      Découvrir →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile full-screen menu ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide panel from left */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[85vw] max-w-sm bg-charcoal flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <IcekeyLogo variant="horizontal" height={24} color="#ffffff" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search inside mobile menu */}
              <div className="px-6 py-4 border-b border-white/10">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chains, pendants..."
                    className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
                  />
                </form>
              </div>

              {/* Nav links stacked */}
              <nav className="flex-1 px-6 py-4">
                <div className="space-y-0.5">
                  {NAV.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center justify-between py-3.5 border-b border-white/5 text-sm font-semibold tracking-wide transition-colors',
                        item.accent ? 'text-[#00D9FF]' : 'text-white/70 hover:text-white'
                      )}
                    >
                      {item.label}
                      <span className="text-white/20">›</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Bottom actions */}
              <div className="px-6 py-5 border-t border-white/10 space-y-3">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  Mon compte
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); toggleCart() }}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Mon panier {count > 0 && `(${count})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
