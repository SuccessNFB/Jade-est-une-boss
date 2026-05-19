'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Diamond } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id:    i,
  size:  Math.random() * 7 + 3,
  left:  Math.random() * 100,
  delay: Math.random() * 10,
  dur:   Math.random() * 8 + 7,
  drift: (Math.random() - 0.5) * 80,
}))

const STATS = [
  { value: '350+',   label: 'Créations' },
  { value: '4.9 ★',  label: 'Note moyenne' },
  { value: '2 400+', label: 'Clients' },
  { value: 'GRA',    label: 'Certifié' },
]

export function HeroSection() {
  const ref                  = useRef<HTMLElement>(null)
  const { scrollYProgress }  = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y                    = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity              = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* ── Animated gradient background ─────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient sweep */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-ice-50 to-ice-100 opacity-70" />

        {/* Orb 1 — ice */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #00D9FF 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], x: [-30, 30, -30], y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Orb 2 — gold */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], x: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px)',
            backgroundSize:  '60px 60px',
          }}
        />
      </div>

      {/* ── Floating particles ────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.left}%`, bottom: -20 }}
            animate={{
              y:       [0, -(typeof window !== 'undefined' ? window.innerHeight + 100 : 900)],
              x:       [0, p.drift],
              opacity: [0, 0.7, 0.7, 0],
              rotate:  [0, 360],
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          >
            <Diamond
              fill="currentColor"
              className="text-ice-300"
              style={{ width: p.size, height: p.size }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Content ───────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-16"
      >
        {/* Left — text */}
        <div className="max-w-xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-white/80 backdrop-blur-sm border border-ice-200 shadow-sm mb-8"
          >
            <Diamond className="w-3 h-3 text-ice-500" fill="currentColor" />
            <span className="text-xs font-semibold tracking-[0.2em] text-ice-600 uppercase">
              Moissanite Premium · Certifié GRA
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.06] text-charcoal mb-6"
          >
            L&apos;éclat du{' '}
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-ice-500 via-ice-400 to-ice-600 bg-[length:200%_auto] animate-shimmer">
                diamant
              </span>
            </span>
            <br />
            sans le{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-[length:200%_auto] animate-shimmer">
              prix
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-serif text-xl sm:text-2xl italic text-charcoal/35 tracking-wide mb-3"
          >
            "Cold is the new gold"
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base text-charcoal/55 mb-10 leading-relaxed"
          >
            350+ bijoux en moissanite certifiée. De 79€ à plus de 700€.<br />
            Livraison offerte · Retour 30 jours · Certificat GRA inclus.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <Link href="/shop">
              <Button variant="primary" size="lg" className="group shadow-lg">
                Découvrir la collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/builder">
              <Button variant="gold" size="lg" className="shadow-lg">
                Créer ma pièce
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-8 pt-8 border-t border-charcoal/10"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-xl font-bold text-charcoal">{s.value}</div>
                <div className="text-xs text-charcoal/40 tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — decorative visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden lg:flex items-center justify-center relative"
        >
          {/* Outer glow ring */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-ice-200 animate-pulse" />
          <div className="absolute w-[340px] h-[340px] rounded-full border border-ice-300/50" />

          {/* Central diamond cluster */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Center */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <Diamond
                  key={i}
                  fill="currentColor"
                  className="absolute text-ice-300"
                  style={{
                    width:     14 + (i % 3) * 6,
                    height:    14 + (i % 3) * 6,
                    top:       `${50 + 42 * Math.sin((i / 8) * Math.PI * 2)}%`,
                    left:      `${50 + 42 * Math.cos((i / 8) * Math.PI * 2)}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity:   0.4 + (i % 3) * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Center diamond */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-28 h-28 flex items-center justify-center"
            >
              <Diamond
                fill="currentColor"
                className="w-24 h-24 text-ice-400 drop-shadow-[0_0_24px_rgba(0,217,255,0.5)]"
              />
            </motion.div>
          </div>

          {/* Floating product card preview */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-4 right-0 glass rounded-2xl p-4 shadow-ice w-44"
          >
            <div className="w-10 h-10 rounded-xl bg-ice-100 flex items-center justify-center mb-2">
              <Diamond className="w-5 h-5 text-ice-500" fill="currentColor" />
            </div>
            <p className="font-serif text-xs font-bold text-charcoal leading-tight">
              Solitaire Or 14k
            </p>
            <p className="text-ice-500 text-sm font-bold mt-1">249 €</p>
          </motion.div>

          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-8 left-0 glass rounded-2xl p-4 shadow-gold w-40"
          >
            <p className="text-xs text-charcoal/50 mb-0.5">Certifié</p>
            <p className="font-serif text-xs font-bold text-charcoal">GRA ✦ VVS · D</p>
            <div className="flex gap-0.5 mt-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold-300 text-xs">★</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
