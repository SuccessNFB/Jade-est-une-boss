'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Zap, ArrowUpRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product } from '@/types'
import toast from 'react-hot-toast'
import { trackAddToCart } from '@/lib/analytics/gtag'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [liked,   setLiked]   = useState(false)
  const { addItem }           = useCartStore()

  const mainImage = product.images[0]?.url ?? '/images/placeholder.jpg'

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.name} ajouté au panier`)
    trackAddToCart({
      id: product.id, name: product.name,
      price: product.price, quantity: 1, category: product.category,
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
      {/* Full-bleed photo card — VibeVault style */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: '3/4', background: '#1A1A17' }}
      >
        {/* Photo fills entire card */}
        <Image
          src={mainImage}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Dark gradient overlay — heavy bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.1) 60%, transparent 80%)',
          }}
        />

        {/* ── Top: badges + wishlist ──────────────────────── */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <div className="flex flex-col gap-1.5">
            {product.is_featured && (
              <span
                className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black tracking-widest uppercase"
                style={{ background: '#F5C542', color: '#0F0F0D' }}
              >
                Best
              </span>
            )}
            {discount && (
              <span
                className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black tracking-widest uppercase"
                style={{ background: 'rgba(245,197,66,0.15)', color: '#F5C542', border: '1px solid rgba(245,197,66,0.25)' }}
              >
                Sale
              </span>
            )}
            <span
              className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)' }}
            >
              {product.category}
            </span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: liked ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.4)',
              border: `1px solid ${liked ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.15)'}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Heart
              style={{ width: 13, height: 13 }}
              className={liked ? 'fill-red-400 text-red-400' : 'text-white/80'}
            />
          </button>
        </div>

        {/* Stock warning */}
        {product.stock <= 3 && product.stock > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap"
              style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)', backdropFilter: 'blur(8px)' }}
            >
              <Zap style={{ width: 8, height: 8 }} />
              Plus que {product.stock}
            </span>
          </div>
        )}

        {/* ── Bottom overlay — name + price ───────────────── */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="flex items-end justify-between gap-2 mb-2.5">
            <div className="flex-1 min-w-0">
              <h3
                className="font-serif font-semibold text-white leading-snug line-clamp-1 text-sm mb-0.5"
              >
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className="font-display font-black text-lg uppercase"
                  style={{ color: '#F5C542' }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && product.compare_at_price > product.price && (
                  <span className="text-xs line-through" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="flex gap-px mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#F5C542', fontSize: 9 }}>★</span>
                ))}
              </div>
              <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.45)' }}>4.95</span>
            </div>
          </div>

          {/* Add to cart — slides up on hover */}
          <motion.div
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                         text-[#0F0F0D] text-[11px] font-black tracking-wider uppercase
                         transition-all hover:brightness-110"
              style={{ background: '#F5C542' }}
            >
              <ShoppingBag style={{ width: 12, height: 12 }} />
              Ajouter au panier
            </button>
          </motion.div>
        </div>

        {/* "More info" arrow — top right of bottom area (always visible on hover) */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-14 right-3 z-10"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <ArrowUpRight style={{ width: 13, height: 13 }} className="text-white" />
          </div>
        </motion.div>

        {/* Yellow border glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(245,197,66,0.35)' }}
        />
      </div>
    </Link>
  )
}
