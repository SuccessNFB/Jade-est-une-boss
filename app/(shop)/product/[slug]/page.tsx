import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProductCarousel } from '@/components/product/ProductCarousel'
import { TierBadge } from '@/components/ui/Badge'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { TrustSignals } from '@/components/checkout/TrustSignals'
import { formatPrice } from '@/lib/utils/formatPrice'
import { Diamond, Award, Truck } from 'lucide-react'
import type { Metadata } from 'next'
import type { Product } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug }  = await params
  const supabase  = await createClient()
  const { data }  = await supabase.from('products').select('name, description').eq('slug', slug).single()
  if (!data) return { title: 'Produit introuvable' }
  return { title: data.name, description: data.description }
}

export default async function ProductPage({ params }: Props) {
  const { slug }        = await params
  const supabase        = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const p = product as unknown as Product

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="section-container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <ProductCarousel images={p.images} name={p.name} />

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
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
                <span className="font-serif text-4xl font-bold text-charcoal">
                  {formatPrice(p.price)}
                </span>
                {p.compare_at_price && p.compare_at_price > p.price && (
                  <span className="text-lg text-charcoal/40 line-through">
                    {formatPrice(p.compare_at_price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-charcoal/70 leading-relaxed">{p.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 p-5 rounded-2xl bg-gray-50">
                {[
                  ['Pierre',   `Moissanite ${p.stone_size ?? ''} ${p.stone_color ? `· Couleur ${p.stone_color}` : ''}`],
                  ['Métal',    p.metal],
                  ['SKU',      p.sku],
                  ['Poids',    p.weight_grams ? `${p.weight_grams}g` : '—'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-charcoal/40 tracking-wide mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-charcoal capitalize">{value}</p>
                  </div>
                ))}
              </div>

              {/* Certifs */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-charcoal/60">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span>Certifié GRA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal/60">
                  <Truck className="w-4 h-4 text-ice-500" />
                  <span>Livraison offerte</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal/60">
                  <Diamond className="w-4 h-4 text-ice-400" fill="currentColor" />
                  <span>{p.stone_type}</span>
                </div>
              </div>

              {/* Add to cart */}
              <AddToCartButton product={p} />

              <TrustSignals />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
