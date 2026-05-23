'use client'

import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore()

  return (
    <div className="flex gap-3">
      <Button
        variant="primary"
        size="lg"
        className="flex-1"
        disabled={product.stock === 0}
        onClick={() => {
          addItem(product)
          toast.success(`${product.name} ajouté au panier`)
        }}
      >
        <ShoppingBag className="w-5 h-5" />
        {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
      </Button>
      {product.is_customizable && (
        <a
          href="/builder"
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-gold-300 text-white hover:bg-gold-400 transition-all duration-300"
        >
          Personnaliser
        </a>
      )}
    </div>
  )
}
