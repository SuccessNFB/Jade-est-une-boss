import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { ProductGrid }     from '@/components/product/ProductGrid'
import type { Metadata }   from 'next'

export const revalidate = 60

export const metadata: Metadata = { title: 'Boutique – Toute la collection ICEKEY' }

const CAT_LABELS: Record<string, string> = {
  chain:    'Chaînes',
  pendant:  'Pendentifs',
  ring:     'Bagues',
  watch:    'Montres',
  bracelet: 'Bracelets',
  earring:  "Boucles d'oreilles",
  buff:     'Iced Out Buffs',
  set:      'Sets',
}

interface ShopPageProps {
  searchParams: Promise<{ cat?: string; tier?: string; q?: string; sort?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params   = await searchParams
  const catLabel = params.cat ? (CAT_LABELS[params.cat] ?? params.cat) : null

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-[60px] lg:pt-[72px]" style={{ background: '#0A0A0A', minHeight: '100vh' }}>

        {/* Page header */}
        <div className="py-10" style={{ background: '#121210', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="section-container">
            <p className="text-[11px] text-[#D4AF37] tracking-[0.3em] uppercase font-bold mb-2">
              {catLabel ? 'Catégorie' : 'Toute la collection'}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {catLabel ?? 'Bijoux Moissanite'}
            </h1>
            {params.q && (
              <p className="text-white/55 text-sm mt-2">Résultats pour &ldquo;{params.q}&rdquo;</p>
            )}
            <p className="text-white/60 text-xs mt-3">
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
