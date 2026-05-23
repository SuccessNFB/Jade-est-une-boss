'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/* Seeded pseudo-random — prevents hydration mismatch */
function seeded(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id:      i,
  x:       seeded(i * 7)  * 100,
  y:       seeded(i * 11) * 100,
  size:    seeded(i * 3)  * 3 + 1.5,
  dur:     seeded(i * 13) * 12 + 8,
  delay:   seeded(i * 17) * 8,
  opacity: seeded(i * 5)  * 0.4 + 0.1,
  gold:    i % 4 === 0,
}))

/* ═══════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const ref                 = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY            = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity      = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >

      {/* ── Ambient gradient orbs ──────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          right:  '-5%',
          top:    '10%',
          width:  640,
          height: 640,
          background: 'radial-gradient(ellipse, rgba(0,217,255,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left:   '35%',
          bottom: '5%',
          width:  480,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Floating micro-particles ──────────────────────────── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left:       `${p.x}%`,
            top:        `${p.y}%`,
            width:      p.size,
            height:     p.size,
            background: p.gold ? '#C9A84C' : '#00D9FF',
            opacity:    0,
          }}
          animate={{
            y:       [0, -(seeded(p.id * 3) * 160 + 60)],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
          }}
          transition={{
            duration: p.dur,
            repeat:   Infinity,
            delay:    p.delay,
            ease:     'easeOut',
          }}
        />
      ))}

      {/* ── Subtle grid ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,217,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.02,
        }}
      />

      {/* ── Vertical rule line (left) ─────────────────────────── */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent hidden lg:block" style={{ left: 40 }} />

      {/* ── Content ───────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 section-container w-full pt-32 pb-24 lg:pt-40"
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* Left — editorial text block */}
          <div className="max-w-2xl">

            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-px bg-[#00D9FF]/60" />
              <span className="text-[#00D9FF] text-[11px] font-bold tracking-[0.3em] uppercase">
                Moissanite VVS · GRA Certified
              </span>
            </motion.div>

            {/* Main headline — editorial oversized */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(56px, 8.5vw, 104px)' }}
            >
              <span className="block text-white font-bold">Cold</span>
              <span className="block text-white font-bold">is the</span>
              <span
                className="block font-bold"
                style={{
                  background: 'linear-gradient(90deg, #00D9FF 0%, #C9A84C 60%, #E8C878 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                new gold.
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-white/45 text-lg leading-relaxed mb-10 max-w-md"
            >
              Bijoux moissanite VVS — éclat supérieur au diamant, éthiques,
              certifiés GRA. De{' '}
              <span className="text-white/80 font-semibold">€79</span> à{' '}
              <span className="text-white/80 font-semibold">€1 499</span>.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link href="/shop">
                <motion.span
                  className="btn-ice inline-flex items-center gap-2.5 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(0,217,255,0)',
                      '0 0 28px rgba(0,217,255,0.4)',
                      '0 0 0px rgba(0,217,255,0)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                >
                  Explorer la collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.span>
              </Link>

              <Link href="/builder" className="btn-outline inline-flex items-center gap-2 cursor-pointer">
                Créer ma pièce sur mesure
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-wrap items-center gap-8"
            >
              {[
                { v: '150+',  l: 'Modèles' },
                { v: '4.9★',  l: '300+ avis' },
                { v: 'GRA',   l: 'Certifié' },
                { v: '4–7j',  l: 'Livraison' },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  className="text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 + i * 0.1 }}
                >
                  <div className="font-serif text-xl font-bold text-white leading-none">{s.v}</div>
                  <div className="text-[11px] text-white/25 tracking-wider mt-1 uppercase">{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — product showcase floating card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Main product card placeholder */}
              <div
                className="relative w-72 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #111320 0%, #0A0C14 100%)',
                  border: '1px solid rgba(0,217,255,0.12)',
                  boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,217,255,0.08)',
                }}
              >
                {/* Image area */}
                <div
                  className="aspect-[3/4] w-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(145deg, #141826 0%, #0C0E18 100%)' }}
                >
                  {/* Diamond SVG placeholder */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.04, 0.97, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="opacity-40"
                  >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <path
                        d="M60 8 L100 40 L88 96 L32 96 L20 40 Z"
                        stroke="#00D9FF"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.6"
                      />
                      <path
                        d="M60 8 L100 40 L60 112 L20 40 Z"
                        stroke="#C9A84C"
                        strokeWidth="0.75"
                        fill="none"
                        opacity="0.3"
                      />
                      <path
                        d="M20 40 L100 40"
                        stroke="#00D9FF"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                      <path
                        d="M60 8 L20 40 M60 8 L100 40 M60 112 L20 40 M60 112 L100 40"
                        stroke="white"
                        strokeWidth="0.5"
                        opacity="0.15"
                      />
                    </svg>
                  </motion.div>

                  {/* Glow behind diamond */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,217,255,0.08) 0%, transparent 70%)',
                    }}
                  />
                </div>

                {/* Info bar */}
                <div className="p-5">
                  <p className="text-[10px] font-bold text-[#00D9FF] tracking-[0.25em] uppercase mb-1">
                    Chaîne Cuban Link
                  </p>
                  <p className="text-white font-serif text-base font-semibold leading-snug mb-3">
                    Cuban 12mm — Or Gold
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">€199</span>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(0,217,255,0.12)', color: '#00D9FF' }}
                    >
                      VVS D
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badge - top left */}
              <motion.div
                animate={{ x: [0, -4, 0], y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -left-8 glass rounded-xl px-3 py-2 text-xs"
              >
                <span className="text-white/60 text-[10px] font-semibold">GRA Certified</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 text-[10px] font-bold">VVS ·  D color</span>
                </div>
              </motion.div>

              {/* Floating badge - bottom right */}
              <motion.div
                animate={{ x: [0, 5, 0], y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-4 -right-6 glass rounded-xl px-3 py-2 text-xs"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-white/40 text-[10px]">Livraison offerte</span>
                </div>
                <p className="text-white font-bold text-[11px] mt-0.5">🇫🇷 France · 4–7j</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"
        />
        <span className="text-[9px] tracking-[0.35em] text-white/20 uppercase font-semibold">Scroll</span>
      </motion.div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #08090E, transparent)' }}
      />
    </section>
  )
}
