'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const REVIEWS = [
  {
    id:     1,
    quote:  "Mes amies pensaient toutes que c'était un vrai diamant. La qualité est bluffante, le certificat GRA rassurant. Je commande déjà ma deuxième pièce.",
    author: 'Camille R.',
    city:   'Paris',
    role:   'Cliente vérifiée · Solitaire Or 6.5mm',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face&auto=format',
  },
  {
    id:     2,
    quote:  "Je portais mon pendentif depuis 3 mois avant de recevoir un \"c'est du vrai ?\". Livraison ultra rapide, emballage magnifique. 100% recommandé.",
    author: 'Sofia M.',
    city:   'Lyon',
    role:   'Cliente vérifiée · Pendentif Argent',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format',
  },
  {
    id:     3,
    quote:  "Le bracelet tennis est absolument parfait. Rapport qualité-prix imbattable. Un mot manuscrit dans la boîte — ce genre de détail fait toute la différence.",
    author: 'Léa T.',
    city:   'Bordeaux',
    role:   'Cliente vérifiée · Tennis Moissanite',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&auto=format',
  },
  {
    id:     4,
    quote:  "La Cuban 12mm est folle. Le diamond test l'a validée direct. J'en reviens pas de la qualité pour ce prix. ICEKEY c'est le seul endroit sérieux en France.",
    author: 'Karim B.',
    city:   'Marseille',
    role:   'Client vérifié · Cuban Link 12mm',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format',
  },
]

export function Testimonials() {
  const [active,         setActive]         = useState(0)
  const [animating,      setAnimating]      = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(REVIEWS[0].quote)
  const [displayedRole,  setDisplayedRole]  = useState(REVIEWS[0].role)
  const [hovered,        setHovered]        = useState<number | null>(null)

  function handleSelect(index: number) {
    if (index === active || animating) return
    setAnimating(true)
    setTimeout(() => {
      setDisplayedQuote(REVIEWS[index].quote)
      setDisplayedRole(REVIEWS[index].role)
      setActive(index)
      setTimeout(() => setAnimating(false), 350)
    }, 180)
  }

  return (
    <section className="section-pad" style={{ background: '#0A0A0A' }}>
      <div className="section-container">

        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}
          >
            Avis clients
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-5">
            Ils ont choisi ICEKEY
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#D4AF37', fontSize: 16 }}>&#9733;</span>
              ))}
            </div>
            <span className="text-sm text-white/55">4.9 / 5 · 300+ avis vérifiés</span>
          </div>
        </div>

        {/* Quote block */}
        <div className="relative max-w-2xl mx-auto text-center mb-10 px-8">
          <span
            className="absolute -left-2 -top-6 select-none pointer-events-none font-serif"
            style={{ fontSize: 80, color: 'rgba(212,175,55,0.07)', lineHeight: 1 }}
          >
            &#8220;
          </span>

          <motion.p
            animate={{
              opacity: animating ? 0 : 1,
              filter:  animating ? 'blur(4px)' : 'blur(0px)',
              scale:   animating ? 0.98 : 1,
            }}
            transition={{ duration: 0.22 }}
            className="font-serif text-xl sm:text-2xl font-light leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {displayedQuote}
          </motion.p>

          <span
            className="absolute -right-2 -bottom-8 select-none pointer-events-none font-serif"
            style={{ fontSize: 80, color: 'rgba(212,175,55,0.07)', lineHeight: 1 }}
          >
            &#8221;
          </span>
        </div>

        {/* Role label */}
        <motion.p
          animate={{ opacity: animating ? 0 : 1, y: animating ? 6 : 0 }}
          transition={{ duration: 0.28 }}
          className="text-center text-[10px] uppercase tracking-[0.2em] mb-12"
          style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'var(--font-space-mono), monospace' }}
        >
          {displayedRole}
        </motion.p>

        {/* Avatar pill selectors */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          {REVIEWS.map((review, i) => {
            const isActive  = active === i
            const isHovered = hovered === i && !isActive
            const expand    = isActive || isHovered

            return (
              <button
                key={review.id}
                onClick={() => handleSelect(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex items-center rounded-full transition-all duration-500 cursor-pointer focus:outline-none"
                style={{
                  background:    isActive ? '#D4AF37' : 'rgba(255,255,255,0.04)',
                  border:        isActive ? 'none' : '1.5px solid rgba(255,255,255,0.10)',
                  boxShadow:     isActive ? '0 4px 24px rgba(212,175,55,0.30)' : 'none',
                  paddingLeft:   expand ? 7 : 2,
                  paddingRight:  expand ? 14 : 2,
                  paddingTop:    2,
                  paddingBottom: 2,
                  minHeight:     36,
                }}
              >
                <img
                  src={review.avatar}
                  alt={review.author}
                  width={30}
                  height={30}
                  className="rounded-full object-cover flex-shrink-0"
                  style={{
                    width:   30,
                    height:  30,
                    outline: isActive ? '2px solid rgba(255,255,255,0.3)' : 'none',
                  }}
                />
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxWidth:   expand ? 110 : 0,
                    opacity:    expand ? 1 : 0,
                    marginLeft: expand ? 8 : 0,
                  }}
                >
                  <span
                    className="whitespace-nowrap text-sm font-semibold block"
                    style={{ color: isActive ? '#0A0A0A' : 'rgba(255,255,255,0.85)' }}
                  >
                    {review.author}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* City */}
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center mt-4 text-[9px]"
          style={{ color: 'rgba(255,255,255,0.20)', fontFamily: 'var(--font-space-mono), monospace' }}
        >
          {REVIEWS[active].city} · Achat vérifié &#10003;
        </motion.p>

      </div>
    </section>
  )
}
