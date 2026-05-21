'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { TierBadge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered,  setHovered]  = useState(false)
  const [liked,    setLiked]    = useState(false)
  const { addItem }             = useCartStore()

  const mainImage      = product.images[0]?.url ?? '/images/placeholder.jpg'
  const lifestyleImage = product.images[1]?.url  /* photo portée sur quelqu'un */

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} ajouté au panier`)
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card-product group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container — both photos stacked, lifestyle fades in on hover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">

        {/* Photo principale (toujours visible en dessous) */}
        <Image
          src={mainImage}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Photo lifestyle (portée sur quelqu'un) — cross-fade au hover */}
        {lifestyleImage && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="lifestyle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={lifestyleImage}
                  alt={`${product.name} porté`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Pastilles indicatrices — photo 1 / photo 2 */}
        {lifestyleImage && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${!hovered ? 'bg-white' : 'bg-white/40'}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${hovered ? 'bg-white' : 'bg-white/40'}`} />
          </div>
        )}

        {/* Overlay — bouton Ajouter au panier */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          className="absolute bottom-3 left-3 right-3 z-10"
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       bg-charcoal/90 backdrop-blur-sm text-white text-xs font-semibold tracking-wide
                       hover:bg-[#00D9FF] hover:text-charcoal transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Ajouter au panier
          </button>
        </motion.div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                     flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${liked ? 'fill-red-400 text-red-400' : 'text-charcoal/40'}`}
          />
        </button>

        {/* Tier badge */}
        <div className="absolute top-3 left-3 z-10">
          <TierBadge tier={product.price_tier as any} />
        </div>

        {/* Sur mesure badge */}
        {product.is_customizable && (
          <div className="absolute bottom-14 left-3 z-10">
            <span className="badge-tier bg-charcoal/80 text-white text-[10px]">Sur mesure</span>
          </div>
        )}
      </div>

      {/* Infos produit */}
      <div className="p-4">
        <p className="text-xs text-charcoal/40 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-sm font-semibold text-charcoal line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-base text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="ml-2 text-xs text-charcoal/40 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
          {product.stock <= 3 && product.stock > 0 && (
            <span className="text-[10px] text-amber-600 font-semibold">
              Plus que {product.stock}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
