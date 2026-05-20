'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Leaf, RotateCcw } from 'lucide-react'

/*
 * HERO VIDEO — pour activer la vidéo :
 * 1. Dépose ton fichier MP4 dans /public/videos/hero.mp4
 * 2. Passe HERO_VIDEO_ENABLED à true
 */
const HERO_VIDEO_ENABLED = false
const HERO_VIDEO_SRC     = '/videos/hero.mp4'

/* ─── Seeded "random" so server/client match (no hydration mismatch) ── */
function seeded(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Floating diamond shapes ─────────────────────────────────────── */
const DIAMONDS = Array.from({ length: 28 }, (_, i) => ({
  id:      i,
  x:       seeded(i * 7)  * 100,
  startY:  seeded(i * 11) * 100 + 10,
  size:    seeded(i * 3)  * 14 + 5,
  dur:     seeded(i * 13) * 18 + 12,
  delay:   seeded(i * 17) * 12,
  opacity: seeded(i * 5)  * 0.35 + 0.08,
  color:   i % 5 === 0 ? '#FFD700' : i % 3 === 0 ? '#00D9FF' : '#ffffff',
}))

/* ─── Sparkle stars ────────────────────────────────────────────────── */
const SPARKLES = Array.from({ length: 22 }, (_, i) => ({
  id:    i,
  x:     seeded(i * 19) * 96 + 2,
  y:     seeded(i * 23) * 88 + 6,
  size:  seeded(i * 7)  * 10 + 4,
  dur:   seeded(i * 31) * 2.5 + 1.2,
  delay: seeded(i * 41) * 5,
  color: i % 3 === 0 ? '#FFD700' : '#00D9FF',
}))

/* ─── Aurora orbs ─────────────────────────────────────────────────── */
const ORBS = [
  { x: '68%', y: '15%', w: 520, h: 420, color: 'rgba(0,217,255,0.22)', dur: 14 },
  { x: '10%', y: '55%', w: 440, h: 360, color: 'rgba(255,215,0,0.12)',  dur: 18 },
  { x: '55%', y: '65%', w: 360, h: 300, color: 'rgba(0,217,255,0.14)', dur: 11 },
  { x: '25%', y: '8%',  w: 300, h: 260, color: 'rgba(180,100,255,0.08)', dur: 16 },
]

/* ─── 4-point star SVG path ───────────────────────────────────────── */
function SparkleIcon({ size, color }: { size: number; color: string }) {
  const s = size
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2 C12 2, 13 8, 12 12 C11 8, 12 2, 12 2Z" />
      <path d="M22 12 C22 12, 16 11, 12 12 C16 13, 22 12, 22 12Z" />
      <path d="M12 22 C12 22, 11 16, 12 12 C13 16, 12 22, 12 22Z" />
      <path d="M2 12 C2 12, 8 13, 12 12 C8 11, 2 12, 2 12Z" />
    </svg>
  )
}

const BADGES = [
  { icon: ShieldCheck, label: '100% VVS Certified' },
  { icon: Leaf,        label: 'Lab-Created · Ethical' },
  { icon: RotateCcw,   label: '30-Day Guarantee' },
]

/* ═══════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const ref                 = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity             = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #07090F 0%, #0D1220 40%, #090C16 70%, #060810 100%)' }}
    >
      {/* ── Hero video (activé dès que /public/videos/hero.mp4 existe) ── */}
      {HERO_VIDEO_ENABLED && (
        <>
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 1 }}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          {/* Overlay sombre pour lisibilité du texte */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(7,9,15,0.85) 0%, rgba(7,9,15,0.45) 60%, rgba(7,9,15,0.2) 100%)', zIndex: 2 }}
          />
        </>
      )}

      {/* ── Aurora blobs (masqués quand vidéo active) ───────────────── */}
      {!HERO_VIDEO_ENABLED && ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left:       orb.x,
            top:        orb.y,
            width:      orb.w,
            height:     orb.h,
            background: `radial-gradient(ellipse, ${orb.color} 0%, transparent 70%)`,
            filter:     'blur(60px)',
            transform:  'translate(-50%, -50%)',
          }}
          animate={{
            scale:   [1, 1.15, 0.95, 1.1, 1],
            x:       [0, 30, -20, 15, 0],
            y:       [0, -20, 25, -10, 0],
            opacity: [0.7, 1, 0.8, 1, 0.7],
          }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
        />
      ))}

      {/* ── Floating diamonds ─────────────────────────────────────── */}
      {DIAMONDS.map((d) => (
        <motion.div
          key={d.id}
          className="absolute pointer-events-none"
          style={{
            left:        `${d.x}%`,
            top:         `${d.startY}%`,
            width:       d.size,
            height:      d.size,
            background:  d.color,
            clipPath:    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            opacity:     0,
            boxShadow:   `0 0 ${d.size}px ${d.color}`,
          }}
          animate={{
            y:       [0, -(seeded(d.id * 7) * 300 + 150)],
            opacity: [0, d.opacity, d.opacity * 0.6, 0],
            rotate:  [0, seeded(d.id) > 0.5 ? 180 : -180],
            scale:   [0.5, 1, 0.8, 0.4],
          }}
          transition={{
            duration: d.dur,
            repeat:   Infinity,
            delay:    d.delay,
            ease:     'easeInOut',
          }}
        />
      ))}

      {/* ── Sparkle stars ─────────────────────────────────────────── */}
      {SPARKLES.map((s) => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            scale:   [0, 1, 0.7, 1.2, 0],
            opacity: [0, 1, 0.6, 1, 0],
            rotate:  [0, 45, 0, -45, 0],
          }}
          transition={{
            duration: s.dur,
            repeat:   Infinity,
            delay:    s.delay,
            ease:     'easeInOut',
          }}
        >
          <SparkleIcon size={s.size} color={s.color} />
        </motion.div>
      ))}

      {/* ── Fine grid overlay (depth) ─────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,217,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full pt-28 pb-20"
      >
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-bold tracking-[0.25em] uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            Moissanite VVS · GRA Certified · Made in France
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif font-bold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}
          >
            <span className="text-white">Cold is the</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #00D9FF 0%, #ffffff 40%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              new gold
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-white/50 text-lg mb-10 leading-relaxed"
          >
            Bijoux moissanite VVS — brillance supérieure au diamant,
            <br className="hidden sm:block" />
            éthiques, certifiés GRA. De <strong className="text-white/80">€79</strong> à <strong className="text-white/80">€700+</strong>.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {BADGES.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + i * 0.15 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/70 backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-[#00D9FF]" />
                  {b.label}
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(0,217,255,0)',
                    '0 0 28px rgba(0,217,255,0.55)',
                    '0 0 0px rgba(0,217,255,0)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 2.5 }}
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-sm tracking-wide text-charcoal group"
                style={{ background: '#00D9FF' }}
              >
                Browse Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.04, borderColor: '#00D9FF', color: '#00D9FF' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-sm tracking-wide text-white/70 border border-white/20 transition-colors duration-300"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/10"
          >
            {[
              { v: '350+',   l: 'Modèles' },
              { v: '4.8★',   l: '230+ avis' },
              { v: 'GRA',    l: 'Certifié' },
              { v: '4–7j',   l: 'Livraison' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-serif text-2xl font-bold text-white">{s.v}</div>
                <div className="text-xs text-white/30 tracking-wide mt-0.5">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#00D9FF]/60" />
        </motion.div>
        <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase">Scroll</span>
      </motion.div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #07090F, transparent)' }}
      />
    </section>
  )
}
