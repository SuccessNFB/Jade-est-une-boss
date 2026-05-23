import { createClient }            from '@/lib/supabase/server'
import { notFound }                from 'next/navigation'
import type { Metadata }           from 'next'
import type { Product, Metal }     from '@/types'
import { Header }                  from '@/components/layout/Header'
import { Footer }                  from '@/components/layout/Footer'
import { AnnouncementBar }         from '@/components/layout/AnnouncementBar'
import { ProductCarousel }         from '@/components/product/ProductCarousel'
import { ProductFeatureTiles }     from '@/components/product/ProductFeatureTiles'
import { ProductAccordion }        from '@/components/product/ProductAccordion'
import { ProductFAQ }              from '@/components/product/ProductFAQ'
import { ProductReviews }          from '@/components/product/ProductReviews'
import { RelatedProducts }         from '@/components/product/RelatedProducts'
import { ProductPageClient }       from '@/components/product/ProductPageClient'
import { TierBadge }               from '@/components/ui/Badge'
import { formatPrice }             from '@/lib/utils/formatPrice'
import { METALS, PRICE_TIERS }     from '@/types'
import { Truck, CheckCircle }          from 'lucide-react'
import { ProductViewTracker }          from '@/components/analytics/ProductViewTracker'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('name,description').eq('slug', slug).single()
  if (!data) return { title: 'Produit introuvable' }
  const row = data as { name: string; description: string }
  return {
    title:       row.name,
    description: row.description,
    openGraph:   { title: row.name, description: row.description },
  }
}

function buildSubheading(p: Product): string {
  const parts: string[] = []
  if (p.chain_length_in) parts.push(`${p.chain_length_in}"`)
  if (p.stone_size)      parts.push(`VVS Moissanite ${p.stone_size}`)
  const metalLabel = METALS[p.metal as Metal]?.label
  if (metalLabel)        parts.push(metalLabel)
  return parts.join(' · ') || 'VVS Moissanite · Certifié GRA'
}

export default async function ProductPage({ params }: Props) {
  const { slug }          = await params
  const supabase          = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const p = product as unknown as Product

  const accordionItems = [
    {
      title:   'Description',
      content: <p>{p.description}</p>,
    },
    {
      title:   'Caractéristiques techniques',
      content: (
        <div className="space-y-2">
          {[
            ['Type de pierre', `Moissanite ${p.stone_type !== 'moissanite' ? p.stone_type : ''}`],
            ['Taille de pierre', p.stone_size ?? '—'],
            ['Couleur',          p.stone_color ? `Grade ${p.stone_color}` : '—'],
            ['Métal',            METALS[p.metal as Metal]?.label ?? p.metal],
            ['Poids',            p.weight_grams ? `${p.weight_grams}g` : '—'],
            ['Certification',    p.certificate_type ?? 'GRA'],
            ['SKU',              p.sku],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-white/35">{k}</span>
              <span className="font-medium text-white/70">{v}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <>
      <AnnouncementBar />
      <Header />

      <ProductViewTracker id={p.id} name={p.name} price={p.price} category={p.category} />
      <main className="pt-[60px] lg:pt-[72px] pb-24" style={{ background: '#08090E', minHeight: '100vh' }}>
        <div className="section-container max-w-5xl py-10">

          {/* ── TOP SECTION ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">

            {/* LEFT — Carousel */}
            <ProductCarousel images={p.images} name={p.name} />

            {/* RIGHT — Product info */}
            <div className="flex flex-col gap-5">

              {/* Badge + Name + Subheading */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TierBadge tier={p.price_tier as any} />
                  {p.is_customizable && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>Sur mesure</span>
                  )}
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {p.name}
                </h1>
                <p className="text-sm text-white/40 mt-1 font-medium">
                  {buildSubheading(p)}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-white">
                  {formatPrice(p.price)}
                </span>
                {p.compare_at_price && p.compare_at_price > p.price && (
                  <>
                    <span className="text-lg text-white/25 line-through">
                      {formatPrice(p.compare_at_price)}
                    </span>
                    <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,217,255,0.12)', color: '#00D9FF' }}>
                      -{Math.round((1 - p.price / p.compare_at_price) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Delivery badge */}
              <div className="flex items-center gap-2 text-sm text-white/50 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(0,217,255,0.05)', border: '1px solid rgba(0,217,255,0.1)' }}>
                <Truck className="w-4 h-4 text-[#00D9FF]" />
                <span>Livraison <strong>offerte en France</strong> · FREE · 4–7 jours</span>
              </div>

              {/* Emotional bullets */}
              <ul className="space-y-1.5">
                {[
                  'VVS certifié · passe le diamond test',
                  'Argent 925 finition main · qualité FR',
                  'Garantie à vie · retour 30 jours',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-white/50">
                    <CheckCircle className="w-4 h-4 text-[#00D9FF] flex-shrink-0 mt-0.5" />
                    {line}
                  </li>
                ))}
              </ul>

              {/* Variants + Qty + CTA + Trust (client component) */}
              <ProductPageClient product={p} />

              {/* Feature tiles */}
              <ProductFeatureTiles />

              {/* Accordion — Description + Specs */}
              <ProductAccordion items={accordionItems} />
            </div>
          </div>

          {/* ── BOTTOM SECTIONS ──────────────────────────── */}
          <ProductReviews />
          <ProductFAQ />
          <RelatedProducts currentId={p.id} category={p.category} priceTier={p.price_tier} />
        </div>
      </main>

      <Footer />
    </>
  )
}
