import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Livraison & Retours – ICEKEY',
}

const frenchShipping = [
  {
    label: 'Standard',
    delay: '4–7 jours ouvrés',
    price: '9,90 €',
    note: 'Gratuite dès 100 €',
    highlight: false,
  },
  {
    label: 'Express',
    delay: '2–3 jours ouvrés',
    price: '15 €',
    note: 'Prioritaire, suivi inclus',
    highlight: false,
  },
  {
    label: 'Gratuite',
    delay: '4–7 jours ouvrés',
    price: '0 €',
    note: 'Commande ≥ 100 €',
    highlight: true,
  },
]

const internationalShipping = [
  { zone: 'Belgique · Suisse · Luxembourg', delay: '5–8 jours ouvrés', price: '14,90 €' },
  { zone: 'Reste de l\'Europe', delay: '7–12 jours ouvrés', price: '19,90 €' },
]

const guarantees = [
  {
    icon: '💎',
    title: 'Moissanite — Garantie à vie',
    body:
      "Nos pierres moissanite certifiées GRA ne se ternissent pas, ne perdent pas leur éclat. On les garantit à vie contre tout défaut de la pierre. Forever, c'est vraiment forever.",
  },
  {
    icon: '⚙️',
    title: 'Monture — Garantie 1 an',
    body:
      'Tes montures (or, argent, plaqué) sont couvertes 1 an contre tout défaut de fabrication. Chaton desserré, sertissage défaillant : on répare ou on remplace. No drama.',
  },
]

export default function ShippingPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="bg-[#F5F5F5] py-14 text-center">
          <div className="section-container">
            <p className="text-ice-500 text-xs tracking-[0.35em] uppercase font-semibold mb-3">
              Transparent, comme on aime
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3">
              Livraison & Retours
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Retour gratuit 30 jours · Livraison offerte dès 100 € · Suivi en temps réel.
              On s&apos;occupe de tout, de l&apos;atelier à ta porte.
            </p>
          </div>
        </section>

        {/* ── France shipping ── */}
        <section className="section-container py-16">
          <div className="mb-10">
            <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
              Livraison
            </p>
            <h2 className="font-serif text-3xl font-bold text-white">France métropolitaine</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {frenchShipping.map((option) => (
              <div
                key={option.label}
                className={`rounded-2xl p-7 transition-all duration-300 ${
                  option.highlight
                    ? 'bg-[#E0F7FF] border-2 border-ice-300 shadow-ice'
                    : 'bg-white shadow-product hover:shadow-product-hover hover:-translate-y-1'
                }`}
              >
                {option.highlight && (
                  <span className="inline-block bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide">
                    RECOMMANDÉ
                  </span>
                )}
                <h3 className="font-serif text-xl font-bold text-white mb-1">{option.label}</h3>
                <p className="text-2xl font-bold text-ice-600 mb-2">{option.price}</p>
                <p className="text-white/60 text-sm mb-1">{option.delay}</p>
                <p className="text-white/40 text-xs">{option.note}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/40 bg-[#F5F5F5] rounded-xl px-5 py-3 inline-block">
            ✦ Colissimo / Chronopost · Numéro de suivi envoyé par email dès l&apos;expédition
          </p>
        </section>

        {/* ── International ── */}
        <section className="bg-[#F5F5F5] py-16">
          <div className="section-container">
            <div className="mb-8">
              <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                International
              </p>
              <h2 className="font-serif text-3xl font-bold text-white">Europe & reste du monde</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-product">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 font-semibold text-white/50">Zone</th>
                    <th className="px-6 py-4 font-semibold text-white text-center">Délai estimé</th>
                    <th className="px-6 py-4 font-semibold text-white text-center">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {internationalShipping.map((row) => (
                    <tr key={row.zone} className="hover:bg-[#141414] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{row.zone}</td>
                      <td className="px-6 py-4 text-white/60 text-center">{row.delay}</td>
                      <td className="px-6 py-4 text-ice-700 font-semibold text-center">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-3">
              Les délais sont indicatifs. Les droits de douane éventuels sont à la charge du destinataire.
            </p>
          </div>
        </section>

        {/* ── Return policy ── */}
        <section className="section-container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                On a confiance en nos produits
              </p>
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                Politique de retour
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: '📅',
                    title: '30 jours pour changer d\'avis',
                    body: 'Tu as 30 jours à partir de la réception pour nous retourner ton bijou — sans justification, sans drama.',
                  },
                  {
                    icon: '🚚',
                    title: 'Retour gratuit en France',
                    body: "En France métropolitaine, on prend en charge les frais de retour. On t'envoie une étiquette prépayée.",
                  },
                  {
                    icon: '💳',
                    title: 'Remboursement sous 5 jours',
                    body: "Dès réception et vérification de ton retour, le remboursement est traité sous 5 jours ouvrés sur ta carte ou via PayPal.",
                  },
                  {
                    icon: '✍️',
                    title: 'Bijoux personnalisés',
                    body: 'Les pièces avec gravure ou sur mesure ne sont pas retournables — mais on t\'en informe clairement avant ta commande.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Guarantees ── */}
            <div className="space-y-5">
              <div>
                <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                  Nos garanties
                </p>
                <h2 className="font-serif text-3xl font-bold text-white mb-6">Built to last.</h2>
              </div>
              {guarantees.map((g) => (
                <div key={g.title} className="bg-[#E0F7FF] rounded-2xl p-6">
                  <div className="text-3xl mb-3">{g.icon}</div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">{g.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tracking ── */}
        <section className="bg-charcoal py-16">
          <div className="section-container text-center">
            <p className="text-ice-400 text-xs tracking-[0.35em] uppercase font-semibold mb-3">
              Zéro stress post-achat
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Ton colis, tracé en temps réel.
            </h2>
            <p className="text-white/70 max-w-lg mx-auto mb-8">
              Dès l&apos;expédition, tu reçois un email avec ton numéro de suivi Colissimo ou Chronopost.
              Tu sais exactement où est ton bijou — à chaque étape.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#D4AF37] text-white font-semibold text-sm tracking-wide rounded-full hover:scale-[1.03] hover:shadow-ice transition-all duration-300"
            >
              Commander maintenant →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
