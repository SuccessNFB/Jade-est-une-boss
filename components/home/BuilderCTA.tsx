'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Type, Image, Coins, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const STEPS = [
  { icon: Image,  label: 'Upload ton logo ou ta lettre' },
  { icon: Coins,  label: 'Choisis le métal (925 / 14K gold)' },
  { icon: Type,   label: 'Taille + chaîne ou pendant seul' },
  { icon: Pencil, label: 'Gravure personnalisée (optionnel)' },
]

export function BuilderCTA() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="rounded-3xl bg-charcoal overflow-hidden relative">

          {/* Background grid */}
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 backgroundImage: 'linear-gradient(rgba(0,217,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)',
                 backgroundSize:  '60px 60px',
               }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 sm:p-12 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-ice-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Custom Pendants
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Ton logo.<br />
                <span style={{ color: '#FFD700' }}>En moissanite.</span>
              </h2>
              <p className="text-white/55 leading-relaxed mb-8 max-w-md">
                Pendentif lettre, logo, prénom, silhouette — tout est possible.
                Made-to-order en 7-10 jours ouvrés. Prix calculé en temps réel.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/builder">
                  <Button variant="gold" size="lg" className="group">
                    Lancer le configurateur
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right — steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="w-9 h-9 rounded-full bg-ice-500/20 border border-ice-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-ice-400" />
                    </div>
                    <span className="text-sm text-white/75">{step.label}</span>
                    <span className="ml-auto text-white/15 font-serif font-bold text-lg">0{i + 1}</span>
                  </motion.div>
                )
              })}
              <div className="p-4 rounded-2xl bg-gold-300/10 border border-gold-300/20">
                <p className="text-gold-300 text-xs font-bold">
                  ✦ Prix live · 7-10 jours · Livraison offerte · Certifié GRA
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
