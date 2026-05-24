'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '300+',  label: 'clients satisfaits' },
  { value: '4.9★',  label: 'note moyenne vérifiée' },
  { value: '100%',  label: 'certifié GRA' },
  { value: '30j',   label: 'retour garanti' },
]

export function SocialProofBar() {
  return (
    <div
      style={{
        background: '#111111',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="section-container">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.05]">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex flex-col items-center justify-center py-4 px-3 gap-0.5"
            >
              <span
                className="font-bold leading-none"
                style={{
                  color: '#D4AF37',
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '18px',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </span>
              <span
                className="text-[10px] text-center leading-tight"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
