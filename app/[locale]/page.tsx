import type { Metadata }     from 'next'
import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { HeroSection }       from '@/components/home/HeroSection'
import { PaymentBrands }     from '@/components/home/PaymentBrands'
import { MarqueeBanner }     from '@/components/home/MarqueeBanner'
import { FeaturedProducts }  from '@/components/home/FeaturedProducts'
import { BrandStory }        from '@/components/home/BrandStory'
import { PriceTiers }        from '@/components/home/PriceTiers'
import { BuilderCTA }        from '@/components/home/BuilderCTA'
import { Testimonials }      from '@/components/home/Testimonials'
import { TrustBadges }       from '@/components/home/TrustBadges'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export const metadata: Metadata = {
  title:       'ICEKEY – Cold is the new gold | Bijoux Moissanite VVS Premium',
  description: 'Bijoux moissanite VVS certifiés GRA. Chaînes iced-out, pendentifs, bagues, montres. De €79 à €700+. Livraison express 4-7j en France.',
  keywords:    ['moissanite', 'iced out', 'chaîne moissanite', 'bijoux hip hop', 'VVS', 'chaîne cubaine', 'pendentif moissanite', 'bijoux rap'],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'ICEKEY',
  url: 'https://icekey.shop',
  logo: 'https://icekey.shop/logo.png',
  description: 'Bijoux moissanite VVS certifiés GRA. Chaînes, pendentifs, bagues, bracelets.',
  priceRange: '€€',
  servesCuisine: undefined,
  address: { '@type': 'PostalAddress', addressCountry: 'FR' },
  sameAs: ['https://www.instagram.com/icekey'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Collection ICEKEY',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Chaînes Moissanite VVS' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Pendentifs Moissanite' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Bagues Moissanite' } },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <HeroSection />

        {/* Logos paiement animés */}
        <PaymentBrands />

        {/* Marquee */}
        <MarqueeBanner />

        {/* 3 — Bestsellers avec onglets Chaînes / Pendentifs / Bagues / Montres */}
        <FeaturedProducts />

        {/* 4 — 3 personas + opportunité marché (dark) */}
        <BrandStory />

        {/* 5 — 5 tiers avec CTAs différenciées (dark) */}
        <PriceTiers />

        {/* 6 — Custom Pendant Builder (sur fond charcoal inset) */}
        <BuilderCTA />

        {/* 7 — 4 avis clients vérifiés */}
        <Testimonials />

        {/* 8 — 6 engagements : GRA · VVS · Livraison · Retour · Paiement */}
        <TrustBadges />

        {/* 9 — Newsletter -10% first order */}
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
