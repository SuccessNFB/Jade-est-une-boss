'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const TRUST_PILLS = [
  'Certifié GRA',
  'VVS Couleur D',
  'Diamond test ✓',
  'Livraison offerte dès 100 €',
]

export function HeroSection() {
  const ref                 = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity             = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden flex items-center"
      style={{ background: '#0A0A0A', minHeight: '92vh' }}
    >
      {/* ── Background glows ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute',
          right: '-10%', top: '-10%',
          width: 800, height: 800,
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }} />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '-5%', bottom: '-10%',
            width: 600, height: 600,
            background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.015,
        }} />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full py-28 lg:py-36"
      >
        <div className="max-w-3xl">

          {/* Promo badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase"
              style={{
                background: 'rgba(212,175,55,0.12)',
                border: '1px solid rgba(212,175,55,0.35)',
                color: '#D4AF37',
                fontFamily: 'var(--font-space-mono), monospace',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37', display: 'inline-block' }} />
              Nouvelle collection 2025
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(42px, 6.5vw, 88px)' }}
          >
            L'éclat du diamant.
            <br />
            <span
              style={{
                background: 'linear-gradient(100deg, #D4AF37 0%, #E8C572 50%, #C9A227 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Le prix honnête.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Bijoux moissanite VVS certifiés GRA. Chaînes, pendentifs, bagues, bracelets.
            Livraison offerte en France dès 100&nbsp;€.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-12"
          >
            <Link href="/shop">
              <motion.span
                className="inline-flex items-center gap-2.5 cursor-pointer px-7 py-3.5 rounded-full text-sm font-bold text-[#0A0A0A]"
                style={{ background: '#D4AF37' }}
                whileHover={{ background: '#E8C572', boxShadow: '0 0 36px rgba(212,175,55,0.45)' }}
                whileTap={{ scale: 0.97 }}
              >
                Voir la collection
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>

            <Link href="/shop?cat=chain">
              <motion.span
                className="inline-flex items-center gap-2 cursor-pointer px-6 py-3.5 rounded-full text-sm font-bold text-white"
                style={{ border: '1.5px solid rgba(255,255,255,0.18)' }}
                whileHover={{ borderColor: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.04)' }}
                whileTap={{ scale: 0.97 }}
              >
                Chaînes Iced Out
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-2"
          >
            {TRUST_PILLS.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.50)',
                  fontFamily: 'var(--font-space-mono), monospace',
                }}
              >
                <span style={{ color: '#D4AF37' }}>✦</span>
                {pill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Large decorative gem — right side, desktop */}
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{ right: '5%', top: '50%', transform: 'translateY(-50%)' }}
        >
          <motion.div
            animate={{ rotate: [0, 4, -4, 0], y: [0, -12, 12, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 320 320" width="320" height="320"
              style={{ filter: 'drop-shadow(0 0 60px rgba(212,175,55,0.18))' }}
            >
              <defs>
                <radialGradient id="gemGlow" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="rgba(212,175,55,0.18)" />
                  <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                </radialGradient>
                <linearGradient id="gemFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212,175,55,0.08)" />
                  <stop offset="100%" stopColor="rgba(212,175,55,0.02)" />
                </linearGradient>
              </defs>
              {/* Outer glow disc */}
              <circle cx="160" cy="160" r="145" fill="url(#gemGlow)" />
              {/* Diamond shape — large */}
              <polygon
                points="160,28 280,130 260,260 160,292 60,260 40,130"
                stroke="rgba(212,175,55,0.35)" strokeWidth="1.5" fill="url(#gemFill)"
              />
              {/* Inner facet */}
              <polygon
                points="160,70 240,140 224,236 160,256 96,236 80,140"
                stroke="rgba(212,175,55,0.20)" strokeWidth="1" fill="none"
              />
              {/* Crown facets */}
              <line x1="160" y1="28" x2="240" y2="140" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
              <line x1="160" y1="28" x2="80"  y2="140" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
              <line x1="280" y1="130" x2="240" y2="140" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <line x1="40"  y1="130" x2="80"  y2="140" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <line x1="260" y1="260" x2="224" y2="236" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <line x1="60"  y1="260" x2="96"  y2="236" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              {/* Table lines */}
              <line x1="160" y1="70" x2="160" y2="256" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="80"  y1="140" x2="240" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              {/* Center sparkle */}
              <circle cx="160" cy="160" r="6" fill="rgba(212,175,55,0.6)" />
              <circle cx="160" cy="160" r="14" fill="rgba(212,175,55,0.12)" />
              {/* Sparkle rays */}
              {[0, 45, 90, 135].map((angle) => (
                <line
                  key={angle}
                  x1={160 + 16 * Math.cos((angle * Math.PI) / 180)}
                  y1={160 + 16 * Math.sin((angle * Math.PI) / 180)}
                  x2={160 + 28 * Math.cos((angle * Math.PI) / 180)}
                  y2={160 + 28 * Math.sin((angle * Math.PI) / 180)}
                  stroke="rgba(212,175,55,0.5)"
                  strokeWidth="1.5"
                />
              ))}
              {[0, 45, 90, 135].map((angle) => (
                <line
                  key={`d${angle}`}
                  x1={160 + 16 * Math.cos(((angle + 22.5) * Math.PI) / 180)}
                  y1={160 + 16 * Math.sin(((angle + 22.5) * Math.PI) / 180)}
                  x2={160 + 22 * Math.cos(((angle + 22.5) * Math.PI) / 180)}
                  y2={160 + 22 * Math.sin(((angle + 22.5) * Math.PI) / 180)}
                  stroke="rgba(212,175,55,0.25)"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </motion.div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="absolute -bottom-4 -left-20 rounded-2xl px-5 py-3.5"
            style={{
              background: '#141414',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
              minWidth: 180,
            }}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: '#D4AF37', fontSize: 11 }}>★</span>
                ))}
              </div>
              <span
                className="text-[10px] font-bold"
                style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}
              >
                4.9/5
              </span>
            </div>
            <p className="text-[11px] text-white/60 leading-snug">
              300+ clients · avis vérifiés
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />
    </section>
  )
}
