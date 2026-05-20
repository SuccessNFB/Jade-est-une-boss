'use client'

import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProductAccordion } from '@/components/product/ProductAccordion'
import Link from 'next/link'

const careSections = [
  {
    icon: '🧼',
    title: 'Nettoyage',
    tagline: 'Keep it sparkling.',
    steps: [
      'Prépare un bol d\'eau tiède avec quelques gouttes de liquide vaisselle doux.',
      'Trempe ton bijou 2–3 minutes pour déloger les résidus.',
      'Frotte délicatement avec une brosse à dents à poils souples — insiste sur les chatons.',
      'Rince abondamment à l\'eau claire.',
      'Sèche doucement avec un chiffon microfibre propre. Ne frotte pas : tapote.',
    ],
    warning: 'Évite les nettoyeurs à ultrasons sur les montures en argent ou les bijoux pavés — les vibrations peuvent desserrer les pierres secondaires.',
  },
  {
    icon: '📦',
    title: 'Stockage',
    tagline: 'Store it right.',
    steps: [
      'Range chaque bijou dans sa pochette microfibre fournie.',
      'Stocke tes pièces séparément — la moissanite peut rayer d\'autres pierres (dureté 9,25).',
      'Évite les boîtes humides ou les salles de bain pour le stockage longue durée.',
      'Si tu empiles des bagues, place un tissu entre chaque pièce.',
    ],
    warning: null,
  },
]

const avoidItems = [
  {
    icon: '🧴',
    label: 'Produits chimiques',
    desc: 'Javel, détergents agressifs, parfum directement sur le bijou — ils attaquent les montures.',
  },
  {
    icon: '🏊',
    label: 'Piscine & mer',
    desc: 'Le chlore et le sel dégradent l\'or et l\'argent. Retire tes bijoux avant de nager.',
  },
  {
    icon: '🚿',
    label: 'Douche quotidienne',
    desc: 'L\'eau calcaire et les gels douche s\'accumulent et ternissent les montures avec le temps.',
  },
  {
    icon: '🏋️',
    label: 'Sport intense',
    desc: 'Chocs, transpiration et friction peuvent fatiguer les chatons. Range tes bijoux avant.',
  },
  {
    icon: '💤',
    label: 'Dormir avec',
    desc: 'Les chaînes peuvent s\'emmêler ou casser sous ton poids. On évite.',
  },
]

const careFAQItems = [
  {
    title: 'Ma moissanite peut-elle perdre son éclat avec le temps ?',
    content:
      "Non — c'est l'un des avantages majeurs de la moissanite sur le diamant de synthèse. Sa structure cristalline est ultra-stable. Elle ne se ternit pas et ne perd pas sa brillance. Un nettoyage régulier suffit à la maintenir comme au premier jour.",
  },
  {
    title: 'Mon bijou en argent noircit, c\'est normal ?',
    content:
      "Oui, c'est l'oxydation naturelle de l'argent sterling (925). C'est inoffensif et réversible. Un nettoyage rapide avec notre méthode eau tiède + chiffon microfibre suffit à retrouver l'éclat d'origine. Pour éviter ça, range ton bijou dans sa pochette et évite l'humidité.",
  },
  {
    title: 'Puis-je porter mon bijou ICEKEY à la mer ?',
    content:
      "On déconseille. Le sel marin est corrosif pour les métaux — or, argent, plaqué. Et le sable est abrasif. Ta moissanite s'en sortira impeccable, mais la monture peut en souffrir à terme. Range tes bijoux avant la plage — ou prends le risque, c'est ta vie.",
  },
  {
    title: 'Combien de fois dois-je nettoyer mon bijou ?',
    content:
      "Une fois par semaine si tu le portes quotidiennement, ou dès que tu remarques une perte d'éclat. Pour les bagues (plus exposées), un nettoyage rapide tous les 3–4 jours est idéal. Ça prend 5 minutes et ça change tout.",
  },
  {
    title: 'Mon bijou est endommagé, que faire ?',
    content:
      "Contacte-nous à contact@icekey.shop. On couvre les défauts de fabrication sous garantie (1 an monture, à vie sur la pierre). Si c'est un accident, on évalue le cas et on propose toujours une solution. On ne laisse pas tomber nos clients.",
  },
]

export default function CareGuidePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#E0F7FF] via-white to-[#F5F5F5] py-20 text-center">
          <div className="section-container relative z-10">
            <p className="text-ice-500 text-xs tracking-[0.35em] uppercase font-semibold mb-3">
              Prenez soin de votre éclat
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
              Guide d&apos;entretien
            </h1>
            <p className="text-charcoal/50 text-lg max-w-xl mx-auto">
              La moissanite est faite pour durer forever — à condition de lui donner un peu d&apos;amour.
              Voici comment garder ton bijou ICEKEY comme neuf, pour toujours.
            </p>
          </div>
        </section>

        {/* ── Care sections ── */}
        <section className="section-container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {careSections.map((section) => (
              <div key={section.title} className="bg-white rounded-2xl shadow-product p-8">
                <div className="text-4xl mb-4">{section.icon}</div>
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-1">{section.title}</h2>
                <p className="text-ice-500 text-xs font-semibold tracking-widest uppercase mb-5">
                  {section.tagline}
                </p>
                <ol className="space-y-3">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ice-100 text-ice-700 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-charcoal/70 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                {section.warning && (
                  <div className="mt-5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-amber-700 text-xs leading-relaxed">
                    ⚠️ {section.warning}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── What to avoid ── */}
        <section className="bg-[#F5F5F5] py-16">
          <div className="section-container">
            <div className="text-center mb-12">
              <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                À éviter absolument
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                Ce qui abîme tes bijoux
              </h2>
              <p className="text-charcoal/50 mt-2 max-w-md mx-auto">
                La moissanite survit à tout — mais la monture, elle, mérite qu&apos;on fasse attention.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {avoidItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-6 shadow-product hover:shadow-product-hover transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-charcoal mb-2">{item.label}</h3>
                  <p className="text-charcoal/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Care FAQ ── */}
        <section className="section-container py-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-ice-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                Questions fréquentes
              </p>
              <h2 className="font-serif text-3xl font-bold text-charcoal">
                FAQ entretien
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-product px-6">
              <ProductAccordion items={careFAQItems} />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-charcoal py-16">
          <div className="section-container text-center">
            <p className="text-ice-400 text-xs tracking-[0.35em] uppercase font-semibold mb-3">
              Ton éclat, forever.
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Des questions sur ton bijou ?
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              Notre équipe répond sous 24h. On est là pour que ton ICEKEY brille autant dans 10 ans que le premier jour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#00D9FF] text-charcoal font-semibold text-sm tracking-wide rounded-full hover:scale-[1.03] hover:shadow-ice transition-all duration-300"
              >
                Nous contacter
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/20 text-white font-semibold text-sm tracking-wide rounded-full hover:border-ice-500 hover:text-ice-400 transition-all duration-300"
              >
                Voir la FAQ complète
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
