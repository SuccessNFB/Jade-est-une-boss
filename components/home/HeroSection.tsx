'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Diamond } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id:    i,
  size:  Math.random() * 6 + 3,
  left:  Math.random() * 100,
  delay: Math.random() * 8,
  dur:   Math.random() * 6 + 6,
}))

function FloatingParticle({ size, left, delay, dur }: (typeof PARTICLES)[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${left}%`, bottom: '-20px' }}
      animate={{ y: [0, -window?.innerHeight || -800], opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
    >
      <Diamond
        className="text-ice-400"
        style={{ width: size, height: size, opacity: 0.6 }}
        fill="currentColor"
      />
    </motion.div>
  )
}

export function HeroSection() {
  const containerRef                    = useRef<HTMLDivElement>(null)
  const { scrollYProgress }             = useScroll({ target: containerRef })
  const y                               = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity                         = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00D9FF 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
          animate={{ scale: [1.1, 1, 1.1], x: [20, -20, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-2xl"
          style={{ background: 'radial-gradient(circle, #00D9FF 0%, #FFD700 100%)' }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}
      </div>

      {/* Diagonal ice crystal lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={i}
            x1={`${i * 12}%`} y1="0"
            x2={`${i * 12 + 30}%`} y2="100%"
            stroke="#00D9FF"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full pt-24"
      >
        <div className="max-w-3xl">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-ice-200 mb-8"
          >
            <Diamond className="w-3.5 h-3.5 text-ice-500" fill="currentColor" />
            <span className="text-xs font-semibold tracking-widest text-ice-600 uppercase">
              Moissanite Premium · Certifié GRA
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-charcoal mb-6"
          >
            L&apos;éclat du{' '}
            <span className="relative inline-block">
              <span className="text-gradient-ice">diamant</span>
            </span>
            <br />
            sans le{' '}
            <span className="text-gradient-gold">compromis</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-charcoal/60 mb-4 font-light tracking-wide"
          >
            350+ créations moissanite. De €79 à plus de €700.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-2xl sm:text-3xl font-serif font-semibold text-charcoal/40 mb-10 tracking-widest italic"
          >
            "Cold is the new gold"
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/shop">
              <Button variant="primary" size="lg" className="group">
                Découvrir la collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/builder">
              <Button variant="gold" size="lg">
                Créer ma pièce
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-6 mt-12 pt-8 border-t border-charcoal/10"
          >
            {[
              { value: '350+',   label: 'Créations' },
              { value: '4.9★',   label: 'Note client' },
              { value: '2 400+', label: 'Clients satisfaits' },
              { value: 'GRA',    label: 'Certifié' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold text-charcoal font-serif">{stat.value}</div>
                <div className="text-xs text-charcoal/40 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
