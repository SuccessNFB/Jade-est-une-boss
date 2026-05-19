'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from './ProductCard'
import type { Category } from '@/types'

interface Props {
  currentId: string
  category:  Category
}

export function RelatedProducts({ currentId, category }: Props) {
  const { products } = useProducts({ category, limit: 8 })
  const related      = products.filter((p) => p.id !== currentId).slice(0, 4)

  if (!related.length) return null

  return (
    <section className="py-14 border-t border-gray-100">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-serif text-2xl font-bold text-charcoal">
          Découvrez la collection
        </h2>
        <Link
          href={`/shop?cat=${category}`}
          className="flex items-center gap-1.5 text-sm font-medium text-charcoal/50 hover:text-ice-500 transition-colors"
        >
          Tout voir <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {related.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
