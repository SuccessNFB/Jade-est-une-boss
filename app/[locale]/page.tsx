import type { Metadata }     from 'next'
import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { HeroSection }       from '@/components/home/HeroSection'
import { SocialProofBar }    from '@/components/home/SocialProofBar'
import { CategoryNav }       from '@/components/home/CategoryNav'
import { MarqueeBanner }     from '@/components/home/MarqueeBanner'
import { FeaturedProducts }  from '@/components/home/FeaturedProducts'
import { BrandStory }        from '@/components/home/BrandStory'
import { PriceTiers }        from '@/components/home/PriceTiers'
import { BuilderCTA }        from '@/components/home/BuilderCTA'
import { Testimonials }      from '@/components/home/Testimonials'
import { TrustBadges }       from '@/components/home/TrustBadges'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { PaymentBrands }     from '@/components/home/PaymentBrands'

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
        {/* 1 — Hero */}
        <HeroSection />

        {/* 2 — Social proof stats bar */}
        <SocialProofBar />

        {/* 3 — Marquee */}
        <MarqueeBanner />

        {/* 4 — Category circles navigation */}
        <CategoryNav />

        {/* 5 — Bestsellers avec onglets */}
        <FeaturedProducts />

        {/* 6 — Brand story + stats */}
        <BrandStory />

        {/* 7 — Price tiers */}
        <PriceTiers />

        {/* 8 — Custom Builder CTA */}
        <BuilderCTA />

        {/* 9 — Avis clients */}
        <Testimonials />

        {/* 10 — 6 engagements */}
        <TrustBadges />

        {/* 11 — Logos paiement */}
        <PaymentBrands />

        {/* 12 — Newsletter */}
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
