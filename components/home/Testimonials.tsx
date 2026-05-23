'use client'

import { motion } from 'framer-motion'

const REVIEWS = [
  {
    name:    'Camille R.',
    city:    'Paris',
    text:    'Mes amies pensaient toutes que c\'était un vrai diamant. La qualité est bluffante, l\'écrin magnifique et le certificat rassurant.',
    product: 'Solitaire Or 6.5mm',
    date:    'Mars 2025',
  },
  {
    name:    'Sofia M.',
    city:    'Lyon',
    text:    'Je portais mon pendentif ICEKEY depuis 3 mois avant de recevoir "c\'est du vrai ?" Livraison super rapide, emballage premium. 100% recommandé.',
    product: 'Pendentif Ronde Argent',
    date:    'Fév. 2025',
  },
  {
    name:    'Léa T.',
    city:    'Bordeaux',
    text:    'Le bracelet tennis est absolument parfait. Rapport qualité-prix imbattable. Service client réactif et très professionnel.',
    product: 'Tennis Moissanite Argent',
    date:    'Avr. 2025',
  },
  {
    name:    'Inès B.',
    city:    'Marseille',
    text:    'La gravure sur mon pendentif est superbe. ICEKEY a glissé un mot manuscrit dans la boîte. Ce genre de détail fait toute la différence.',
    product: 'Pendentif Sur Mesure',
    date:    'Janv. 2025',
  },
]

export function Testimonials() {
  return (
    <section className="section-pad" style={{ background: '#0A0A0A' }}>
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
            Avis clients
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-5">
            Ils ont choisi ICEKEY
          </h2>
          <div className="flex items-center justify-center gap-2.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#D4AF37', fontSize: 16 }}>★</span>
              ))}
            </div>
            <span className="text-sm text-white/70">4.9 / 5 · 300+ avis vérifiés</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="flex flex-col gap-5 p-6 rounded-2xl transition-all duration-300"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: '#D4AF37', fontSize: 12 }}>★</span>
                ))}
              </div>

              <p className="text-sm text-white/55 leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399' }}
                  >
                    ✓ Vérifié
                  </span>
                </div>
                <p className="text-[11px] text-white/65">{r.city} · {r.date}</p>
                <p className="text-[10px] text-[#D4AF37]/50 mt-1 font-medium">{r.product}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
