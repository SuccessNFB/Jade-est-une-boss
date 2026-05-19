import { createClient }            from '@/lib/supabase/server'
import { notFound }                from 'next/navigation'
import type { Metadata }           from 'next'
import type { Product, Metal }     from '@/types'
import { Header }                  from '@/components/layout/Header'
import { Footer }                  from '@/components/layout/Footer'
import { AnnouncementBar }         from '@/components/layout/AnnouncementBar'
import { ProductCarousel }         from '@/components/product/ProductCarousel'
import { ProductVariantSelector }  from '@/components/product/ProductVariantSelector'
import { ProductFeatureTiles }     from '@/components/product/ProductFeatureTiles'
import { ProductAccordion }        from '@/components/product/ProductAccordion'
import { WhyMoissanite }           from '@/components/product/WhyMoissanite'
import { ProductFAQ }              from '@/components/product/ProductFAQ'
import { RelatedProducts }         from '@/components/product/RelatedProducts'
import { ProductPageClient }       from '@/components/product/ProductPageClient'
import { TierBadge }               from '@/components/ui/Badge'
import { formatPrice }             from '@/lib/utils/formatPrice'
import { METALS }                  from '@/types'
import { Truck, Award, CheckCircle } from 'lucide-react'

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
              <span className="text-charcoal/50">{k}</span>
              <span className="font-medium text-charcoal">{v}</span>
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

      <main className="pt-16 pb-24">
        <div className="section-container max-w-5xl py-10">

          {/* ── TOP SECTION ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">

            {/* LEFT — Carousel */}
            <ProductCarousel images={p.images} name={p.name} />

            {/* RIGHT — Product info */}
            <div className="flex flex-col gap-5">

              {/* Badge + Name */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TierBadge tier={p.price_tier as any} />
                  {p.is_customizable && (
                    <span className="badge-tier bg-charcoal text-white text-[10px]">Sur mesure</span>
                  )}
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
                  {p.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-charcoal">
                  {formatPrice(p.price)}
                </span>
                {p.compare_at_price && p.compare_at_price > p.price && (
                  <span className="text-lg text-charcoal/40 line-through">
                    {formatPrice(p.compare_at_price)}
                  </span>
                )}
                {p.compare_at_price && p.compare_at_price > p.price && (
                  <span className="text-sm font-semibold text-green-600">
                    -{Math.round((1 - p.price / p.compare_at_price) * 100)}%
                  </span>
                )}
              </div>

              {/* Delivery badge */}
              <div className="flex items-center gap-2 text-sm text-charcoal/70">
                <Truck className="w-4 h-4 text-ice-500" />
                <span>Livraison <strong>offerte en France</strong> · Expédié sous 48h</span>
              </div>

              {/* Bullet highlights */}
              <ul className="space-y-1.5">
                {[
                  'Moissanite certifiée GRA · Clarté VVS · Couleur D',
                  'Monture artisanale — chaque pièce est unique',
                  'Certificat d\'authenticité inclus dans l\'écrin ICEKEY',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-charcoal/70">
                    <CheckCircle className="w-4 h-4 text-ice-500 flex-shrink-0 mt-0.5" />
                    {line}
                  </li>
                ))}
              </ul>

              {/* Variants + Qty + CTA (interactive — client component) */}
              <ProductPageClient product={p} />

              {/* Feature tiles */}
              <ProductFeatureTiles />

              {/* Accordion */}
              <ProductAccordion items={accordionItems} />
            </div>
          </div>

          {/* ── BOTTOM SECTIONS ──────────────────────────── */}
          <WhyMoissanite />
          <ProductFAQ />
          <RelatedProducts currentId={p.id} category={p.category} />
        </div>
      </main>

      <Footer />
    </>
  )
}
