'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { IcekeyLogo } from '@/components/ui/IcekeyLogo'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { UserMenu } from '@/components/auth/UserMenu'
import { cn } from '@/lib/utils/cn'

/* ── Megamenu data ──────────────────────────────────────────── */
const MEGA: Record<string, {
  cols: { title: string; links: { label: string; href: string }[] }[]
  promo: { label: string; sub: string; href: string }
}> = {
  CHAINS: {
    cols: [
      {
        title: 'Style',
        links: [
          { label: 'Cuban Links',   href: '/shop?cat=chain&q=cuban' },
          { label: 'Tennis Chains', href: '/shop?cat=chain&q=tennis' },
          { label: 'Rope Chains',   href: '/shop?cat=chain&q=rope' },
        ],
      },
      {
        title: 'Taille',
        links: [
          { label: '8mm — Starter',    href: '/shop?cat=chain' },
          { label: '12mm — Statement', href: '/shop?cat=chain' },
          { label: '18mm — Premium',   href: '/shop?cat=chain' },
        ],
      },
    ],
    promo: { label: 'Best Seller', sub: 'Cuban 12mm · 16"', href: '/shop?cat=chain' },
  },
  PENDANTS: {
    cols: [
      {
        title: 'Type',
        links: [
          { label: 'Custom Pendants', href: '/builder' },
          { label: 'Solitaire VVS',   href: '/shop?cat=pendant&q=solitaire' },
          { label: 'Religious',       href: '/shop?cat=pendant&q=religious' },
          { label: 'Hip-Hop Icons',   href: '/shop?cat=pendant&q=icon' },
        ],
      },
      {
        title: 'Collection',
        links: [
          { label: 'Nouveautés',   href: '/shop?cat=pendant&sort=newest' },
          { label: 'Best Sellers', href: '/shop?cat=pendant' },
          { label: 'Sur mesure',   href: '/builder' },
        ],
      },
    ],
    promo: { label: 'Custom Pendant', sub: 'Crée ta pièce unique', href: '/builder' },
  },
  MEN: {
    cols: [
      {
        title: 'Catégories',
        links: [
          { label: 'Chaînes',    href: '/shop?cat=chain' },
          { label: 'Bracelets',  href: '/shop?cat=bracelet' },
          { label: 'Bagues',     href: '/shop?cat=ring' },
          { label: 'Montres',    href: '/shop?cat=watch' },
          { label: 'Pendentifs', href: '/shop?cat=pendant' },
        ],
      },
    ],
    promo: { label: 'Best Sellers Men', sub: 'Les plus portés', href: '/shop' },
  },
  WOMEN: {
    cols: [
      {
        title: 'Catégories',
        links: [
          { label: 'Bagues',     href: '/shop?cat=ring' },
          { label: 'Boucles',    href: '/shop?cat=earring' },
          { label: 'Bracelets',  href: '/shop?cat=bracelet' },
          { label: 'Pendentifs', href: '/shop?cat=pendant' },
          { label: 'Sets',       href: '/shop?cat=set' },
        ],
      },
    ],
    promo: { label: 'Curated for Her', sub: 'Sélection premium', href: '/shop' },
  },
}

const NAV = [
  { label: 'MEN',          href: '/shop',              hasMega: true,  accent: false },
  { label: 'WOMEN',        href: '/shop',              hasMega: true,  accent: false },
  { label: 'NEW DROPS',    href: '/shop?sort=newest',  hasMega: false, accent: false },
  { label: 'CHAINS',       href: '/shop?cat=chain',    hasMega: true,  accent: false },
  { label: 'PENDANTS',     href: '/shop?cat=pendant',  hasMega: true,  accent: false },
  { label: 'RINGS',        href: '/shop?cat=ring',     hasMega: false, accent: false },
  { label: 'BRACELETS',    href: '/shop?cat=bracelet', hasMega: false, accent: false },
  { label: 'WATCHES',      href: '/shop?cat=watch',    hasMega: false, accent: false },
  { label: 'CUSTOM',       href: '/builder',           hasMega: false, accent: false },
  { label: 'SALE',         href: '/shop?tier=entry',   hasMega: false, accent: true  },
]

export function Header() {
  const [megaOpen,    setMegaOpen]    = useState<string | null>(null)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled,    setScrolled]    = useState(false)
  const megaTimer                     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchRef                     = useRef<HTMLInputElement>(null)

  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  /* Scroll detection for header background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMega  = useCallback((label: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    if (MEGA[label]) setMegaOpen(label)
  }, [])
  const closeMega = useCallback(() => {
    megaTimer.current = setTimeout(() => setMegaOpen(null), 120)
  }, [])
  const keepMega  = useCallback(() => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
  }, [])

  useEffect(() => { setMobileOpen(false); setSearchOpen(false) }, [])
  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])
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
      {/* ── Main header ──────────────────────────────────────── */}
      <motion.header
        animate={{
          backgroundColor: scrolled
            ? 'rgba(8,9,14,0.97)'
            : 'rgba(8,9,14,0.85)',
          borderBottomColor: scrolled
            ? 'rgba(255,255,255,0.07)'
            : 'rgba(255,255,255,0.04)',
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-[60px] lg:h-[72px] gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group" aria-label="ICEKEY">
              <IcekeyLogo
                variant="horizontal"
                height={26}
                color="#ffffff"
                className="transition-opacity duration-200 group-hover:opacity-60"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0 flex-1 justify-center">
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
                      'block px-3.5 py-2 text-[10px] font-black tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-150',
                      item.accent
                        ? 'text-[#F5C542] hover:text-white'
                        : 'text-white/60 hover:text-white',
                      megaOpen === item.label && 'text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                  {megaOpen === item.label && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-3.5 right-3.5 h-px bg-[#F5C542]"
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Tablet nav */}
            <nav className="hidden lg:flex xl:hidden items-center gap-5 flex-1 justify-center">
              {[NAV[3], NAV[4], NAV[5], NAV[6], NAV[8]].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[10px] font-black tracking-[0.18em] uppercase text-white/60 hover:text-white whitespace-nowrap transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 flex-shrink-0">

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-white/60 hover:text-white transition-colors rounded-lg"
                aria-label="Recherche"
              >
                <Search style={{ width: 17, height: 17 }} />
              </button>

              <UserMenu />

              <button
                onClick={toggleCart}
                className="relative p-2.5 text-white/60 hover:text-white transition-colors rounded-lg"
                aria-label="Panier"
              >
                <ShoppingBag style={{ width: 17, height: 17 }} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full bg-[#F5C542] text-[#08090E] text-[9px] font-black"
                      style={{ width: 16, height: 16 }}
                    >
                      {count > 9 ? '9+' : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <div className="hidden sm:block ml-1">
                <LocaleSwitcher />
              </div>

              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden p-2.5 text-white/60 hover:text-white transition-colors rounded-lg ml-1"
                aria-label="Menu"
              >
                <Menu style={{ width: 19, height: 19 }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Search bar ─────────────────────────────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/[0.06]"
              style={{ background: 'rgba(8,9,14,0.98)' }}
            >
              <div className="section-container py-3.5">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                  <Search style={{ width: 15, height: 15 }} className="text-white/65 flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Chains, pendants, custom jewelry…"
                    className="flex-1 bg-transparent text-white text-sm placeholder-white/20 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-white/65 hover:text-white transition-colors"
                  >
                    <X style={{ width: 15, height: 15 }} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Megamenu ─────────────────────────────────────────── */}
      <AnimatePresence>
        {megaOpen && MEGA[megaOpen] && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[72px] left-0 right-0 z-40 border-t border-b border-white/[0.06]"
            style={{
              background: 'rgba(8,9,14,0.98)',
              backdropFilter: 'blur(20px)',
            }}
            onMouseEnter={keepMega}
            onMouseLeave={closeMega}
          >
            <div className="section-container py-8">
              <div className="flex gap-14">
                {MEGA[megaOpen].cols.map((col) => (
                  <div key={col.title} className="min-w-[130px]">
                    <p className="text-[9px] font-black tracking-[0.25em] uppercase text-white/60 mb-4">
                      {col.title}
                    </p>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setMegaOpen(null)}
                            className="text-sm text-white/55 hover:text-white transition-colors font-medium"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={NAV.find((n) => n.label === megaOpen)?.href ?? '/shop'}
                      onClick={() => setMegaOpen(null)}
                      className="inline-flex items-center gap-1.5 mt-5 text-[9px] font-black tracking-[0.2em] uppercase text-[#F5C542] hover:text-white transition-colors"
                    >
                      Voir tout →
                    </Link>
                  </div>
                ))}

                {/* Promo card */}
                <div className="ml-auto self-start">
                  <Link
                    href={MEGA[megaOpen].promo.href}
                    onClick={() => setMegaOpen(null)}
                    className="group block w-52 p-5 rounded-2xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(245,197,66,0.07) 0%, rgba(201,168,76,0.05) 100%)',
                      border: '1px solid rgba(245,197,66,0.12)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(245,197,66,0.28)'
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245,197,66,0.1) 0%, rgba(201,168,76,0.07) 100%)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(245,197,66,0.12)'
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245,197,66,0.07) 0%, rgba(201,168,76,0.05) 100%)'
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm mb-4"
                      style={{ background: 'rgba(245,197,66,0.1)', color: '#F5C542' }}
                    >
                      ◆
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-[#F5C542] transition-colors">
                      {MEGA[megaOpen].promo.label}
                    </p>
                    <p className="text-xs text-white/70 mt-1">{MEGA[megaOpen].promo.sub}</p>
                    <span className="inline-block mt-4 text-[9px] font-black tracking-[0.2em] uppercase text-[#F5C542]">
                      Découvrir →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[82vw] max-w-[320px] flex flex-col overflow-y-auto"
              style={{ background: '#141412', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <IcekeyLogo variant="horizontal" height={22} color="#ffffff" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-white/60 hover:text-white transition-colors"
                >
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>

              <div className="px-5 py-4 border-b border-white/[0.06]">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Search style={{ width: 14, height: 14 }} className="text-white/70" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Chains, pendants…"
                    className="flex-1 bg-transparent text-white text-sm placeholder-white/25 outline-none"
                  />
                </form>
              </div>

              <nav className="flex-1 px-5 py-3">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center justify-between py-3.5 border-b text-sm font-black tracking-[0.12em] transition-colors',
                      'border-white/[0.04]',
                      item.accent ? 'text-[#F5C542]' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {item.label}
                    <span className="text-white/55">›</span>
                  </Link>
                ))}
              </nav>

              <div className="px-5 py-5 border-t border-white/[0.06] space-y-3.5">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <User style={{ width: 15, height: 15 }} />
                  Mon compte
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); toggleCart() }}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <ShoppingBag style={{ width: 15, height: 15 }} />
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
