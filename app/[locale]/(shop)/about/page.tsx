import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notre histoire – ICEKEY Bijoux Moissanite',
}

const comparisonRows = [
  {
    label: 'Brillance (indice réfraction)',
    diamond: '2.42',
    moissanite: '2.65 ✦',
    gold9k: 'N/A',
  },
  {
    label: 'Dureté (Mohs)',
    diamond: '10',
    moissanite: '9.25 ✦',
    gold9k: '2.5',
  },
  {
    label: 'Prix (1 carat)',
    diamond: '~5 000 €',
    moissanite: '~300 € ✦',
    gold9k: '~50 €/g',
  },
  {
    label: 'Éthique & Origine',
    diamond: 'Mines controversées',
    moissanite: 'Synthèse en labo ✦',
    gold9k: 'Variable',
  },
  {
    label: 'Certification',
    diamond: 'GIA / HRD',
    moissanite: 'GRA / IGI ✦',
    gold9k: 'Poinçon',
  },
]

const values = [
  {
    title: 'Sourcing Éthique',
    tagline: 'Zero guilt, full ice.',
    body:
      'Chaque pierre naît en laboratoire — aucune mine, aucun conflit, aucun compromis. Notre moissanite GRA est tracée du four au bijou, pour que ton éclat soit 100 % clean.',
    icon: '🌱',
  },
  {
    title: 'Qualité Premium',
    tagline: 'Built to outlast everything.',
    body:
      'Dureté 9,25 Mohs. Brillance supérieure au diamant. Chaque pièce passe par un contrôle qualité strict avant de partir chez toi. Pas de compromis sur le "forever".',
    icon: '💎',
  },
  {
    title: 'Prix Accessible',
    tagline: 'Your flex, honest price.',
    body:
      'Le luxe ne devrait pas coûter un loyer. On coupe les intermédiaires pour te donner le meilleur rapport éclat/euro du marché — certifié, pas bradé.',
    icon: '✦',
  },
]

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-charcoal via-[#1a1a2e] to-[#16213e] min-h-[480px] flex items-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,217,255,0.15),transparent_60%)]" />
          <div className="section-container relative z-10 py-24 text-center">
            <p className="text-ice-400 text-xs tracking-[0.35em] uppercase font-semibold mb-4">
              Notre histoire
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Briller sans <span className="text-gradient-ice">compromis</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              ICEKEY est né d&apos;une conviction simple : le luxe ne devrait pas coûter une fortune ni une conscience.
              La moissanite change tout — et on est là pour te le prouver.
            </p>
          </div>
        </section>

        {/* ── Origin story ── */}
        <section className="section-container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                2024 — Paris
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white/70 mb-6 leading-snug">
                On en avait marre du luxe inaccessible.
              </h2>
              <p className="text-white/65 leading-relaxed mb-4">
                L&apos;idée d&apos;ICEKEY est née dans un appartement parisien, en regardant les prix des bijoux de luxe
                avec l&apos;impression que l&apos;éclat était réservé à ceux qui pouvaient se le permettre.
              </p>
              <p className="text-white/65 leading-relaxed mb-4">
                Puis on a découvert la moissanite — une pierre créée en laboratoire, plus brillante que le diamant,
                presque aussi dure, éthique par nature et accessible. Un game-changer.
              </p>
              <p className="text-white/65 leading-relaxed">
                On a tout misé dessus. ICEKEY est né. <span className="text-charcoal font-semibold">Cold is the new gold.</span>
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-charcoal to-[#1a1a2e] flex items-center justify-center shadow-ice-lg">
                <div className="text-center">
                  <div className="text-[80px] mb-4">💎</div>
                  <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Moissanite</p>
                  <p className="text-ice-400 font-serif text-2xl font-bold mt-1">GRA Certified</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-ice-500/20 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-ice-500/10 blur-2xl" />
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="bg-[#F5F5F5] py-20">
          <div className="section-container">
            <div className="text-center mb-12">
              <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                La vérité sur les pierres
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                Pourquoi Moissanite ?
              </h2>
              <p className="text-white/60 mt-3 max-w-xl mx-auto">
                Les chiffres parlent d&apos;eux-mêmes. Compare et décide par toi-même.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-card">
              <table className="w-full bg-[#0E0F16] text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-6 py-4 font-semibold text-white/60 w-1/4">Critère</th>
                    <th className="px-6 py-4 font-semibold text-white/70 text-center">Diamant</th>
                    <th className="px-6 py-4 font-bold text-ice-600 text-center bg-[#E0F7FF]">
                      Moissanite ✦
                    </th>
                    <th className="px-6 py-4 font-semibold text-white/70 text-center">Or 9K</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="hover:bg-[#0A0B12] transition-colors">
                      <td className="px-6 py-4 font-medium text-charcoal">{row.label}</td>
                      <td className="px-6 py-4 text-white/65 text-center">{row.diamond}</td>
                      <td className="px-6 py-4 text-ice-700 font-semibold text-center bg-[#E0F7FF]">
                        {row.moissanite}
                      </td>
                      <td className="px-6 py-4 text-white/65 text-center">{row.gold9k}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-xs text-white/70 mt-4">
              ✦ = meilleur de sa catégorie selon les critères objectifs du marché
            </p>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="section-container py-20">
          <div className="text-center mb-12">
            <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Ce qu&apos;on défend
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Nos valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-[#0E0F16] rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white/70 mb-1">{val.title}</h3>
                <p className="text-ice-500 text-xs font-semibold tracking-wider uppercase mb-4">
                  {val.tagline}
                </p>
                <p className="text-white/65 text-sm leading-relaxed">{val.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#E0F7FF] py-20">
          <div className="section-container text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white/70 mb-4">
              Prêt à briller autrement ?
            </h2>
            <p className="text-white/65 mb-8 max-w-lg mx-auto">
              Explore notre collection et trouve la pièce qui te ressemble.
              Éthique, premium, accessible. Forever.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#00D9FF] text-white/70 font-semibold text-sm tracking-wide rounded-full hover:scale-[1.03] hover:shadow-ice transition-all duration-300"
            >
              Découvrir la collection →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
