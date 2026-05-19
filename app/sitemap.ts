import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

const SITE_URL = 'https://icekey.shop'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })

  const products = (data as { slug: string; updated_at: string | null }[]) ?? []

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:              `${SITE_URL}/`,
      lastModified:     new Date(),
      changeFrequency:  'daily',
      priority:         1.0,
    },
    {
      url:              `${SITE_URL}/shop`,
      lastModified:     new Date(),
      changeFrequency:  'daily',
      priority:         0.8,
    },
    {
      url:              `${SITE_URL}/builder`,
      lastModified:     new Date(),
      changeFrequency:  'weekly',
      priority:         0.7,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url:             `${SITE_URL}/product/${p.slug}`,
    lastModified:    p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority:        0.9,
  }))

  return [...staticRoutes, ...productRoutes]
}
