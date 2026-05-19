'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Leaf, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/* ── Sparkle particle ──────────────────────────────────────── */
const SPARKLES = Array.from({ length: 24 }, (_, i) => ({
  id:    i,
  size:  Math.random() * 5 + 2,
  x:     40 + Math.random() * 20,   // groupées autour du centre
  y:     15 + Math.random() * 70,
  delay: Math.random() * 4,
  dur:   Math.random() * 2 + 1.5,
  color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#00D9FF' : '#ffffff',
}))

/* ── Animated chain (SVG) ──────────────────────────────────── */
function ChainDisplay() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Glow halo */}
      <div className="absolute w-72 h-72 rounded-full bg-ice-400/10 blur-3xl animate-pulse" />
      <div className="absolute w-48 h-48 rounded-full bg-gold-300/10 blur-2xl"
           style={{ animation: 'pulse 4s ease-in-out 1s infinite alternate' }} />

      {/* Chain SVG — rotating 360° */}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ perspective: 800 }}
        className="relative z-10"
      >
        <svg viewBox="0 0 220 440" fill="none" xmlns="http://www.w3.org/2000/svg"
             className="w-36 h-72 drop-shadow-[0_0_24px_rgba(0,217,255,0.4)]">
          {/* Cuban link chain — stylized */}
          {Array.from({ length: 10 }, (_, i) => {
            const y    = i * 40 + 20
            const even = i % 2 === 0
            return (
              <g key={i}>
                {/* Outer link */}
                <ellipse cx={even ? 90 : 130} cy={y} rx={even ? 36 : 30} ry={18}
                  fill="none" stroke="#FFD700" strokeWidth="7" strokeLinecap="round"/>
                {/* Inner link cut-out illusion */}
                <ellipse cx={even ? 90 : 130} cy={y} rx={even ? 22 : 18} ry={10}
                  fill="none" stroke="#FFD700" strokeWidth="3" strokeOpacity="0.6"/>
                {/* Highlights */}
                <ellipse cx={(even ? 90 : 130) - 8} cy={y - 5} rx={8} ry={4}
                  fill="#FFFDE7" fillOpacity="0.35"/>
              </g>
            )
          })}
          {/* Central pendant placeholder */}
          <g transform="translate(85,220)">
            <polygon points="25,0 50,20 25,50 0,20"
              fill="none" stroke="#00D9FF" strokeWidth="2.5"/>
            <polygon points="25,8 42,20 25,42 8,20"
              fill="none" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.5"/>
            <text x="25" y="30" textAnchor="middle"
              fontFamily="Georgia, serif" fontSize="10" fontWeight="700"
              fill="#00D9FF" letterSpacing="0.5">VVS</text>
          </g>
        </svg>
      </motion.div>

      {/* Sparkles */}
      {SPARKLES.map((s) => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            width:           s.size,
            height:          s.size,
            left:            `${s.x}%`,
            top:             `${s.y}%`,
            background:      s.color,
            boxShadow:       `0 0 ${s.size * 2}px ${s.color}`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

/* ── Trust badges ──────────────────────────────────────────── */
const BADGES = [
  { icon: ShieldCheck, label: '100% VVS Certified',    color: 'text-ice-500',  bg: 'bg-ice-50 border-ice-200' },
  { icon: Leaf,        label: 'Lab-Created · Ethical',  color: 'text-ice-500',  bg: 'bg-ice-50 border-ice-200' },
  { icon: RotateCcw,   label: '30-Day Guarantee',       color: 'text-gold-400', bg: 'bg-gold-300/10 border-gold-300/30' },
]

/* ── Main component ────────────────────────────────────────── */
export function HeroSection() {
  const ref                 = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity             = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Background — subtle gold gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(0,217,255,0.06) 0%, transparent 70%)' }} />
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 60% 40% at 65% 70%, rgba(255,215,0,0.05) 0%, transparent 60%)' }} />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-24 pb-16"
      >
        {/* ── LEFT — copy ──────────────────────────────── */}
        <div className="max-w-xl">

          {/* 0.5s — Tagline ICE BLUE */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-serif font-bold leading-[1.05] text-5xl sm:text-6xl xl:text-7xl mb-6"
          >
            <span style={{ color: '#00D9FF' }}>Cold</span>{' '}
            <span className="text-charcoal">is the</span>
            <br />
            <span className="text-charcoal">new </span>
            <span style={{ color: '#FFD700' }}>gold</span>
          </motion.h1>

          {/* 1.5s — Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-base sm:text-lg text-charcoal/60 mb-8 leading-relaxed"
          >
            Moissanite VVS · Premium · Ethical
            <br />
            <span className="text-charcoal/40 text-sm">
              350+ pièces. De €79 à €700+. Certifié GRA. Livraison express 4-7j.
            </span>
          </motion.p>

          {/* 2.0-2.6s — Trust badges staggered */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {BADGES.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.0 + i * 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-semibold ${b.bg} ${b.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {b.label}
                </motion.div>
              )
            })}
          </div>

          {/* 3.0s — CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.0 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            {/* Primary — ICE BLUE, pulse */}
            <Link href="/shop">
              <motion.button
                animate={{ boxShadow: ['0 0 0px rgba(0,217,255,0)', '0 0 20px rgba(0,217,255,0.5)', '0 0 0px rgba(0,217,255,0)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide
                           text-white transition-all duration-300 hover:scale-105 group"
                style={{ background: '#00D9FF' }}
              >
                Browse Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            {/* Secondary — outline ICE BLUE */}
            <Link href="/shop">
              <motion.button
                whileHover={{ background: '#00D9FF', color: '#ffffff' }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide
                           text-ice-500 border-2 border-ice-500 transition-all duration-300 hover:scale-105"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="flex flex-wrap items-center gap-8 pt-6 border-t border-charcoal/10"
          >
            {[
              { v: '350+',   l: 'SKUs' },
              { v: '<30',    l: 'Concurrents FR' },
              { v: '71-82%', l: 'Marge brute' },
              { v: 'GRA',    l: 'Certifié' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-xl font-bold text-charcoal">{s.v}</div>
                <div className="text-xs text-charcoal/40 tracking-wide">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — chain animée ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="hidden lg:flex items-center justify-center h-[520px]"
        >
          <ChainDisplay />
        </motion.div>
      </motion.div>

      {/* 4s+ — Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-ice-400 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-ice-400" />
        </motion.div>
        <span className="text-[10px] tracking-widest text-charcoal/30 uppercase">Scroll</span>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
