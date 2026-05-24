'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const CATS = [
  {
    label: 'Meilleures Ventes',
    href:  '/shop',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Chaînes',
    href:  '/shop?cat=chain',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Pendentifs',
    href:  '/shop?cat=pendant',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M6 3h12l4 6-10 13L2 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 9h20M12 22V9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Bagues',
    href:  '/shop?cat=ring',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Bracelets',
    href:  '/shop?cat=bracelet',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Montres',
    href:  '/shop?cat=watch',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 2h6M9 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 9v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Boucles',
    href:  '/shop?cat=earring',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 10c0 0-4 6-2 10 1 2 6 2 6 2s5 0 6-2c2-4-2-10-2-10"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Sets',
    href:  '/shop?cat=set',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export function CategoryNav() {
  return (
    <div
      style={{
        background: '#0D0D0D',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="section-container">
        <div
          className="flex items-start gap-4 overflow-x-auto py-5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATS.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex-shrink-0"
            >
              <Link
                href={cat.href}
                className="flex flex-col items-center gap-2.5 group"
                style={{ minWidth: 72 }}
              >
                <div
                  className="w-[62px] h-[62px] rounded-full flex items-center justify-center transition-all duration-250"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(212,175,55,0.10)'
                    el.style.borderColor = 'rgba(212,175,55,0.40)'
                    el.style.color = '#D4AF37'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,255,255,0.04)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                    el.style.color = 'rgba(255,255,255,0.45)'
                  }}
                >
                  {cat.svg}
                </div>
                <span
                  className="text-[10px] font-semibold text-center leading-tight whitespace-nowrap transition-colors duration-200 group-hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.50)', maxWidth: 72 }}
                >
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
