'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Zap } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product } from '@/types'
import toast from 'react-hot-toast'
import { trackAddToCart } from '@/lib/analytics/gtag'

interface ProductCardProps {
  product: Product
}

const CATEGORY_LABELS: Record<string, string> = {
  chain:    'Chaîne',
  pendant:  'Pendentif',
  ring:     'Bague',
  bracelet: 'Bracelet',
  earring:  'Boucle',
  watch:    'Montre',
  buff:     'Buff',
  set:      'Set',
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

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-[20px]"
        style={{ aspectRatio: '3/4', background: '#141414' }}
      >
        {/* Product photo */}
        <Image
          src={mainImage}
          alt={product.images[0]?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />

        {/* Gradient overlay — heavy bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.1) 55%, transparent 75%)',
          }}
        />

        {/* ── Top row: badges + wishlist ─────────────────── */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <div className="flex flex-col gap-1.5">
            {/* Featured badge */}
            {product.is_featured && (
              <span
                className="inline-block px-2 py-0.5 rounded text-[8px] font-black tracking-[0.15em] uppercase"
                style={{
                  background: '#D4AF37',
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-space-mono), monospace',
                }}
              >
                TOP
              </span>
            )}
            {/* Discount badge */}
            {discount && (
              <span
                className="inline-block px-2 py-0.5 rounded text-[8px] font-black tracking-[0.15em] uppercase"
                style={{
                  background: 'rgba(212,175,55,0.12)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212,175,55,0.3)',
                  fontFamily: 'var(--font-space-mono), monospace',
                }}
              >
                -{discount}%
              </span>
            )}
            {/* Category label */}
            <span
              className="inline-block px-2 py-0.5 rounded text-[8px] font-bold tracking-[0.12em] uppercase"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(4px)',
                fontFamily: 'var(--font-space-mono), monospace',
              }}
            >
              {categoryLabel}
            </span>
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: liked ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.45)',
              border: `1px solid ${liked ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.12)'}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Heart
              style={{ width: 12, height: 12 }}
              className={liked ? 'fill-red-400 text-red-400' : 'text-white/70'}
            />
          </button>
        </div>

        {/* Low stock warning */}
        {product.stock <= 3 && product.stock > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <span
              className="text-[8px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 whitespace-nowrap"
              style={{
                background: 'rgba(245,158,11,0.15)',
                color: '#F59E0B',
                border: '1px solid rgba(245,158,11,0.3)',
                backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-space-mono), monospace',
              }}
            >
              <Zap style={{ width: 7, height: 7 }} />
              Reste {product.stock}
            </span>
          </div>
        )}

        {/* ── Bottom: name + price ────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {/* Product name */}
          <h3 className="font-serif font-semibold text-white leading-snug line-clamp-1 text-sm mb-1">
            {product.name}
          </h3>

          {/* Price row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="text-base font-bold"
                style={{
                  color: '#D4AF37',
                  fontFamily: 'var(--font-space-mono), monospace',
                  letterSpacing: '-0.02em',
                }}
              >
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span
                  className="text-xs line-through"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>
            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#D4AF37', fontSize: 8 }}>★</span>
              ))}
            </div>
          </div>

          {/* Add to cart — slides in on hover */}
          <motion.div
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                         text-[#0A0A0A] text-[10px] font-black tracking-wider uppercase
                         transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: '#D4AF37',
                fontFamily: 'var(--font-barlow), system-ui, sans-serif',
              }}
            >
              <ShoppingBag style={{ width: 11, height: 11 }} />
              Ajouter au panier
            </button>
          </motion.div>
        </div>

        {/* Gold border on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none rounded-[20px]"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(212,175,55,0.4)' }}
        />
      </div>
    </Link>
  )
}
