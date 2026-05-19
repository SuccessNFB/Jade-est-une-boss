'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Product, Category, PriceTier } from '@/types'

interface UseProductsOptions {
  category?:   Category
  priceTier?:  PriceTier
  featured?:   boolean
  limit?:      number
  search?:     string
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (options.category)  query = query.eq('category', options.category)
    if (options.priceTier) query = query.eq('price_tier', options.priceTier)
    if (options.featured)  query = query.eq('is_featured', true)
    if (options.search)    query = query.ilike('name', `%${options.search}%`)
    if (options.limit)     query = query.limit(options.limit)

    query.then(({ data, error: err }) => {
      if (err) setError(err.message)
      else     setProducts((data as Product[]) ?? [])
      setLoading(false)
    })
  }, [options.category, options.priceTier, options.featured, options.limit, options.search])

  return { products, loading, error }
}
