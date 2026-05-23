'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

function seeded(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const SPARKLES = Array.from({ length: 10 }, (_, i) => ({
  id:    i,
  x:     seeded(i * 7)  * 100,
  y:     seeded(i * 11) * 100,
  size:  seeded(i * 3)  * 6 + 5,
  dur:   seeded(i * 5)  * 3 + 2.5,
  delay: seeded(i * 13) * 5,
  gold:  i % 3 === 0,
}))

/* ── Proper brilliant-cut gem (top-down) ──────────────────────── */
function DiamondGem() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      className="relative"
    >
      <svg
        viewBox="0 0 300 300"
        className="w-64 h-64 sm:w-80 sm:h-80"
        style={{ filter: 'drop-shadow(0 0 32px rgba(0,217,255,0.45))' }}
      >
        <defs>
          <radialGradient id="gemBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(0,217,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,217,255,0)" />
          </radialGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(0,217,255,0.4)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow behind gem */}
        <circle cx="150" cy="150" r="130" fill="url(#gemBg)" />

        {/* Outer octagon — girdle */}
        <polygon
          points="270,150 235,235 150,270 65,235 30,150 65,65 150,30 235,65"
          stroke="rgba(0,217,255,0.75)" strokeWidth="1.2" fill="none"
        />

        {/* Inner octagon — table */}
        <polygon
          points="210,150 192,192 150,210 108,192 90,150 108,108 150,90 192,108"
          stroke="rgba(0,217,255,0.55)" strokeWidth="0.8"
          fill="rgba(0,217,255,0.06)"
        />

        {/* V0(270,150) → T7(192,108), T0(210,150) */}
        <line x1="270" y1="150" x2="192" y2="108" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        <line x1="270" y1="150" x2="210" y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        {/* V1(235,235) → T0(210,150), T1(192,192) */}
        <line x1="235" y1="235" x2="210" y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="235" y1="235" x2="192" y2="192" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        {/* V2(150,270) → T1(192,192), T2(150,210) */}
        <line x1="150" y1="270" x2="192" y2="192" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="150" y1="270" x2="150" y2="210" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        {/* V3(65,235) → T2(150,210), T3(108,192) */}
        <line x1="65" y1="235" x2="150" y2="210" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="65" y1="235" x2="108" y2="192" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        {/* V4(30,150) → T3(108,192), T4(90,150) */}
        <line x1="30" y1="150" x2="108" y2="192" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="30" y1="150" x2="90"  y2="150" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        {/* V5(65,65) → T4(90,150), T5(108,108) */}
        <line x1="65" y1="65" x2="90"  y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="65" y1="65" x2="108" y2="108" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        {/* V6(150,30) → T5(108,108), T6(150,90) */}
        <line x1="150" y1="30" x2="108" y2="108" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="150" y1="30" x2="150" y2="90"  stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
        {/* V7(235,65) → T6(150,90), T7(192,108) */}
        <line x1="235" y1="65" x2="150" y2="90"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="235" y1="65" x2="192" y2="108" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />

        {/* Center dot */}
        <circle cx="150" cy="150" r="10" fill="url(#centerGlow)" />
        <circle cx="150" cy="150" r="3"  fill="white" />

        {/* Axis dashes */}
        <line x1="150" y1="90" x2="150" y2="210"
          stroke="rgba(0,217,255,0.35)" strokeWidth="0.6" strokeDasharray="4 7" />
        <line x1="90" y1="150" x2="210" y2="150"
          stroke="rgba(0,217,255,0.35)" strokeWidth="0.6" strokeDasharray="4 7" />
      </svg>
    </motion.div>
  )
}

export function HeroSection() {
  const ref                 = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity             = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#080910' }}
    >

      {/* ── Background: ice orb right ──────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-8%', top: '0%',
          width: 800, height: 800,
          background: 'radial-gradient(ellipse, rgba(0,217,255,0.09) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
      />
      {/* Gold orb bottom-left */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          left: '5%', bottom: '0%',
          width: 500, height: 400,
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          opacity: 0.018,
        }}
      />

      {/* ── Main content ───────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full pt-28 pb-20 lg:pt-36"
      >
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(0,217,255,0.1)',
                  border: '1px solid rgba(0,217,255,0.2)',
                }}
              >
                <Zap className="w-3 h-3" style={{ color: '#00D9FF' }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: '#00D9FF' }}
                >
                  Moissanite VVS · GRA Certified
                </span>
              </div>
            </motion.div>

            {/* HEADLINE — Barlow Condensed, ultra-bold */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(68px, 9.5vw, 124px)' }}
            >
              <span className="block text-white uppercase">Cold is</span>
              <span className="block text-white uppercase">the new</span>
              <span
                className="block uppercase"
                style={{
                  background: 'linear-gradient(100deg, #00D9FF 0%, #80EEFF 35%, #C9A84C 65%, #E8C878 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Gold.
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
              className="origin-left h-px mb-8"
              style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.15), transparent 70%)' }}
            />

            {/* Sub-copy — LISIBLE */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Bijoux moissanite VVS certifiés GRA. Éclat supérieur au diamant,{' '}
              <span style={{ color: 'white', fontWeight: 600 }}>sans les compromis</span>.
              De <strong style={{ color: 'white' }}>€79</strong> à{' '}
              <strong style={{ color: 'white' }}>€1 499</strong>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link href="/shop">
                <motion.span
                  className="btn-ice inline-flex items-center gap-2.5 cursor-pointer font-bold uppercase tracking-wider"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(0,217,255,0)',
                      '0 0 36px rgba(0,217,255,0.45)',
                      '0 0 0px rgba(0,217,255,0)',
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 2.5 }}
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>

              <Link
                href="/builder"
                className="btn-outline inline-flex items-center gap-2 cursor-pointer font-semibold uppercase tracking-wider"
              >
                Créer ma pièce
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.5 }}
              className="flex flex-wrap items-center gap-8"
            >
              {[
                { v: '150+', l: 'Modèles' },
                { v: '4.9★', l: '300+ avis' },
                { v: 'GRA',  l: 'Certifié' },
                { v: 'Free', l: 'Livraison' },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 + i * 0.12 }}
                >
                  <div className="font-display font-black text-2xl text-white leading-none uppercase">
                    {s.v}
                  </div>
                  <div
                    className="text-[10px] font-semibold tracking-widest mt-1 uppercase"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Gem + sparkles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-center justify-center relative"
          >
            {/* Outer ambient glow */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 360, height: 360,
                background: 'radial-gradient(circle, rgba(0,217,255,0.14) 0%, transparent 65%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Gem */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <DiamondGem />

              {/* Sparkles orbiting */}
              {SPARKLES.map((s) => (
                <motion.div
                  key={s.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${s.x * 0.9 - 10}%`,
                    top:  `${s.y * 0.9 - 10}%`,
                  }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1, 0.4] }}
                  transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                >
                  <svg width={s.size} height={s.size} viewBox="0 0 12 12">
                    <path
                      d="M6 0 L6.8 4.6 L12 6 L6.8 7.4 L6 12 L5.2 7.4 L0 6 L5.2 4.6 Z"
                      fill={s.gold ? '#C9A84C' : '#00D9FF'}
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>

            {/* Label under gem */}
            <div className="mt-8 text-center">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ color: 'rgba(0,217,255,0.6)' }}
              >
                VVS · D Color · GRA Certified
              </p>
              <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Brillance supérieure au diamant naturel
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)' }}
        />
        <span
          className="text-[8px] tracking-[0.4em] uppercase font-bold"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Scroll
        </span>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080910, transparent)' }}
      />
    </section>
  )
}
