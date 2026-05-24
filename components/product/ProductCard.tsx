'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils/formatPrice'
import type { Product, Category } from '@/types'
import { CATEGORIES } from '@/types'
import toast from 'react-hot-toast'
import { trackAddToCart } from '@/lib/analytics/gtag'

interface ProductCardProps {
  product: Product
  variant?: 'grid' | 'list'
}

function DiamondPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#1A1A1A' }}>
      <svg viewBox="0 0 60 60" width="44" height="44" style={{ opacity: 0.12 }}>
        <polygon points="30,4 54,22 48,56 12,56 6,22"
          stroke="white" strokeWidth="1.5" fill="none" />
        <polygon points="30,4 54,22 30,34 6,22"
          stroke="white" strokeWidth="1" fill="none" />
        <line x1="6" y1="22" x2="30" y2="34" stroke="white" strokeWidth="0.75" />
        <line x1="54" y1="22" x2="30" y2="34" stroke="white" strokeWidth="0.75" />
        <line x1="12" y1="56" x2="30" y2="34" stroke="white" strokeWidth="0.75" />
        <line x1="48" y1="56" x2="30" y2="34" stroke="white" strokeWidth="0.75" />
      </svg>
    </div>
  )
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const [hovered,  setHovered]  = useState(false)
  const [liked,    setLiked]    = useState(false)
  const [imgError, setImgError] = useState(false)
  const { addItem }             = useCartStore()

  const mainImage    = (!imgError && product.images[0]?.url) ? product.images[0].url : null
  const showImage    = !!mainImage

  const discount = product.compare_at_price && product.compare_at_price > product.price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : null

  const categoryLabel = CATEGORIES[product.category as Category]?.label ?? product.category

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

  /* ────────────────────────────── LIST VIEW ── */
  if (variant === 'list') {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="group flex items-center gap-4 rounded-2xl p-3.5 transition-all duration-200"
        style={{
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Square thumbnail */}
        <div
          className="relative flex-shrink-0 rounded-xl overflow-hidden"
          style={{ width: 80, height: 80, background: '#1A1A1A' }}
        >
          {showImage ? (
            <Image
              src={mainImage!}
              alt={product.images[0]?.alt ?? product.name}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <DiamondPlaceholder />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span
              className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded"
              style={{
                background: product.stock > 0 ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.12)',
                color: product.stock > 0 ? '#34D399' : '#EF4444',
                fontFamily: 'var(--font-space-mono), monospace',
              }}
            >
              {product.stock > 0 ? 'En stock' : 'Rupture'}
            </span>
            {discount && (
              <span
                className="text-[8px] font-black px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}
              >
                -{discount}%
              </span>
            )}
            <span
              className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.50)', fontFamily: 'var(--font-space-mono), monospace' }}
            >
              {categoryLabel}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-serif font-semibold text-white text-sm leading-tight line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span
              className="font-bold text-sm"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace', letterSpacing: '-0.02em' }}
            >
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-xs line-through" style={{ color: 'rgba(255,255,255,0.30)', fontFamily: 'var(--font-space-mono), monospace' }}>
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
        </div>

        {/* Right: wishlist + CTA */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: liked ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${liked ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <Heart style={{ width: 12, height: 12 }} className={liked ? 'fill-red-400 text-red-400' : 'text-white/50'} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:brightness-110 active:scale-[0.97]"
            style={{
              background: product.stock > 0 ? '#D4AF37' : 'rgba(255,255,255,0.06)',
              color: product.stock > 0 ? '#0A0A0A' : 'rgba(255,255,255,0.25)',
              fontFamily: 'var(--font-space-mono), monospace',
              cursor: product.stock > 0 ? 'pointer' : 'default',
            }}
          >
            <ShoppingBag style={{ width: 10, height: 10 }} />
            Ajouter
          </button>
        </div>

        {/* Gold border on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(212,175,55,0.35)' }}
        />
      </Link>
    )
  }

  /* ────────────────────────────── GRID VIEW (default) ── */
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-[18px]"
        style={{ aspectRatio: '3/4', background: '#141414' }}
      >
        {/* Product photo */}
        {showImage ? (
          <Image
            src={mainImage!}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            onError={() => setImgError(true)}
          />
        ) : (
          <DiamondPlaceholder />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.08) 60%, transparent 80%)',
          }}
        />

        {/* Top badges + wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1 flex-wrap">
              {product.stock > 0 ? (
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase"
                  style={{
                    background: 'rgba(52,211,153,0.15)', color: '#34D399',
                    border: '1px solid rgba(52,211,153,0.3)', backdropFilter: 'blur(6px)',
                    fontFamily: 'var(--font-space-mono), monospace',
                  }}
                >
                  En stock
                </span>
              ) : (
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase"
                  style={{
                    background: 'rgba(239,68,68,0.12)', color: '#EF4444',
                    border: '1px solid rgba(239,68,68,0.25)',
                    fontFamily: 'var(--font-space-mono), monospace',
                  }}
                >
                  Rupture
                </span>
              )}
              {discount && (
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black"
                  style={{
                    background: 'rgba(212,175,55,0.18)', color: '#D4AF37',
                    border: '1px solid rgba(212,175,55,0.35)',
                    fontFamily: 'var(--font-space-mono), monospace',
                  }}
                >
                  -{discount}%
                </span>
              )}
            </div>
            {product.is_featured && (
              <span
                className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase"
                style={{ background: '#D4AF37', color: '#0A0A0A', fontFamily: 'var(--font-space-mono), monospace' }}
              >
                Bestseller
              </span>
            )}
            <span
              className="inline-block px-2 py-0.5 rounded-md text-[9px] font-semibold"
              style={{
                background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(6px)', fontFamily: 'var(--font-space-mono), monospace',
              }}
            >
              {categoryLabel}
            </span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: liked ? 'rgba(239,68,68,0.18)' : 'rgba(0,0,0,0.5)',
              border: `1px solid ${liked ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <Heart style={{ width: 13, height: 13 }} className={liked ? 'fill-red-400 text-red-400' : 'text-white/60'} />
          </button>
        </div>

        {/* Low stock warning */}
        {product.stock <= 3 && product.stock > 0 && (
          <div className="absolute bottom-[88px] left-3 z-10">
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap"
              style={{
                background: 'rgba(245,158,11,0.15)', color: '#F59E0B',
                border: '1px solid rgba(245,158,11,0.3)', backdropFilter: 'blur(6px)',
                fontFamily: 'var(--font-space-mono), monospace',
              }}
            >
              Plus que {product.stock}
            </span>
          </div>
        )}

        {/* Bottom: name + price + CTA */}
        <div className="absolute bottom-0 left-0 right-0 px-3.5 pt-6 pb-3.5 z-10">
          <h3
            className="font-serif font-semibold leading-tight line-clamp-2 mb-2"
            style={{ color: 'rgba(255,255,255,0.95)', fontSize: '13px' }}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span
              className="font-bold"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace', fontSize: '15px', letterSpacing: '-0.02em' }}
            >
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span
                className="text-xs line-through"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-space-mono), monospace' }}
              >
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                       text-[10px] font-black tracking-widest uppercase
                       transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: product.stock > 0 ? '#D4AF37' : 'rgba(255,255,255,0.08)',
              color: product.stock > 0 ? '#0A0A0A' : 'rgba(255,255,255,0.35)',
              fontFamily: 'var(--font-space-mono), monospace',
              cursor: product.stock > 0 ? 'pointer' : 'default',
            }}
          >
            <ShoppingBag style={{ width: 11, height: 11 }} />
            {product.stock > 0 ? 'Ajouter' : 'Indisponible'}
          </button>
        </div>

        {/* Gold glow border on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 pointer-events-none rounded-[18px]"
          style={{ boxShadow: 'inset 0 0 0 1.5px rgba(212,175,55,0.45)' }}
        />
      </div>
    </Link>
  )
}
