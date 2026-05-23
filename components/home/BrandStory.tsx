'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const FACTS = [
  { value: '10×',    label: 'moins cher que le diamant',  accent: 'ice' },
  { value: '4.9★',   label: '300+ avis vérifiés',         accent: 'gold' },
  { value: 'GRA',    label: 'certifié pour chaque pièce', accent: 'ice' },
  { value: '30j',    label: 'garantie retour sans question', accent: 'gold' },
]

export function BrandStory() {
  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ background: '#0A0B12' }}
    >
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,217,255,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#00D9FF] mb-5">
              Notre histoire
            </p>
            <h2
              className="font-serif font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              La moissanite VVS.{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #C9A84C, #E8C878)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                L'éclat sans le prix.
              </span>
            </h2>
            <p className="text-white/65 leading-[1.9] text-base mb-6">
              Née de la frustration d'une génération qui refuse de choisir entre style et budget,
              ICEKEY démocratise les bijoux premium en France. La moissanite VVS offre un éclat
              supérieur au diamant — testée, certifiée GRA, et éthique.
            </p>
            <p className="text-white/55 leading-[1.9] text-sm mb-10">
              Moins de 30 acteurs sérieux en France, 42&nbsp;700 recherches Google par mois sans
              offre à la hauteur. ICEKEY arrive en premier.
            </p>

            <Link
              href="/shop"
              className="btn-ice inline-flex items-center gap-2.5"
            >
              Explorer la collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 rounded-2xl relative overflow-hidden group"
                style={{
                  background: '#0E0F16',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="font-serif text-4xl font-bold mb-2"
                  style={{
                    color: f.accent === 'ice' ? '#00D9FF' : '#C9A84C',
                  }}
                >
                  {f.value}
                </div>
                <p className="text-white/65 text-sm leading-snug">{f.label}</p>

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20"
                  style={{
                    background: `radial-gradient(ellipse at top right, ${f.accent === 'ice' ? '#00D9FF' : '#C9A84C'}, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
