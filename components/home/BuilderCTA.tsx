'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Type, Image, Coins, Pencil } from 'lucide-react'

const STEPS = [
  { icon: Image,  label: 'Upload ton logo ou ta lettre' },
  { icon: Coins,  label: 'Choisis le métal (925 / 14K gold)' },
  { icon: Type,   label: 'Taille + chaîne ou pendant seul' },
  { icon: Pencil, label: 'Gravure personnalisée (optionnel)' },
]

export function BuilderCTA() {
  return (
    <section
      className="section-pad"
      style={{ background: '#0A0A0A' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-10 sm:p-14"
          style={{
            background: 'linear-gradient(135deg, #0D1122 0%, #0C0E18 50%, #111626 100%)',
            border: '1px solid rgba(212,175,55,0.1)',
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-5">
                Custom Pendants
              </p>
              <h2
                className="font-serif font-bold text-white leading-tight mb-5"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
              >
                Ton logo.{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #D4AF37, #E8C572)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  En moissanite.
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-sm text-base">
                Pendentif lettre, logo, prénom, silhouette — tout est possible.
                Made-to-order en 7–10 jours ouvrés. Prix calculé en temps réel.
              </p>
              <Link href="/builder">
                <motion.span
                  className="btn-ice inline-flex items-center gap-2.5 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Lancer le configurateur
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </div>

            {/* Right — steps */}
            <div className="space-y-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,175,55,0.08)', color: '#D4AF37' }}
                    >
                      <Icon style={{ width: 16, height: 16 }} />
                    </div>
                    <span className="text-sm text-white/60">{step.label}</span>
                    <span
                      className="ml-auto font-serif font-bold text-xl"
                      style={{ color: 'rgba(255,255,255,0.08)' }}
                    >
                      0{i + 1}
                    </span>
                  </motion.div>
                )
              })}
              <div
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(212,175,55,0.07)',
                  border: '1px solid rgba(212,175,55,0.15)',
                }}
              >
                <p className="text-xs font-bold" style={{ color: '#D4AF37' }}>
                  ✦ Prix live · 7–10 jours · Livraison offerte · Certifié GRA
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
