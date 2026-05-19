'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Diamond, ArrowRight, Pencil, Gem, Settings } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const STEPS = [
  { icon: Diamond,  label: 'Choisissez la pierre' },
  { icon: Gem,      label: 'Sélectionnez le métal' },
  { icon: Pencil,   label: 'Ajoutez une gravure' },
  { icon: Settings, label: 'Votre bijou est créé' },
]

export function BuilderCTA() {
  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Rotating diamond cluster top right */}
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <Diamond className="w-full h-full text-white" fill="currentColor" />
        </motion.div>
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,217,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.8) 1px, transparent 1px)',
            backgroundSize:  '80px 80px',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-ice-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              Configurateur
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Votre bijou,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-400">
                vos règles
              </span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-8 max-w-md">
              Composez un pendentif ou une bague entièrement sur mesure.
              Choisissez la taille de pierre, le métal, la couleur,
              et ajoutez une gravure personnelle en quelques clics.
            </p>
            <Link href="/builder">
              <Button variant="gold" size="lg" className="group">
                Lancer le configurateur
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Right — steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
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
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-ice-500/20 border border-ice-500/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-ice-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-white/80">{step.label}</span>
                  </div>
                  <span className="text-xl font-serif font-bold text-white/10">0{i + 1}</span>
                </motion.div>
              )
            })}

            <div className="p-4 rounded-2xl bg-gold-300/10 border border-gold-300/20 mt-4">
              <p className="text-gold-300 text-xs font-semibold">
                ✦ Prix en temps réel · Délai 7–10 jours · Livraison offerte
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
