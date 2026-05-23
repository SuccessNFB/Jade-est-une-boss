'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const REVIEWS = [
  {
    name:       'Marcus K.',
    verified:   true,
    rating:     5,
    text:       "This chain sparkles HARD. People ask if it's diamonds every single day. Confidence level: 1000% 🔥",
    product:    'Cuban Chain 16"',
    initials:   'MK',
    color:      '#D4AF37',
  },
  {
    name:       'Jade R.',
    verified:   true,
    rating:     5,
    text:       "J'ai reçu tellement de compliments en une semaine. La qualité dépasse mes attentes pour ce prix.",
    product:    'Pendentif Solitaire VVS',
    initials:   'JR',
    color:      '#FF6B9D',
  },
  {
    name:       'Théo M.',
    verified:   true,
    rating:     5,
    text:       "Le packaging est premium, la chaîne est lourde et brille comme un miroir. ICEKEY c'est sérieux.",
    product:    'Tennis Chain 4mm',
    initials:   'TM',
    color:      '#FFB800',
  },
  {
    name:       'Sofia L.',
    verified:   true,
    rating:     5,
    text:       "Mon bracelet est parfait. Le rendu à la lumière est incroyable. Je recommande sans hésiter.",
    product:    'Bracelet Cuban 6mm',
    initials:   'SL',
    color:      '#7B61FF',
  },
  {
    name:       'Alex B.',
    verified:   true,
    rating:     5,
    text:       'Passed the diamond tester at the jewelry store. My jeweler was shook. Worth every cent.',
    product:    'Cuban Chain 12mm 18"',
    initials:   'AB',
    color:      '#D4AF37',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#FFB800] text-[#FFB800]' : 'text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export function ProductReviews() {
  const [idx, setIdx] = useState(0)

  const visible = [
    REVIEWS[idx % REVIEWS.length],
    REVIEWS[(idx + 1) % REVIEWS.length],
    REVIEWS[(idx + 2) % REVIEWS.length],
  ]

  return (
    <section className="py-14 border-t border-white/[0.06]">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-semibold mb-1">
            Avis vérifiés
          </p>
          <h2 className="font-serif text-2xl font-bold text-white">
            Real Customers, Real Flex
          </h2>
        </div>
        {/* Nav */}
        <div className="flex gap-2">
          <button
            onClick={() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
            className="w-9 h-9 rounded-full border-2 border-white/[0.1] flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)}
            className="w-9 h-9 rounded-full border-2 border-white/[0.1] flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Aggregate stats */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-1.5">
          <StarRating rating={5} />
          <span className="text-sm font-bold text-white">4.8/5</span>
        </div>
        <span className="text-white/55">|</span>
        <span className="text-sm text-white/60">230+ avis</span>
        <span className="text-white/55">|</span>
        <span className="text-sm text-white/60">98% recommandent</span>
      </div>

      {/* Cards carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {visible.map((review, i) => (
            <motion.div
              key={`${review.name}-${idx}-${i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="bg-[#141414] border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#D4AF37]/20 hover:shadow-[0_0_16px_rgba(212,175,55,0.08)] transition-all"
            >
              {/* Stars + rating */}
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                <span className="text-[11px] font-bold text-white/70">{review.rating}.0/5</span>
              </div>

              {/* Text */}
              <p className="text-sm text-white/70 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Customer */}
              <div className="flex items-center gap-2.5 pt-1 border-t border-white/[0.04]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: review.color }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{review.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#D4AF37] font-medium">✓ Verified Purchase</span>
                  </div>
                </div>
                <span className="ml-auto text-[10px] text-white/60 italic">{review.product}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <button className="inline-flex items-center gap-2 bg-[#D4AF37] text-white/70 font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#E8C572] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
          📸 Share Your Moment
        </button>
        <p className="text-xs text-white/70 mt-2">
          Bought ICEKEY? Show us your flex + get featured
        </p>
      </div>
    </section>
  )
}
