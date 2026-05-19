import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

export const revalidate = 3600

const SITE_URL = 'https://icekey.shop'

type ProductRow = Database['public']['Tables']['products']['Row']

interface ProductImage {
  url:      string
  alt:      string
  position: number
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getPriceTier(price: number): string {
  if (price < 100)  return 'entry'
  if (price < 200)  return 'mid'
  if (price < 400)  return 'premium'
  if (price < 700)  return 'luxury'
  return 'ultra'
}

function getMetalLabel(metal: string): string {
  const metalMap: Record<string, string> = {
    'silver-925': 'Argent 925',
    'gold-9k':    'Or 9 carats',
    'gold-14k':   'Or 14 carats',
    'gold-18k':   'Or 18 carats',
    'platinum':   'Platine',
  }
  return metalMap[metal] ?? metal
}

// Google Shopping category taxonomy IDs
function getGoogleCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    chain:    '200',  // Apparel & Accessories > Jewelry > Necklaces
    pendant:  '200',
    ring:     '200',  // Apparel & Accessories > Jewelry > Rings
    watch:    '201',  // Apparel & Accessories > Jewelry > Watches
    bracelet: '200',
    earring:  '200',
    buff:     '200',
    set:      '200',
  }
  return categoryMap[category] ?? '200'
}

function buildProductEntry(product: ProductRow): string {
  const images = (product.images as ProductImage[] | null) ?? []
  const sortedImages = [...images].sort((a, b) => a.position - b.position)
  const primaryImage = sortedImages[0]
  const additionalImages = sortedImages.slice(1, 11) // up to 10 additional

  if (!primaryImage?.url) return ''

  const imageUrl = primaryImage.url.startsWith('http')
    ? primaryImage.url
    : `${SITE_URL}${primaryImage.url}`

  const productUrl  = `${SITE_URL}/product/${escapeXml(product.slug)}`
  const price       = product.price.toFixed(2)
  const availability = product.stock > 0 ? 'in_stock' : 'out_of_stock'
  const priceTier   = product.price_tier || getPriceTier(product.price)
  const metalLabel  = getMetalLabel(product.metal)

  const additionalImageLinks = additionalImages
    .map((img) => {
      const imgUrl = img.url.startsWith('http') ? img.url : `${SITE_URL}${img.url}`
      return `      <g:additional_image_link>${escapeXml(imgUrl)}</g:additional_image_link>`
    })
    .join('\n')

  const salePriceTag = product.compare_at_price && product.compare_at_price > product.price
    ? `      <g:sale_price>${price} EUR</g:sale_price>\n      <g:sale_price_effective_date>2024-01-01T00:00:00+01:00/2099-12-31T23:59:59+01:00</g:sale_price_effective_date>`
    : ''

  const displayPrice = product.compare_at_price && product.compare_at_price > product.price
    ? product.compare_at_price.toFixed(2)
    : price

  const title = `ICEKEY ${escapeXml(product.name)} — Moissanite GRA ${escapeXml(metalLabel)}`
  const description = escapeXml(
    product.description?.substring(0, 5000) ??
    `${product.name} en moissanite certifiée GRA. ${metalLabel}. Livraison offerte en France.`
  )

  return `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
${additionalImages.length > 0 ? additionalImageLinks + '\n' : ''}      <g:price>${displayPrice} EUR</g:price>
${salePriceTag ? salePriceTag + '\n' : ''}      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>ICEKEY</g:brand>
      <g:mpn>${escapeXml(product.sku)}</g:mpn>
      <g:google_product_category>Apparel &amp; Accessories &gt; Jewelry</g:google_product_category>
      <g:product_type>Bijoux &gt; ${escapeXml(product.category)}</g:product_type>
      <g:item_group_id>${escapeXml(product.category)}</g:item_group_id>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>Livraison standard</g:service>
        <g:price>0 EUR</g:price>
      </g:shipping>
      <g:custom_label_0>${escapeXml(priceTier)}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(product.category)}</g:custom_label_1>
      <g:custom_label_2>${escapeXml(product.metal)}</g:custom_label_2>
      <g:identifier_exists>yes</g:identifier_exists>
      <g:adult>no</g:adult>
    </item>`
}

export async function GET() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Google feed: Supabase error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }

  const entries = (products ?? [])
    .map((p) => buildProductEntry(p))
    .filter(Boolean)
    .join('\n')

  const now = new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>ICEKEY — Bijoux Moissanite Certifiée GRA</title>
    <link>${SITE_URL}</link>
    <description>Bijoux moissanite certifiée GRA. Livraison offerte en France. Qualité premium.</description>
    <lastBuildDate>${now}</lastBuildDate>
${entries}
  </channel>
</rss>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type':  'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
