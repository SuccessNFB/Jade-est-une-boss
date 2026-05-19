'use client'

import { Diamond } from 'lucide-react'

const ITEMS = [
  'COLD IS THE NEW GOLD',
  'MOISSANITE CERTIFIÉE GRA',
  'LIVRAISON OFFERTE EN FRANCE',
  'TAILLE D · CLARTÉ VVS',
  'RETOUR 30 JOURS',
  'FABRICATION ARTISANALE',
  'COLD IS THE NEW GOLD',
  'MOISSANITE CERTIFIÉE GRA',
  'LIVRAISON OFFERTE EN FRANCE',
  'TAILLE D · CLARTÉ VVS',
  'RETOUR 30 JOURS',
  'FABRICATION ARTISANALE',
]

export function MarqueeBanner() {
  return (
    <div className="bg-charcoal py-4 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-charcoal to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-charcoal to-transparent pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation:       'marquee 28s linear infinite',
          willChange:      'transform',
        }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-4 text-xs font-bold tracking-[0.25em] text-white/70"
          >
            {item}
            <Diamond className="w-2.5 h-2.5 text-ice-400 flex-shrink-0" fill="currentColor" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
