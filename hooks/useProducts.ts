'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Product, Category, PriceTier } from '@/types'

interface UseProductsOptions {
  category?:  Category
  priceTier?: PriceTier
  featured?:  boolean
  limit?:     number
  search?:    string
}

const supabase = createClient()

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const { category, priceTier, featured, limit, search } = options

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (category)  query = query.eq('category', category)
    if (priceTier) query = query.eq('price_tier', priceTier)
    if (featured)  query = query.eq('is_featured', true)
    if (search)    query = query.ilike('name', `%${search}%`)
    if (limit)     query = query.limit(limit)

    query.then(({ data, error: err }) => {
      if (cancelled) return
      if (err) setError(err.message)
      else     setProducts((data as Product[]) ?? [])
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [category, priceTier, featured, limit, search])

  return { products, loading, error }
}
