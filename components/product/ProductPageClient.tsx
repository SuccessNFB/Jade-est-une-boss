'use client'

import { useState } from 'react'
import { ShoppingBag, Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore }           from '@/store/cartStore'
import { ProductVariantSelector } from './ProductVariantSelector'
import { StickyAddToCart }        from './StickyAddToCart'
import { Button }                 from '@/components/ui/Button'
import type { Product, Metal }    from '@/types'
import { METALS }                 from '@/types'
import { useRef }                 from 'react'
import toast                      from 'react-hot-toast'

// Payment logos (SVG paths) — Visa, Mastercard, Amex, Apple Pay, PayPal, CB
const PAYMENT_ICONS = [
  { label: 'Visa',        src: 'https://cdn.simpleicons.org/visa/1A1F71' },
  { label: 'Mastercard',  src: 'https://cdn.simpleicons.org/mastercard/EB001B' },
  { label: 'Apple Pay',   src: 'https://cdn.simpleicons.org/applepay/000000' },
  { label: 'PayPal',      src: 'https://cdn.simpleicons.org/paypal/003087' },
]

interface Props {
  product: Product
}

export function ProductPageClient({ product }: Props) {
  const ctaRef = useRef<HTMLDivElement>(null)

  const defaultMetal = product.metal as Metal
  const [selectedMetal, setSelectedMetal] = useState<Metal>(defaultMetal)
  const [selectedSize,  setSelectedSize]  = useState<string>(product.stone_size ?? '6.5mm')
  const [qty,           setQty]           = useState(1)

  const { addItem } = useCartStore()

  const availableMetals = Object.keys(METALS) as Metal[]
  const availableSizes  = product.stone_size
    ? ['3mm', '5mm', '6.5mm', '8mm', '10mm']
    : []

  function handleAddToCart() {
    addItem(product, qty, {
      metal:       selectedMetal,
      stone_size:  selectedSize,
      stone_color: product.stone_color ?? 'D',
    })
    toast.success(`${product.name} ajouté au panier ✓`)
  }

  return (
    <>
      {/* Variants */}
      <ProductVariantSelector
        selectedMetal={selectedMetal}
        selectedSize={selectedSize}
        availableMetals={availableMetals}
        availableSizes={availableSizes}
        onMetalChange={setSelectedMetal}
        onSizeChange={setSelectedSize}
      />

      {/* Stock */}
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-400'}`} />
        <span className="text-sm text-charcoal/60">
          {product.stock > 0
            ? product.stock <= 5
              ? `Plus que ${product.stock} en stock`
              : 'En stock'
            : 'Rupture de stock'}
        </span>
      </div>

      {/* Qty + Add to cart */}
      <div ref={ctaRef} className="flex items-center gap-3">
        {/* Qty selector */}
        <div className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-1">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-charcoal">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock || 10, qty + 1))}
            className="w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5" />
            {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
          </Button>
        </motion.div>
      </div>

      {/* Payment icons */}
      <div className="flex items-center gap-2 flex-wrap">
        {PAYMENT_ICONS.map((icon) => (
          <div
            key={icon.label}
            className="h-7 px-2.5 rounded bg-gray-100 flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon.src} alt={icon.label} className="h-4 object-contain" />
          </div>
        ))}
        <span className="text-xs text-charcoal/40 ml-1">Paiement sécurisé</span>
      </div>

      {/* Sticky bar */}
      <StickyAddToCart product={product} triggerRef={ctaRef} />
    </>
  )
}
