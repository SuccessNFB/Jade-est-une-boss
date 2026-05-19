'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
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

  const mainImage  = product.images[0]?.url ?? '/images/placeholder.jpg'
  const hoverImage = product.images[1]?.url ?? mainImage

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
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Image
          src={hovered ? hoverImage : mainImage}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Overlay actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          className="absolute bottom-3 left-3 right-3"
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       bg-charcoal text-white text-xs font-semibold tracking-wide
                       hover:bg-ice-500 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Ajouter au panier
          </button>
        </motion.div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm
                     flex items-center justify-center shadow-sm
                     hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${liked ? 'fill-red-400 text-red-400' : 'text-charcoal/40'}`}
          />
        </button>

        {/* Tier badge */}
        <div className="absolute top-3 left-3">
          <TierBadge tier={product.price_tier as any} />
        </div>

        {/* Custom badge */}
        {product.is_customizable && (
          <div className="absolute bottom-14 left-3">
            <span className="badge-tier bg-charcoal/80 text-white text-[10px]">Sur mesure</span>
          </div>
        )}
      </div>

      {/* Info */}
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
