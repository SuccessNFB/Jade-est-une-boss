import type { Metadata }        from 'next'
import { AnnouncementBar }      from '@/components/layout/AnnouncementBar'
import { Header }               from '@/components/layout/Header'
import { Footer }               from '@/components/layout/Footer'
import { HeroSection }          from '@/components/home/HeroSection'
import { MarqueeBanner }        from '@/components/home/MarqueeBanner'
import { FeaturedProducts }     from '@/components/home/FeaturedProducts'
import { BrandStory }           from '@/components/home/BrandStory'
import { PriceTiers }           from '@/components/home/PriceTiers'
import { BuilderCTA }           from '@/components/home/BuilderCTA'
import { Testimonials }         from '@/components/home/Testimonials'
import { TrustBadges }          from '@/components/home/TrustBadges'
import { NewsletterSection }    from '@/components/home/NewsletterSection'

export const metadata: Metadata = {
  title:       'ICEKEY – Bijoux Moissanite Premium | Cold is the new gold',
  description: 'Bijoux en moissanite certifiée GRA. 350+ créations, de €79 à €700+. Livraison offerte en France.',
}

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        {/* 1 — Hero plein écran animé */}
        <HeroSection />

        {/* 2 — Défilé de promesses de marque */}
        <MarqueeBanner />

        {/* 3 — Bestsellers avec onglets catégories */}
        <FeaturedProducts />

        {/* 4 — Pourquoi la moissanite ICEKEY */}
        <BrandStory />

        {/* 5 — 5 gammes de prix */}
        <PriceTiers />

        {/* 6 — CTA configurateur sur mesure */}
        <BuilderCTA />

        {/* 7 — Avis clients vérifiés */}
        <Testimonials />

        {/* 8 — Engagements & certifications */}
        <TrustBadges />

        {/* 9 — Newsletter -10% */}
        <NewsletterSection />
      </main>

      <Footer />
    </>
  )
}
