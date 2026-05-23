'use client'

const ITEMS = [
  'COLD IS THE NEW GOLD',
  'MOISSANITE VVS',
  'GRA CERTIFIED',
  'LIVRAISON OFFERTE',
  'TAILLE D · CLARTÉ VVS',
  'RETOUR 30 JOURS',
  'SUR MESURE',
  'DIAMOND TEST ✓',
  'COLD IS THE NEW GOLD',
  'MOISSANITE VVS',
  'GRA CERTIFIED',
  'LIVRAISON OFFERTE',
  'TAILLE D · CLARTÉ VVS',
  'RETOUR 30 JOURS',
  'SUR MESURE',
  'DIAMOND TEST ✓',
]

export function MarqueeBanner() {
  return (
    <div className="relative overflow-hidden py-3.5" style={{ background: '#D4AF37' }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#D4AF37] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#D4AF37] to-transparent pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 30s linear infinite', willChange: 'transform' }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-5"
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#0A0A0A',
              fontFamily: 'var(--font-space-mono), monospace',
            }}
          >
            {item}
            <span style={{ margin: '0 12px', opacity: 0.45, fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
