'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { useCartStore } from '@/store/cartStore'
import { formatPrice }  from '@/lib/utils/formatPrice'
import { TierBadge }    from '@/components/ui/Badge'
import type { Category, PriceTier } from '@/types'
import toast from 'react-hot-toast'

const BUNDLE_DISCOUNT = 10 // % shown on badge

interface Props {
  currentId:  string
  category:   Category
  priceTier:  PriceTier
}

export function RelatedProducts({ currentId, category, priceTier }: Props) {
  /* Upsell logic: mid/premium viewers also see the next tier */
  const upsellTier: PriceTier | undefined =
    priceTier === 'mid'     ? 'premium' :
    priceTier === 'premium' ? 'luxury'  : undefined

  const { products: same }   = useProducts({ category, priceTier, limit: 8 })
  const { products: upsell } = useProducts({ priceTier: upsellTier, limit: 4 })

  const { addItem } = useCartStore()

  const pool    = [...same, ...(upsellTier ? upsell : [])].filter((p) => p.id !== currentId)
  const related = pool.slice(0, 4)

  if (!related.length) return null

  return (
    <section className="py-14 border-t border-white/[0.06]">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-semibold mb-1">
            Ensemble c&apos;est mieux
          </p>
          <h2 className="font-serif text-2xl font-bold text-white">
            Complete Your Look
          </h2>
        </div>
        <Link
          href={`/shop?cat=${category}`}
          className="text-sm font-medium text-white/70 hover:text-[#D4AF37] transition-colors"
        >
          Tout voir →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {related.map((product, i) => {
          const img = product.images?.[0]
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative flex flex-col bg-[#141414] rounded-2xl border border-white/[0.06] overflow-hidden hover:shadow-[0_0_20px_rgba(212,175,55,0.12)] hover:border-[#D4AF37]/20 transition-all"
            >
              {/* Bundle badge */}
              <div className="absolute top-2 left-2 z-10 bg-[#D4AF37] text-white/70 text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{BUNDLE_DISCOUNT}% Bundle
              </div>

              {/* Image */}
              <Link href={`/product/${product.slug}`} className="block aspect-square bg-[#121210] overflow-hidden relative">
                {img ? (
                  <Image
                    src={img.url}
                    alt={img.alt || product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10 text-4xl">◆</div>
                )}
              </Link>

              {/* Info */}
              <div className="p-3 flex flex-col gap-1.5 flex-1">
                <TierBadge tier={product.price_tier as any} />
                <Link href={`/product/${product.slug}`} className="text-sm font-semibold text-white/70 leading-tight hover:text-[#D4AF37] transition-colors line-clamp-2">
                  {product.name}
                </Link>
                <div className="flex items-center justify-between mt-auto pt-1">
                  <span className="text-sm font-bold text-white">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => {
                      addItem(product, 1)
                      toast.success(`${product.name} ajouté ✓`)
                    }}
                    className="w-7 h-7 rounded-full bg-[#D4AF37] text-white/70 flex items-center justify-center hover:bg-[#E8C572] hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all"
                    title="Ajouter au panier"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Vous apprécierez également label */}
      <p className="text-center text-xs text-white/60 mt-6 tracking-wide">
        Vous apprécierez également — sélection basée sur votre panier
      </p>
    </section>
  )
}
