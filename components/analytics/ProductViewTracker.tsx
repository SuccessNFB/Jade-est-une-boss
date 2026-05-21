'use client'

import { useEffect } from 'react'
import { trackViewItem } from '@/lib/analytics/gtag'

interface Props {
  id:       string
  name:     string
  price:    number
  category: string
}

/* Drop this in any server component — fires view_item once on mount */
export function ProductViewTracker({ id, name, price, category }: Props) {
  useEffect(() => {
    trackViewItem({ id, name, price, category })
  }, [id, name, price, category])

  return null
}
