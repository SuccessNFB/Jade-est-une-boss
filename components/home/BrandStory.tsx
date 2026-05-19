'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const PERSONAS = [
  {
    icon:  '⛓️',
    title: 'The Flexer',
    sub:   'Rapper · Artiste · Streetwear',
    desc:  'L\'éclat maximal. Des pièces qui parlent avant toi. Iced out, sans compromis.',
    color: 'border-ice-400/40 bg-ice-50/5',
  },
  {
    icon:  '💼',
    title: 'The Entrepreneur',
    sub:   'CEO · Wealth signal · Success',
    desc:  'Le bijou comme signal. Porter ICEKEY c\'est afficher sa réussite avec classe.',
    color: 'border-gold-300/40 bg-gold-300/5',
  },
  {
    icon:  '💎',
    title: 'The Collector',
    sub:   'Authenticité · VVS · Certifié',
    desc:  'La perfection technique. VVS, certifié GRA, indiscernable du diamant.',
    color: 'border-white/20 bg-white/5',
  },
]

const FACTS = [
  { value: '< 30',   label: 'acteurs sérieux en France', sub: 'Marché quasi-vierge' },
  { value: '10×',    label: 'moins cher qu\'un diamant',  sub: 'À éclat identique' },
  { value: '71-82%', label: 'de marge brute',             sub: 'Sur les chaînes NUOYA' },
  { value: '4-7j',   label: 'livraison express',          sub: 'Depuis notre stock partenaire' },
]

export function BrandStory() {
  return (
    <section className="section-padding bg-charcoal overflow-hidden">
      <div className="section-container">

        {/* ── Top: 3 personas ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-ice-400 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            3 profils · 1 marque
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            ICEKEY parle à{' '}
            <span style={{ color: '#00D9FF' }}>qui tu es</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`p-6 rounded-2xl border ${p.color}`}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-serif text-xl font-bold text-white mb-0.5">{p.title}</h3>
              <p className="text-ice-400 text-xs font-semibold tracking-wide mb-3">{p.sub}</p>
              <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Divider ─────────────────────────────── */}
        <div className="border-t border-white/10 mb-20" />

        {/* ── Bottom: Opportunity facts ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-ice-400 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Pourquoi maintenant
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
              First-mover advantage{' '}
              <span style={{ color: '#FFD700' }}>sur un marché vierge</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-8">
              La moissanite VVS est déjà massivement adoptée aux États-Unis et au Royaume-Uni.
              En France, le marché est à ses débuts. Moins de 30 acteurs sérieux.
              42 700 recherches Google/mois — sans offre premium à la hauteur.
              ICEKEY arrive en premier.
            </p>
            <Link href="/shop">
              <Button variant="gold" size="lg">
                Explorer la collection
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="font-serif text-3xl font-bold text-white mb-1">{f.value}</p>
                <p className="text-xs font-semibold text-white/60 leading-snug">{f.label}</p>
                <p className="text-[11px] text-ice-400/70 mt-1">{f.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
