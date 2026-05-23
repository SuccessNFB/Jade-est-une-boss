'use client'

import { motion } from 'framer-motion'

const BRANDS = [
  { name: 'Visa',             src: 'https://cdn.simpleicons.org/visa/ffffff' },
  { name: 'Mastercard',       src: 'https://cdn.simpleicons.org/mastercard/ffffff' },
  { name: 'American Express', src: 'https://cdn.simpleicons.org/americanexpress/ffffff' },
  { name: 'Apple Pay',        src: 'https://cdn.simpleicons.org/applepay/ffffff' },
  { name: 'Google Pay',       src: 'https://cdn.simpleicons.org/googlepay/ffffff' },
  { name: 'PayPal',           src: 'https://cdn.simpleicons.org/paypal/ffffff' },
  { name: 'Klarna',           src: 'https://cdn.simpleicons.org/klarna/ffffff' },
  { name: 'Stripe',           src: 'https://cdn.simpleicons.org/stripe/ffffff' },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
}

const brandItem = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

const labelItem = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function PaymentBrands() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="section-container py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Label */}
          <motion.div variants={labelItem} className="flex items-center gap-2.5 flex-shrink-0">
            <span
              className="text-[8px] tracking-[0.25em] uppercase font-bold"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-space-mono), monospace' }}
            >
              Paiement sécurisé
            </span>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
          </motion.div>

          {/* Logos */}
          <motion.div
            variants={container}
            className="flex items-center gap-4 flex-wrap justify-center sm:justify-end"
          >
            {BRANDS.map((brand) => (
              <motion.div
                key={brand.name}
                variants={brandItem}
                className="h-7 px-3 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                whileHover={{
                  background: 'rgba(212,175,55,0.06)',
                  borderColor: 'rgba(212,175,55,0.18)',
                  scale: 1.05,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="h-4 w-auto object-contain"
                  style={{ opacity: 0.55, filter: 'brightness(1.1)' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
