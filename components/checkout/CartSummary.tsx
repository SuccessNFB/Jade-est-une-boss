'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function CartSummary() {
  const { items, updateQty, removeItem, totalPrice } = useCartStore()
  const subtotal = totalPrice()

  if (!items.length) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-12 h-12 text-white/55 mx-auto mb-4" />
        <p className="text-white/60 mb-6">Votre panier est vide</p>
        <Link href="/shop">
          <Button variant="primary">Découvrir la collection</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.product.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-4 p-4 rounded-2xl border border-white/[0.06] bg-[#0E0F16]"
          >
            {/* Image */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#0A0B12]">
              <Image
                src={item.product.images[0]?.url ?? '/images/placeholder.jpg'}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/70 uppercase tracking-wider">{item.product.category}</p>
              <h4 className="font-serif font-semibold text-sm text-white/70 line-clamp-2 leading-snug">
                {item.product.name}
              </h4>
              {item.customization && (
                <p className="text-xs text-white/60 mt-0.5">
                  {item.customization.metal} · {item.customization.stone_size}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                {/* Qty controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full border border-white/[0.1] flex items-center justify-center hover:border-ice-500 hover:text-ice-500 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full border border-white/[0.1] flex items-center justify-center hover:border-ice-500 hover:text-ice-500 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white/70 text-sm">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-white/60 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Totals */}
      <div className="rounded-2xl bg-[#0A0B12] p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/65">Sous-total</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/65">Livraison</span>
          <span className="font-semibold text-green-600">
            {subtotal >= 100 ? 'Offerte' : formatPrice(9.90)}
          </span>
        </div>
        <div className="flex justify-between pt-3 border-t border-white/[0.1]">
          <span className="font-bold text-charcoal">Total</span>
          <span className="font-bold text-xl font-serif text-charcoal">
            {formatPrice(subtotal >= 100 ? subtotal : subtotal + 9.90)}
          </span>
        </div>
      </div>
    </div>
  )
}
