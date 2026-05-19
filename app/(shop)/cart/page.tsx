import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartContent } from '@/components/checkout/CartContent'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mon Panier – ICEKEY' }

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="section-container py-12 max-w-4xl">
          <h1 className="font-serif text-3xl font-bold text-charcoal mb-10">Mon Panier</h1>
          <CartContent />
        </div>
      </main>
      <Footer />
    </>
  )
}
