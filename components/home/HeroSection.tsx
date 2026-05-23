'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Gem } from 'lucide-react'

/* ── Floating product card (top-right) ────────────────────────── */
function HeroProductCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:block relative flex-shrink-0"
      style={{ width: 196 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#141414',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.06)',
          }}
        >
          {/* Gem visual */}
          <div
            className="flex items-center justify-center"
            style={{ height: 176, background: 'linear-gradient(145deg, #1A1A1A 0%, #121210 100%)' }}
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 0.97, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 120 120" width="76" height="76" style={{ filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.5))' }}>
                <defs>
                  <radialGradient id="hgemBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(212,175,55,0.2)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                  </radialGradient>
                </defs>
                <circle cx="60" cy="60" r="54" fill="url(#hgemBg)" />
                <polygon points="108,60 94.4,94.4 60,108 25.6,94.4 12,60 25.6,25.6 60,12 94.4,25.6"
                  stroke="rgba(212,175,55,0.75)" strokeWidth="1" fill="none" />
                <polygon points="84,60 76.8,76.8 60,84 43.2,76.8 36,60 43.2,43.2 60,36 76.8,43.2"
                  stroke="rgba(212,175,55,0.5)" strokeWidth="0.75" fill="rgba(212,175,55,0.05)" />
                {/* Facet lines */}
                <line x1="108" y1="60" x2="76.8" y2="43.2" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="108" y1="60" x2="84"   y2="60"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="94.4" y1="94.4" x2="76.8" y2="76.8" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="94.4" y1="94.4" x2="84"   y2="60"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="60"   y1="108"  x2="76.8" y2="76.8" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="60"   y1="108"  x2="43.2" y2="76.8" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="25.6" y1="94.4" x2="43.2" y2="76.8" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="25.6" y1="94.4" x2="36"   y2="60"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="12"   y1="60"   x2="43.2" y2="43.2" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="12"   y1="60"   x2="36"   y2="60"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="25.6" y1="25.6" x2="43.2" y2="43.2" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="25.6" y1="25.6" x2="60"   y2="36"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="60"   y1="12"   x2="43.2" y2="43.2" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="60"   y1="12"   x2="76.8" y2="43.2" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <line x1="94.4" y1="25.6" x2="76.8" y2="43.2" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="94.4" y1="25.6" x2="84"   y2="60"   stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="3" fill="#D4AF37" />
                <circle cx="60" cy="60" r="6" fill="rgba(212,175,55,0.3)" />
              </svg>
            </motion.div>
          </div>

          {/* Card info */}
          <div className="p-3.5">
            <p
              className="text-[8px] font-bold tracking-[0.25em] uppercase mb-1"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}
            >
              Chaîne Cuban Link
            </p>
            <p className="text-white text-xs font-semibold leading-snug mb-2.5">
              Cuban 12mm — Or Gold VVS
            </p>
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-mono), monospace', letterSpacing: '-0.03em' }}
              >
                €199
              </span>
              <div
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold"
                style={{
                  background: 'rgba(212,175,55,0.12)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212,175,55,0.2)',
                  fontFamily: 'var(--font-space-mono), monospace',
                }}
              >
                <Gem style={{ width: 8, height: 8 }} />
                VVS D
              </div>
            </div>
            <button
              className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all hover:brightness-110"
              style={{
                background: '#D4AF37',
                color: '#0A0A0A',
                fontFamily: 'var(--font-barlow), system-ui, sans-serif',
              }}
            >
              Voir la pièce
              <ArrowUpRight style={{ width: 11, height: 11 }} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Slide counter */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>01</span>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
        <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.2)' }}>04</span>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const ref                 = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity             = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* ── Background: warm gold ambient glow ────────────── */}
      <div className="absolute pointer-events-none" style={{
        right: '-5%', top: '-5%', width: 700, height: 700,
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.09) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }} />
      <motion.div
        className="absolute pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          left: '-10%', bottom: '0%', width: 600, height: 500,
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        opacity: 0.016,
      }} />

      {/* Vertical accent rule */}
      <div className="absolute hidden lg:block pointer-events-none" style={{
        left: '8%', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, transparent 10%, rgba(212,175,55,0.12) 40%, transparent 80%)',
      }} />

      {/* ── Main content ─────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full pb-20 lg:pb-24 pt-32 lg:pt-40"
      >
        <div className="flex items-end justify-between gap-12">

          {/* LEFT — big text bottom-left */}
          <div className="flex-1">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '1px solid rgba(212,175,55,0.45)' }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
              </div>
              <span
                className="text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                Découvrez l'univers ICEKEY — Moissanite VVS · Certifié GRA
              </span>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-white uppercase leading-[0.9] mb-10"
              style={{ fontSize: 'clamp(54px, 8.5vw, 108px)' }}
            >
              Brille avec<br />
              nos bijoux<br />
              <span style={{ color: '#D4AF37' }}>moissanite</span>
            </motion.h1>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/shop">
                <motion.span
                  className="inline-flex items-center gap-2 cursor-pointer px-7 py-3.5 rounded-full font-display font-black text-sm uppercase tracking-wider transition-all duration-300 text-white"
                  style={{ border: '2px solid rgba(255,255,255,0.4)' }}
                  whileHover={{ borderColor: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.06)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  La collection
                </motion.span>
              </Link>

              <Link href="/shop">
                <motion.span
                  className="inline-flex items-center gap-2 cursor-pointer px-7 py-3.5 rounded-full font-display font-black text-sm uppercase tracking-wider"
                  style={{ background: '#D4AF37', color: '#0A0A0A' }}
                  whileHover={{ background: '#E8C572', boxShadow: '0 0 36px rgba(212,175,55,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Acheter maintenant
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — floating product card */}
          <HeroProductCard />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />
    </section>
  )
}
