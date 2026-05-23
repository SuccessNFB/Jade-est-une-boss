'use client'

const ITEMS = [
  'COLD IS THE NEW GOLD',
  'MOISSANITE VVS',
  'GRA CERTIFIED',
  'LIVRAISON OFFERTE',
  'TAILLE D · CLARTÉ VVS',
  'RETOUR 30 JOURS',
  'FABRIQUÉ SUR MESURE',
  'COLD IS THE NEW GOLD',
  'MOISSANITE VVS',
  'GRA CERTIFIED',
  'LIVRAISON OFFERTE',
  'TAILLE D · CLARTÉ VVS',
  'RETOUR 30 JOURS',
  'FABRIQUÉ SUR MESURE',
]

export function MarqueeBanner() {
  return (
    <div className="relative overflow-hidden py-3.5" style={{ background: '#C9A84C' }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#C9A84C] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#C9A84C] to-transparent pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 36s linear infinite', willChange: 'transform' }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-4 text-[10px] font-black tracking-[0.3em] text-[#08090E]"
          >
            {item}
            <span className="text-[#08090E]/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
