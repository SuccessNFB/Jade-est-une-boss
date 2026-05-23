'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Zap } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product } from '@/types'
import toast from 'react-hot-toast'
import { trackAddToCart } from '@/lib/analytics/gtag'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered,  setHovered]  = useState(false)
  const [liked,    setLiked]    = useState(false)
  const { addItem }             = useCartStore()

  const mainImage      = product.images[0]?.url ?? '/images/placeholder.jpg'
  const lifestyleImage = product.images[1]?.url

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} ajouté au panier`)
    trackAddToCart({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      quantity: 1,
      category: product.category,
    })
  }

  const discount = product.compare_at_price && product.compare_at_price > product.price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : null

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          borderColor: hovered
            ? 'rgba(0,217,255,0.18)'
            : 'rgba(255,255,255,0.06)',
        }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: '#0E0F16',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* ── Image container ───────────────────────────────── */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0B12]">

          {/* Main photo */}
          <Image
            src={mainImage}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />

          {/* Lifestyle photo cross-fade */}
          {lifestyleImage && (
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="lifestyle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
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

          {/* Dark gradient overlay bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(8,9,14,0.5) 0%, transparent 40%)',
            }}
          />

          {/* Top row — badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
            <div className="flex flex-col gap-1.5">
              {discount && (
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black tracking-wide"
                  style={{ background: '#00D9FF', color: '#08090E' }}
                >
                  −{discount}%
                </span>
              )}
              {product.is_featured && !discount && (
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  Top seller
                </span>
              )}
              {product.is_customizable && (
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                >
                  Sur mesure
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: liked ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${liked ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <Heart
                style={{ width: 14, height: 14 }}
                className={`transition-colors duration-200 ${liked ? 'fill-red-400 text-red-400' : 'text-white/40'}`}
              />
            </button>
          </div>

          {/* Stock warning */}
          {product.stock <= 3 && product.stock > 0 && (
            <div className="absolute bottom-12 left-3 z-10">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <Zap style={{ width: 9, height: 9 }} />
                Plus que {product.stock}
              </span>
            </div>
          )}

          {/* Add to cart — slides up on hover */}
          <motion.div
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-3 left-3 right-3 z-10"
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                         text-[#08090E] text-xs font-black tracking-wider uppercase
                         transition-all duration-200 hover:brightness-110"
              style={{ background: '#00D9FF' }}
            >
              <ShoppingBag style={{ width: 13, height: 13 }} />
              Ajouter au panier
            </button>
          </motion.div>
        </div>

        {/* ── Info strip ────────────────────────────────────── */}
        <div className="px-4 py-3.5">
          <p
            className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
            style={{ color: 'rgba(0,217,255,0.6)' }}
          >
            {product.category}
          </p>
          <h3 className="font-serif text-sm font-semibold text-white/90 line-clamp-1 leading-snug mb-2.5">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-white">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-xs text-white/25 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
        </div>

        {/* Ice glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: '0 0 0 1px rgba(0,217,255,0.12), inset 0 0 0 1px rgba(0,217,255,0.06)' }}
        />
      </motion.div>
    </Link>
  )
}
