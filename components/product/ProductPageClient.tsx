'use client'

import { useState } from 'react'
import { useRef } from 'react'
import { ShoppingBag, Minus, Plus, Heart, Share2, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCartStore }          from '@/store/cartStore'
import { ProductVariantSelector, CHAIN_LENGTHS } from './ProductVariantSelector'
import { StickyAddToCart }       from './StickyAddToCart'
import { Button }                from '@/components/ui/Button'
import type { Product, Metal }   from '@/types'
import { METALS }                from '@/types'
import { formatPrice }           from '@/lib/utils/formatPrice'
import { cn }                    from '@/lib/utils/cn'
import toast                     from 'react-hot-toast'

/* ── Payment icons ─────────────────────────────────────────────── */
const PAYMENT_ICONS = [
  { label: 'Visa',        src: 'https://cdn.simpleicons.org/visa/ffffff' },
  { label: 'Mastercard',  src: 'https://cdn.simpleicons.org/mastercard/ffffff' },
  { label: 'Amex',        src: 'https://cdn.simpleicons.org/americanexpress/ffffff' },
  { label: 'Apple Pay',   src: 'https://cdn.simpleicons.org/applepay/ffffff' },
  { label: 'Google Pay',  src: 'https://cdn.simpleicons.org/googlepay/ffffff' },
  { label: 'PayPal',      src: 'https://cdn.simpleicons.org/paypal/ffffff' },
  { label: 'Klarna',      src: 'https://cdn.simpleicons.org/klarna/ffffff' },
]

/* ── Trust badges ──────────────────────────────────────────────── */
function GemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20M12 3L8 9l4 13 4-13-4-6" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M3 9l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5v8a4 4 0 004 4h7" strokeLinecap="round" />
    </svg>
  )
}

const TRUST_BADGES = [
  {
    icon:    <GemIcon />,
    label:   '100% VVS Certified',
    tooltip: 'Very Very Slightly Included. Lab-certified purity.',
  },
  {
    icon:    <CheckIcon />,
    label:   'Diamond Test ✓',
    tooltip: 'Passes all diamond tests. Real moissanite.',
  },
  {
    icon:    <ShieldIcon />,
    label:   'Lifetime Warranty',
    tooltip: 'Guaranteed for life. No questions.',
  },
  {
    icon:    <ReturnIcon />,
    label:   '30-Day Money Back',
    tooltip: 'Not happy? Full refund, no hassle.',
  },
]

interface Props {
  product: Product
}

export function ProductPageClient({ product }: Props) {
  const ctaRef = useRef<HTMLDivElement>(null)

  const defaultMetal  = product.metal as Metal
  const defaultLength = product.chain_length_in?.toString() ?? '16'

  const [selectedMetal,  setSelectedMetal]  = useState<Metal>(defaultMetal)
  const [selectedSize,   setSelectedSize]   = useState<string>(product.stone_size ?? '6.5mm')
  const [selectedLength, setSelectedLength] = useState<string>(defaultLength)
  const [selectedColor,  setSelectedColor]  = useState<string>('silver')
  const [qty,            setQty]            = useState(1)
  const [wishlisted,     setWishlisted]     = useState(false)
  const [tooltipIdx,     setTooltipIdx]     = useState<number | null>(null)

  const { addItem } = useCartStore()

  const availableMetals = Object.keys(METALS) as Metal[]
  const availableSizes  = product.stone_size
    ? ['3mm', '5mm', '6.5mm', '8mm', '10mm']
    : []
  const showLengths = product.category === 'chain' || product.category === 'bracelet'

  const metalSurcharge  = METALS[selectedMetal]?.surcharge ?? 0
  const lengthSurcharge = CHAIN_LENGTHS.find((l) => l.value === selectedLength)?.surcharge ?? 0
  const totalPrice      = product.price + metalSurcharge + lengthSurcharge

  function handleAddToCart() {
    addItem(product, qty, {
      metal:        selectedMetal,
      stone_size:   selectedSize,
      stone_color:  product.stone_color ?? 'D',
      chain_length: parseInt(selectedLength),
    })
    toast.success(`${product.name} ajouté au panier ✓`)
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Lien copié !')
    }
  }

  return (
    <>
      {/* Variants */}
      <ProductVariantSelector
        selectedMetal={selectedMetal}
        selectedSize={selectedSize}
        selectedLength={selectedLength}
        selectedColor={selectedColor}
        availableMetals={availableMetals}
        availableSizes={availableSizes}
        showLengths={showLengths}
        basePrice={product.price}
        onMetalChange={setSelectedMetal}
        onSizeChange={setSelectedSize}
        onLengthChange={setSelectedLength}
        onColorChange={setSelectedColor}
      />

      {/* Stock */}
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <span className="text-sm text-white/65">
          {product.stock > 0
            ? product.stock <= 5
              ? `⚡ Plus que ${product.stock} en stock — commandez vite`
              : '✓ En stock · Expédié sous 48h'
            : 'Rupture de stock'}
        </span>
      </div>

      {/* Qty + Primary CTA */}
      <div ref={ctaRef} className="flex items-center gap-3">
        {/* Qty */}
        <div className="flex items-center gap-1 rounded-full px-2 py-1" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-white">{qty}</span>
          <button
            onClick={() => setQty(Math.min(product.stock || 10, qty + 1))}
            className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <motion.div className="flex-1" whileTap={{ scale: 0.97 }}>
          <Button
            variant="ice"
            size="lg"
            className="w-full"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5" />
            {product.stock === 0 ? 'Rupture de stock' : 'Secure Your Piece'}
          </Button>
        </motion.div>
      </div>

      {/* Secondary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setWishlisted(!wishlisted); toast.success(wishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris ♡') }}
          className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all"
          style={{
            border: wishlisted ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)',
            color: wishlisted ? '#F87171' : 'rgba(255,255,255,0.45)',
            background: wishlisted ? 'rgba(239,68,68,0.08)' : 'transparent',
          }}
        >
          <Heart className={cn('w-4 h-4', wishlisted && 'fill-red-400')} />
          Wishlist
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all text-white/60 hover:text-[#D4AF37]"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
        >
          <Share2 className="w-4 h-4" />
          Partager
        </button>

        <div className="flex items-center gap-1.5 text-xs text-white/55 ml-auto">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Garantie 30 jours
        </div>
      </div>

      {/* Payment methods */}
      <div>
        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2">
          Paiement sécurisé
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {PAYMENT_ICONS.map((icon) => (
            <div
              key={icon.label}
              className="h-7 px-2.5 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon.src} alt={icon.label} className="h-4 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2">
        {TRUST_BADGES.map((badge, i) => (
          <div
            key={badge.label}
            className="relative"
            onMouseEnter={() => setTooltipIdx(i)}
            onMouseLeave={() => setTooltipIdx(null)}
          >
            <div
              className="flex items-center gap-2.5 p-3 rounded-xl cursor-default hover:scale-[1.02] transition-all"
              style={{
                background: 'rgba(212,175,55,0.05)',
                border: '1px solid rgba(212,175,55,0.12)',
              }}
            >
              <span className="text-[#D4AF37] flex-shrink-0">{badge.icon}</span>
              <span className="text-xs font-semibold text-white/70 leading-tight">{badge.label}</span>
            </div>
            {tooltipIdx === i && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 w-44 bg-charcoal text-white text-[11px] rounded-lg px-3 py-2 text-center shadow-xl pointer-events-none">
                {badge.tooltip}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price summary if variants add cost */}
      {(metalSurcharge > 0 || lengthSurcharge > 0) && (
        <p className="text-xs text-center text-white/70">
          Prix total avec options sélectionnées :{' '}
          <strong className="text-white">{formatPrice(totalPrice)}</strong>
        </p>
      )}

      {/* Sticky bar */}
      <StickyAddToCart product={product} triggerRef={ctaRef} />
    </>
  )
}
