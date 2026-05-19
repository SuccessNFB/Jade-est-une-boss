import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProductGrid } from '@/components/product/ProductGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Boutique – Toute la collection ICEKEY' }

interface ShopPageProps {
  searchParams: Promise<{ cat?: string; tier?: string; q?: string; sort?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="section-container py-12">
          {/* Page header */}
          <div className="mb-10">
            <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              {params.cat ? `Catégorie : ${params.cat}` : 'Toute la collection'}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              {params.tier
                ? `Gamme ${params.tier}`
                : params.cat
                ? params.cat.charAt(0).toUpperCase() + params.cat.slice(1)
                : 'Bijoux Moissanite'}
            </h1>
          </div>
          <ProductGrid
            initialCategory={params.cat as any}
            initialTier={params.tier as any}
            initialSearch={params.q}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
