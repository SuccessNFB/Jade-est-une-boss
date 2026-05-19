'use client'

import { motion } from 'framer-motion'
import { Diamond } from 'lucide-react'

const REVIEWS = [
  {
    name:    'Camille R.',
    city:    'Paris',
    rating:  5,
    text:    'Je cherchais une bague de fiançailles sans me ruiner. La qualité est bluffante — mes amies pensaient toutes que c\'était un vrai diamant. L\'écrin est magnifique, le certificat rassurant.',
    product: 'Solitaire Or 14k 6.5mm',
    date:    'Mars 2025',
  },
  {
    name:    'Sofia M.',
    city:    'Lyon',
    rating:  5,
    text:    'Je portais mon pendentif ICEKEY depuis 3 mois avant de recevoir le compliment "c\'est du vrai ?" 😂 La livraison était super rapide, l\'emballage premium. Je recommande à 100%.',
    product: 'Pendentif Ronde Argent',
    date:    'Février 2025',
  },
  {
    name:    'Léa T.',
    city:    'Bordeaux',
    rating:  5,
    text:    'Le bracelet tennis est absolument parfait. Je l\'ai acheté en promotion et je n\'en reviens toujours pas du rapport qualité-prix. Service client réactif et très professionnel.',
    product: 'Tennis Moissanite Argent',
    date:    'Avril 2025',
  },
  {
    name:    'Inès B.',
    city:    'Marseille',
    rating:  5,
    text:    'La gravure sur mon pendentif est superbe. ICEKEY a même glissé un mot manuscrit dans la boîte. Ce genre de détail fait toute la différence. Je reviendrai pour les boucles d\'oreilles.',
    product: 'Pendentif Sur Mesure',
    date:    'Janvier 2025',
  },
]

export function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Avis clients
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Elles ont choisi ICEKEY
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gold-300 text-lg">★</span>
              ))}
            </div>
            <span className="text-sm text-charcoal/50">4.9 / 5 · 2 400+ avis vérifiés</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-ice-200 hover:shadow-ice transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(r.rating)].map((_, j) => (
                  <span key={j} className="text-gold-300 text-sm">★</span>
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-charcoal/70 leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Product */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-ice-100 flex items-center justify-center">
                  <Diamond className="w-3 h-3 text-ice-500" fill="currentColor" />
                </div>
                <span className="text-[11px] text-charcoal/40 font-medium">{r.product}</span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-sm font-semibold text-charcoal">{r.name}</p>
                  <p className="text-xs text-charcoal/40">{r.city} · {r.date}</p>
                </div>
                <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Achat vérifié
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
