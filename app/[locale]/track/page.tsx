import type { Metadata }    from 'next'
import Link                from 'next/link'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { Package, Mail, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Suivi de commande – ICEKEY',
}

const STEPS = [
  { icon: Clock,   title: 'Commande confirmée',    desc: 'Email de confirmation envoyé immédiatement après le paiement.' },
  { icon: Package, title: 'Préparation',            desc: '1–2 jours ouvrés. Ta pièce est vérifiée et emballée avec soin.' },
  { icon: MapPin,  title: 'Expédition & suivi',     desc: 'Tu reçois un email avec ton numéro de suivi dès l\'envoi.' },
  { icon: Package, title: 'Livraison',              desc: '4–7 jours ouvrés en France. 7–12 jours en Europe.' },
]

export default function TrackPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20 pb-24">
        <div className="section-container max-w-2xl py-12">

          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-5">
              <Package className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Livraison</p>
            <h1 className="font-serif text-4xl font-bold text-white mb-4">
              Suivi de commande
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Tu as passé commande ? Voilà comment ça se passe.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mb-12">
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gray-100" />
            <div className="space-y-6">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="flex gap-5">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#1A1A1A] border-2 border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="pt-1.5">
                    <p className="text-sm font-bold text-white mb-0.5">
                      <span className="text-[#D4AF37] mr-2 font-black">{String(i + 1).padStart(2, '0')}</span>
                      {title}
                    </p>
                    <p className="text-sm text-white/55">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="rounded-2xl bg-[#141414] border border-gray-100 p-8 text-center">
            <Mail className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <h2 className="font-serif text-lg font-bold text-white mb-2">
              Tu n&apos;as pas reçu ton numéro de suivi ?
            </h2>
            <p className="text-sm text-white/55 mb-5">
              Écris-nous avec ton numéro de commande, on te répond sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] text-white font-bold text-sm hover:bg-[#E8C572] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
              >
                Nous contacter
              </Link>
              <a
                href="mailto:contact@icekey.shop"
                className="text-sm font-semibold text-white/50 hover:text-white transition-colors"
              >
                contact@icekey.shop
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-white/30 mt-8">
            Tu as un compte ICEKEY ?{' '}
            <Link href="/account" className="text-[#D4AF37] hover:underline font-semibold">
              Consulte tes commandes →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
