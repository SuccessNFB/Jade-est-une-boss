import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

export const revalidate = 3600

const SITE_URL = 'https://icekey.shop'

const STATIC_PAGES = [
  { url: '/',        priority: '1.0', changefreq: 'daily'   },
  { url: '/shop',    priority: '0.8', changefreq: 'daily'   },
  { url: '/builder', priority: '0.7', changefreq: 'weekly'  },
]

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Sitemap feed: Supabase error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }

  const products = (data as { slug: string; updated_at: string | null }[]) ?? []
  const today = new Date().toISOString().split('T')[0]

  const staticEntries = STATIC_PAGES.map(
    (page) => `  <url>
    <loc>${SITE_URL}${escapeXml(page.url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('\n')

  const productEntries = products
    .map((p) => {
      const lastmod = p.updated_at
        ? new Date(p.updated_at).toISOString().split('T')[0]
        : today
      return `  <url>
    <loc>${SITE_URL}/product/${escapeXml(p.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticEntries}
${productEntries}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type':  'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
