import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { PriceTiers } from '@/components/home/PriceTiers'
import { TrustBadges } from '@/components/home/TrustBadges'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ICEKEY – Bijoux Moissanite Premium | Cold is the new gold',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <PriceTiers />
        <TrustBadges />
      </main>
      <Footer />
    </>
  )
}
