'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface Props {
  product:        Product
  triggerRef:     React.RefObject<HTMLElement | null>
}

export function StickyAddToCart({ product, triggerRef }: Props) {
  const [visible, setVisible] = useState(false)
  const { addItem }           = useCartStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (triggerRef.current) observer.observe(triggerRef.current)
    return () => observer.disconnect()
  }, [triggerRef])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/40 shadow-lg"
        >
          <div className="section-container max-w-5xl py-3">
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#0E0F16] flex-shrink-0">
                <Image
                  src={product.images[0]?.url ?? '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>

              {/* Name + price */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-serif font-semibold text-white/70 truncate">{product.name}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-charcoal">{formatPrice(product.price)}</span>
                  {product.compare_at_price && (
                    <span className="text-xs text-white/30 line-through">{formatPrice(product.compare_at_price)}</span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  addItem(product)
                  toast.success(`${product.name} ajouté au panier`)
                }}
                disabled={product.stock === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold-300 text-white/70 text-sm font-bold
                           hover:bg-gold-400 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                Ajouter au panier
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
