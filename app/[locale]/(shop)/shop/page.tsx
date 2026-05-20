import { Header }      from '@/components/layout/Header'
import { Footer }      from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { ProductGrid } from '@/components/product/ProductGrid'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = { title: 'Boutique – Toute la collection ICEKEY' }

const CAT_LABELS: Record<string, string> = {
  chain:    'Chaînes',
  pendant:  'Pendentifs',
  ring:     'Bagues',
  watch:    'Montres',
  bracelet: 'Bracelets',
  earring:  'Boucles d\'oreilles',
  buff:     'Iced Out Buffs',
  set:      'Sets',
}

interface ShopPageProps {
  searchParams: Promise<{ cat?: string; tier?: string; q?: string; sort?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const catLabel = params.cat ? (CAT_LABELS[params.cat] ?? params.cat) : null

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20">
        {/* Page header */}
        <div className="bg-charcoal text-white py-10">
          <div className="section-container">
            <p className="text-[#00D9FF] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              {catLabel ? `Catégorie` : 'Toute la collection'}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">
              {catLabel ?? 'Bijoux Moissanite'}
            </h1>
            {params.q && (
              <p className="text-white/50 text-sm mt-2">Résultats pour &ldquo;{params.q}&rdquo;</p>
            )}
            {/* Breadcrumb */}
            <p className="text-white/30 text-xs mt-3">
              Accueil{catLabel ? ` › ${catLabel}` : ' › Collection'}
            </p>
          </div>
        </div>

        <div className="section-container py-10">
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
