'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProductImage } from '@/types'
import { cn } from '@/lib/utils/cn'

interface ProductCarouselProps {
  images: ProductImage[]
  name:   string
}

export function ProductCarousel({ images, name }: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [zoomed,         setZoomed]        = useState(false)
  const [emblaRef, embla] = useEmblaCarousel({ loop: true })

  const scrollTo = useCallback((index: number) => {
    embla?.scrollTo(index)
    setSelectedIndex(index)
  }, [embla])

  const prev = () => {
    const next = (selectedIndex - 1 + images.length) % images.length
    scrollTo(next)
  }
  const next = () => {
    scrollTo((selectedIndex + 1) % images.length)
  }

  if (!images.length) return null

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden group" style={{ background: '#121210' }}>
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {images.map((img, i) => (
              <div key={i} className="relative flex-[0_0_100%] h-full">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4 text-white/70" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4 text-white/70" />
            </button>
          </>
        )}

        {/* Zoom */}
        <button
          onClick={() => setZoomed(true)}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="w-4 h-4 text-white/70" />
        </button>

        {/* Index indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all',
                i === selectedIndex ? 'bg-ice-500 w-4' : 'bg-white/30'
              )}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                'relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all',
                i === selectedIndex
                  ? 'ring-2 ring-ice-500 ring-offset-1'
                  : 'opacity-60 hover:opacity-100'
              )}
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Zoom overlay */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-3xl max-h-[90vh] w-full h-full">
              <Image
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
