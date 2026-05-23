import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PendantBuilder } from '@/components/builder/PendantBuilder'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:       'Créer mon bijou sur mesure – ICEKEY',
  description: 'Configurez votre pendentif moissanite en quelques clics. Choix du métal, taille, couleur, gravure.',
}

export default function BuilderPage() {
  return (
    <>
      <Header />
      <main className="pt-28">
        <div className="section-container py-12">
          {/* Hero */}
          <div className="text-center mb-14">
            <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Configurateur
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Votre bijou, vos règles
            </h1>
            <p className="text-white/50 max-w-lg mx-auto">
              Composez un pendentif unique en choisissant la pierre, le métal et en ajoutant une gravure personnelle.
            </p>
          </div>
          <PendantBuilder />
        </div>
      </main>
      <Footer />
    </>
  )
}
