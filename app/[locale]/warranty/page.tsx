import type { Metadata }    from 'next'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { Shield, CheckCircle, X } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Garantie à vie – ICEKEY',
}

const COVERED = [
  'Défauts de fabrication',
  'Problèmes de sertissage (pierres qui bougent)',
  'Défauts du métal (fissures, ruptures)',
  'Décoloration anormale du métal',
  'Fermoir défectueux',
]

const NOT_COVERED = [
  'Dommages causés par un choc ou une chute',
  'Usure normale',
  'Perte ou vol',
  'Dommages causés par des produits chimiques',
  'Modifications par un tiers',
]

export default function WarrantyPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20 pb-24">
        <div className="section-container max-w-3xl py-12">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-5">
              <Shield className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Notre promesse</p>
            <h1 className="font-serif text-4xl font-bold text-white mb-4">
              Garantie à vie
            </h1>
            <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
              Chaque pièce ICEKEY est garantie à vie contre les défauts de fabrication. Parce qu&apos;on construit pour durer.
            </p>
          </div>

          {/* Coverage grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
              <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Ce qui est couvert
              </h2>
              <ul className="space-y-2.5">
                {COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#141414]/50 p-6">
              <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
                <X className="w-5 h-5 text-white/30" />
                Ce qui n&apos;est pas couvert
              </h2>
              <ul className="space-y-2.5">
                {NOT_COVERED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                    <X className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to claim */}
          <div className="rounded-2xl border border-gray-100 p-8 mb-8">
            <h2 className="font-serif text-xl font-bold text-white mb-6">Comment faire jouer la garantie</h2>
            <div className="space-y-5">
              {[
                { step: '01', title: 'Contacte-nous', desc: 'Envoie un email à contact@icekey.shop avec ton numéro de commande et des photos du problème.' },
                { step: '02', title: 'On valide', desc: 'Notre équipe examine ta demande sous 48h ouvrées et te confirme si le défaut est couvert.' },
                { step: '03', title: 'Retour & remplacement', desc: 'On te fournit une étiquette retour gratuite. La pièce est réparée ou remplacée, expédiée sous 5–7 jours.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-black text-[#D4AF37]">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">{title}</p>
                    <p className="text-sm text-white/60">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href="mailto:contact@icekey.shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#D4AF37] text-white font-bold text-sm hover:bg-[#E8C572] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
            >
              Contacter le support garantie
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
