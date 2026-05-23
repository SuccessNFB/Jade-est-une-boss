import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Livraison & Retours – ICEKEY',
}

const frenchShipping = [
  {
    label:     'Standard',
    delay:     '4–7 jours ouvrés',
    price:     '9,90 €',
    note:      'Gratuite dès 100 €',
    highlight: false,
  },
  {
    label:     'Express',
    delay:     '2–3 jours ouvrés',
    price:     '15 €',
    note:      'Prioritaire · suivi inclus',
    highlight: false,
  },
  {
    label:     'Gratuite',
    delay:     '4–7 jours ouvrés',
    price:     '0 €',
    note:      'Commande ≥ 100 €',
    highlight: true,
  },
]

const internationalShipping = [
  { zone: 'Belgique · Suisse · Luxembourg', delay: '5–8 jours ouvrés',   price: '14,90 €' },
  { zone: 'Reste de l\'Europe',              delay: '7–12 jours ouvrés',  price: '19,90 €' },
]

const returnPolicy = [
  {
    title: '30 jours pour changer d\'avis',
    body:  'Tu as 30 jours à partir de la réception pour nous retourner ton bijou, sans justification et sans drama.',
  },
  {
    title: 'Retour gratuit en France',
    body:  'En France métropolitaine, on prend en charge les frais de retour. On t\'envoie une étiquette prépayée.',
  },
  {
    title: 'Remboursement sous 5 jours',
    body:  'Dès réception et vérification de ton retour, le remboursement est traité sous 5 jours ouvrés sur ta carte ou via PayPal.',
  },
  {
    title: 'Bijoux personnalisés',
    body:  'Les pièces avec gravure ou sur mesure ne sont pas retournables. On t\'en informe clairement avant ta commande.',
  },
]

const guarantees = [
  {
    title: 'Moissanite — Garantie à vie',
    body:  'Nos pierres moissanite certifiées GRA ne se ternissent jamais. Garantie à vie contre tout défaut de la pierre, sans condition.',
  },
  {
    title: 'Monture — Garantie 1 an',
    body:  'Tes montures (or, argent, plaqué) sont couvertes 1 an contre tout défaut de fabrication. Chaton desserré, sertissage défaillant : on répare ou on remplace.',
  },
]

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-24" style={{ background: '#0A0A0A' }}>

        {/* Hero */}
        <section className="py-16 text-center" style={{ background: '#121210', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="section-container">
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase mb-4" style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}>
              Transparent, comme on aime
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Livraison &amp; Retours
            </h1>
            <p className="text-white/55 text-base max-w-xl mx-auto leading-relaxed">
              Retour gratuit 30 jours · Livraison offerte dès 100 € · Suivi en temps réel.
            </p>
          </div>
        </section>

        {/* France shipping */}
        <section className="section-container py-14">
          <div className="mb-10">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}>
              Livraison
            </p>
            <h2 className="font-serif text-3xl font-bold text-white">France métropolitaine</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {frenchShipping.map((option) => (
              <div
                key={option.label}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{
                  background: option.highlight ? 'rgba(212,175,55,0.07)' : '#141414',
                  border: option.highlight ? '1.5px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {option.highlight && (
                  <span
                    className="inline-block text-[10px] font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase"
                    style={{ background: '#D4AF37', color: '#0A0A0A', fontFamily: 'var(--font-space-mono), monospace' }}
                  >
                    Recommandé
                  </span>
                )}
                <h3 className="font-serif text-xl font-bold text-white mb-1">{option.label}</h3>
                <p
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}
                >
                  {option.price}
                </p>
                <p className="text-white/60 text-sm mb-1">{option.delay}</p>
                <p className="text-white/40 text-xs">{option.note}</p>
              </div>
            ))}
          </div>

          <p
            className="text-xs text-white/40 rounded-xl px-5 py-3 inline-block"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            ✦ Colissimo / Chronopost · Numéro de suivi envoyé par email dès l&apos;expédition
          </p>
        </section>

        {/* International */}
        <section className="py-14" style={{ background: '#121210', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="section-container">
            <div className="mb-8">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}>
                International
              </p>
              <h2 className="font-serif text-3xl font-bold text-white">Europe &amp; reste du monde</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                    <th className="text-left px-6 py-4 font-semibold text-white/50">Zone</th>
                    <th className="px-6 py-4 font-semibold text-white/70 text-center">Délai estimé</th>
                    <th className="px-6 py-4 font-semibold text-white/70 text-center">Tarif</th>
                  </tr>
                </thead>
                <tbody>
                  {internationalShipping.map((row, i) => (
                    <tr
                      key={row.zone}
                      style={{ borderBottom: i < internationalShipping.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                    >
                      <td className="px-6 py-4 font-medium text-white">{row.zone}</td>
                      <td className="px-6 py-4 text-white/55 text-center">{row.delay}</td>
                      <td className="px-6 py-4 font-bold text-center" style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/35 mt-3">
              Les délais sont indicatifs. Les droits de douane éventuels sont à la charge du destinataire.
            </p>
          </div>
        </section>

        {/* Return policy + Guarantees */}
        <section className="section-container py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Return policy */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}>
                On a confiance en nos produits
              </p>
              <h2 className="font-serif text-3xl font-bold text-white mb-8">Politique de retour</h2>
              <div className="space-y-6">
                {returnPolicy.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div
                      className="w-1 flex-shrink-0 rounded-full mt-1"
                      style={{ background: 'rgba(212,175,55,0.4)', minHeight: '40px' }}
                    />
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2" style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}>
                Nos garanties
              </p>
              <h2 className="font-serif text-3xl font-bold text-white mb-8">Fait pour durer.</h2>
              <div className="space-y-4">
                {guarantees.map((g) => (
                  <div
                    key={g.title}
                    className="rounded-2xl p-6"
                    style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}
                  >
                    <h3 className="font-serif text-base font-bold text-white mb-2">{g.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{g.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tracking CTA */}
        <section className="py-14" style={{ background: '#121210', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="section-container text-center">
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase mb-3" style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}>
              Zéro stress post-achat
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Ton colis, tracé en temps réel.
            </h2>
            <p className="text-white/55 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
              Dès l&apos;expédition, tu reçois un email avec ton numéro de suivi Colissimo ou Chronopost.
              Tu sais exactement où est ton bijou à chaque étape.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:brightness-110"
              style={{ background: '#D4AF37', color: '#0A0A0A' }}
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
