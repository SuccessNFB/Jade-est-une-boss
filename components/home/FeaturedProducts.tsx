'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'

export function FeaturedProducts() {
  const { products, loading } = useProducts({ featured: true, limit: 8 })

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Bestsellers
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Les coups de cœur
            </h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-2 text-sm font-medium text-charcoal/50 hover:text-ice-500 transition-colors">
            Tout voir <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/shop">
            <Button variant="ghost" size="lg" className="group">
              Voir toute la collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
