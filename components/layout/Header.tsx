'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { IcekeyLogo } from '@/components/ui/IcekeyLogo'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { UserMenu } from '@/components/auth/UserMenu'
import { cn } from '@/lib/utils/cn'

/* ── Announcement bar (embedded in header so it stays fixed) ── */
const BAR_MESSAGES = [
  '★★★★★  4.9/5 · Plus de 300 clients satisfaits · Noté Excellent',
  '✦ Livré depuis la France en 4–7 jours · suivi en temps réel inclus',
  '✦ Certifié GRA · Diamond test ✓ · prouvé à la réception',
  '✦ Satisfait ou remboursé 30 jours · livraison offerte dès 100 €',
]

function AnnouncementBarInner() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % BAR_MESSAGES.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <div
      className="relative text-white text-[10px] py-2 px-10 text-center font-semibold tracking-widest"
      style={{ background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <button
        onClick={() => setIndex((i) => (i - 1 + BAR_MESSAGES.length) % BAR_MESSAGES.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="inline-block text-white/65"
        >
          {BAR_MESSAGES[index]}
        </motion.span>
      </AnimatePresence>
      <button
        onClick={() => setIndex((i) => (i + 1) % BAR_MESSAGES.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
        aria-label="Suivant"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

/* ── Megamenu data ──────────────────────────────────────────── */
const MEGA: Record<string, {
  cols: { title: string; links: { label: string; href: string }[] }[]
  promo: { label: string; sub: string; href: string }
}> = {
  CHAÎNES: {
    cols: [
      {
        title: 'Style',
        links: [
          { label: 'Cuban Links',   href: '/shop?cat=chain&q=cuban' },
          { label: 'Chaînes Tennis', href: '/shop?cat=chain&q=tennis' },
          { label: 'Chaînes Rope',   href: '/shop?cat=chain&q=rope' },
        ],
      },
      {
        title: 'Taille',
        links: [
          { label: '8mm · Starter',    href: '/shop?cat=chain' },
          { label: '12mm · Statement', href: '/shop?cat=chain' },
          { label: '18mm · Premium',   href: '/shop?cat=chain' },
        ],
      },
    ],
    promo: { label: 'Meilleure vente', sub: 'Cuban 12mm · 16"', href: '/shop?cat=chain' },
  },
  PENDENTIFS: {
    cols: [
      {
        title: 'Type',
        links: [
          { label: 'Pendentifs custom', href: '/builder' },
          { label: 'Solitaire VVS',   href: '/shop?cat=pendant&q=solitaire' },
          { label: 'Religieux',        href: '/shop?cat=pendant&q=religious' },
          { label: 'Icônes Hip-Hop',  href: '/shop?cat=pendant&q=icon' },
        ],
      },
      {
        title: 'Collection',
        links: [
          { label: 'Nouveautés',   href: '/shop?cat=pendant&sort=newest' },
          { label: 'Meilleures ventes', href: '/shop?cat=pendant' },
          { label: 'Sur mesure',   href: '/builder' },
        ],
      },
    ],
    promo: { label: 'Pendentif sur mesure', sub: 'Crée ta pièce unique', href: '/builder' },
  },
  HOMMES: {
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
    promo: { label: 'Meilleures ventes', sub: 'Les plus portés', href: '/shop' },
  },
  FEMMES: {
    cols: [
      {
        title: 'Catégories',
        links: [
          { label: 'Bagues',     href: '/shop?cat=ring' },
          { label: 'Boucles',    href: '/shop?cat=earring' },
          { label: 'Bracelets',  href: '/shop?cat=bracelet' },
          { label: 'Pendentifs', href: '/shop?cat=pendant' },
          { label: 'Coffrets',   href: '/shop?cat=set' },
        ],
      },
    ],
    promo: { label: 'Pour elle', sub: 'Sélection premium', href: '/shop' },
  },
}

const NAV = [
  { label: 'HOMMES',       href: '/shop',              hasMega: true,  accent: false },
  { label: 'FEMMES',        href: '/shop',              hasMega: true,  accent: false },
  { label: 'NOUVEAUTÉS',   href: '/shop?sort=newest',  hasMega: false, accent: false },
  { label: 'CHAÎNES',       href: '/shop?cat=chain',    hasMega: true,  accent: false },
  { label: 'PENDENTIFS',    href: '/shop?cat=pendant',  hasMega: true,  accent: false },
  { label: 'BAGUES',         href: '/shop?cat=ring',     hasMega: false, accent: false },
  { label: 'BRACELETS',     href: '/shop?cat=bracelet', hasMega: false, accent: false },
  { label: 'MONTRES',        href: '/shop?cat=watch',    hasMega: false, accent: false },
  { label: 'SUR MESURE',    href: '/builder',           hasMega: false, accent: false },
  { label: 'PROMO',          href: '/shop?tier=entry',   hasMega: false, accent: true  },
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
      {/* ── Main header (announcement bar + nav, both fixed) ─── */}
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
        <AnnouncementBarInner />
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
                        ? 'text-[#D4AF37] hover:text-white'
                        : 'text-white/60 hover:text-white',
                      megaOpen === item.label && 'text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                  {megaOpen === item.label && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-3.5 right-3.5 h-px bg-[#D4AF37]"
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

              {/* Search — hidden on smallest mobile to avoid clutter */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden sm:block p-2.5 text-white/60 hover:text-white transition-colors rounded-lg"
                aria-label="Recherche"
              >
                <Search style={{ width: 17, height: 17 }} />
              </button>

              {/* UserMenu — desktop only */}
              <div className="hidden lg:block">
                <UserMenu />
              </div>

              {/* Cart — always visible, prominent on mobile */}
              <button
                onClick={toggleCart}
                className="relative p-2.5 text-white/60 hover:text-white transition-colors rounded-lg"
                aria-label="Panier"
              >
                <ShoppingBag style={{ width: 19, height: 19 }} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full bg-[#D4AF37] text-[#08090E] text-[9px] font-black"
                      style={{ width: 16, height: 16 }}
                    >
                      {count > 9 ? '9+' : count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* LocaleSwitcher — desktop only, in drawer on mobile */}
              <div className="hidden lg:block ml-1">
                <LocaleSwitcher />
              </div>

              {/* Hamburger — mobile/tablet only */}
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
                    placeholder="Chaînes, pendentifs, bagues…"
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
                      className="inline-flex items-center gap-1.5 mt-5 text-[9px] font-black tracking-[0.2em] uppercase text-[#D4AF37] hover:text-white transition-colors"
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
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.05) 100%)',
                      border: '1px solid rgba(212,175,55,0.12)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.28)'
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.07) 100%)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.05) 100%)'
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-sm mb-4"
                      style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37' }}
                    >
                      ◆
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {MEGA[megaOpen].promo.label}
                    </p>
                    <p className="text-xs text-white/70 mt-1">{MEGA[megaOpen].promo.sub}</p>
                    <span className="inline-block mt-4 text-[9px] font-black tracking-[0.2em] uppercase text-[#D4AF37]">
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
              className="fixed top-0 left-0 bottom-0 z-50 w-[88vw] max-w-[340px] flex flex-col overflow-y-auto"
              style={{ background: '#0E0E0E', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <IcekeyLogo variant="horizontal" height={22} color="#ffffff" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <X style={{ width: 15, height: 15 }} />
                </button>
              </div>

              {/* Search */}
              <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Search style={{ width: 13, height: 13 }} className="text-white/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un bijou…"
                    className="flex-1 bg-transparent text-white text-sm placeholder-white/25 outline-none"
                  />
                </form>
              </div>

              {/* Category grid — IceCartel style */}
              <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[9px] font-black tracking-[0.25em] uppercase text-white/30 mb-3">Catégories</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Chaînes',     href: '/shop?cat=chain',    emoji: '⛓' },
                    { label: 'Pendentifs',  href: '/shop?cat=pendant',  emoji: '◆' },
                    { label: 'Bagues',      href: '/shop?cat=ring',     emoji: '○' },
                    { label: 'Bracelets',   href: '/shop?cat=bracelet', emoji: '∞' },
                    { label: 'Montres',     href: '/shop?cat=watch',    emoji: '◉' },
                    { label: 'Sets',        href: '/shop?cat=set',      emoji: '▣' },
                  ].map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-3 rounded-xl transition-colors hover:bg-white/[0.05]"
                      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-[#D4AF37] text-base leading-none">{cat.emoji}</span>
                      <span className="text-white/80 text-xs font-semibold">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Secondary nav */}
              <nav className="px-4 py-3 flex-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {[
                  { label: 'Nouveautés',    href: '/shop?sort=newest' },
                  { label: 'Sur Mesure',    href: '/builder' },
                  { label: 'Promo',         href: '/shop?tier=entry', accent: true },
                  { label: 'Notre histoire', href: '/about' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center justify-between py-3 border-b text-sm font-bold tracking-wide transition-colors',
                      'border-white/[0.04]',
                      'accent' in item && item.accent ? 'text-[#D4AF37]' : 'text-white/65 hover:text-white'
                    )}
                  >
                    {item.label}
                    <span className="text-white/30 text-xs">›</span>
                  </Link>
                ))}
              </nav>

              {/* Bottom actions */}
              <div className="px-4 py-4 space-y-1">
                {/* Language switcher — prominent */}
                <div className="flex items-center justify-between px-3 py-3 rounded-xl mb-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Langue</span>
                  <LocaleSwitcher />
                </div>

                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <User style={{ width: 15, height: 15 }} />
                  Mon compte
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); toggleCart() }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-white transition-colors hover:bg-white/[0.04]"
                  style={{ color: count > 0 ? '#D4AF37' : undefined }}
                >
                  <ShoppingBag style={{ width: 15, height: 15 }} />
                  Mon panier
                  {count > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-black text-[#0A0A0A]" style={{ background: '#D4AF37' }}>
                      {count}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
