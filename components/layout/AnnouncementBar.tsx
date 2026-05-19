'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  '✦ Livraison offerte en France dès €100',
  '✦ Certifié GRA — authenticité garantie',
  '✦ Retour gratuit sous 30 jours',
  '✦ Paiement sécurisé Stripe',
]

export function AnnouncementBar() {
  const [index,   setIndex]   = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  if (!visible) return null

  return (
    <div className="relative bg-charcoal text-white text-xs py-2.5 px-10 text-center font-medium tracking-wide">
      <button
        onClick={() => setIndex((i) => (i - 1 + MESSAGES.length) % MESSAGES.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="inline-block text-ice-300"
        >
          {MESSAGES[index]}
        </motion.span>
      </AnimatePresence>

      <button
        onClick={() => setIndex((i) => (i + 1) % MESSAGES.length)}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
