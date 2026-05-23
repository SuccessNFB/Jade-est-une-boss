'use client'

import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ProductAccordion } from '@/components/product/ProductAccordion'
import Link from 'next/link'

const faqCategories = [
  {
    category: 'Matière',
    emoji: '💎',
    tagline: 'What it is, for real.',
    items: [
      {
        title: "Qu'est-ce que le moissanite ?",
        content:
          "La moissanite est une pierre précieuse créée en laboratoire, composée de carbure de silicium (SiC). Découverte en 1893 dans une météorite par le Dr Henri Moissan, elle est aujourd'hui synthétisée en labo pour une qualité parfaite et constante. Plus brillante que le diamant, presque aussi dure, et 100 % éthique — c'est littéralement la pierre du futur.",
      },
      {
        title: 'Quelle est la différence avec un diamant ?',
        content:
          "La moissanite a un indice de réfraction de 2,65 contre 2,42 pour le diamant — ce qui la rend encore plus étincelante sous la lumière. Sa dureté est de 9,25 sur l'échelle de Mohs (contre 10 pour le diamant), ce qui la rend pratiquement inrayable. Et côté prix ? Environ 10 à 15 fois moins chère pour une qualité visuelle supérieure. Le choix est vite fait.",
      },
      {
        title: 'Ça passe les tests de diamant ?',
        content:
          "Oui — et c'est là où ça devient intéressant. Les testeurs de diamant classiques (résistance thermique) classifient la moissanite comme un diamant, car leurs propriétés thermiques sont quasi identiques. Pour la différencier, il faut un testeur spécialisé moissanite/diamant. En clair : visuellement et techniquement, la ressemblance est totale.",
      },
      {
        title: 'Comment est-elle certifiée ?',
        content:
          "Chaque pierre ICEKEY est certifiée GRA (Gemological Research Association) — le standard international pour la moissanite. Le certificat inclut la taille, le poids en carats, la clarté, la couleur et l'authenticité. Il t'est envoyé avec ta commande. Forever authenticated.",
      },
    ],
  },
  {
    category: 'Durabilité',
    emoji: '⚡',
    tagline: 'Built to last forever.',
    items: [
      {
        title: 'Combien de temps ça dure ?',
        content:
          "Pour toujours — et c'est pas du marketing. La moissanite a une dureté de 9,25 Mohs, ce qui en fait l'une des pierres les plus résistantes au monde. Elle ne se ternit pas, ne se raye pas au quotidien et conserve son éclat indéfiniment. On offre d'ailleurs une garantie à vie sur nos pierres moissanite.",
      },
      {
        title: 'Comment entretenir ma chaîne ou mon bijou ?',
        content:
          "C'est simple : un peu d'eau tiède, du liquide vaisselle doux et une brosse douce (type brosse à dents souple). Rincer, sécher avec un chiffon microfibre. Évite les ultrasons sur les montures en argent ou les bijoux avec des pavés. Range ton bijou dans la pochette microfibre fournie, séparé des autres pièces. C'est tout.",
      },
      {
        title: "Et si ma monture s'abîme ?",
        content:
          "Ta moissanite est garantie à vie — et ta monture est couverte 1 an contre tout défaut de fabrication. Si tu constates un problème, contacte-nous à contact@icekey.shop. On s'occupe de tout. We got you.",
      },
    ],
  },
  {
    category: 'Livraison & Retour',
    emoji: '📦',
    tagline: 'On assure jusqu\'au bout.',
    items: [
      {
        title: 'Quels sont les délais de livraison ?',
        content:
          "En France : livraison standard en 4–7 jours ouvrés (9,90 €, gratuite dès 100 €) ou express en 2–3 jours ouvrés (15 €). Pour la Belgique, la Suisse et le Luxembourg : 14,90 € en 5–8 jours. Pour le reste de l'Europe : 19,90 € en 7–12 jours. Dès l'expédition, tu reçois un email avec ton numéro de suivi. Zero stress.",
      },
      {
        title: 'Puis-je retourner mon bijou ?',
        content:
          "Absolument. Tu as 30 jours à partir de la réception pour nous retourner ton bijou, sans avoir à te justifier. En France, le retour est gratuit — on prend en charge les frais. Dès réception, le remboursement est traité sous 5 jours ouvrés. Bijoux personnalisés (gravure) non retournables — mais on t'en informe clairement avant l'achat.",
      },
      {
        title: 'Et si je ne suis pas satisfait ?',
        content:
          "On existe pour que tu sois fier(e) de porter ICEKEY. Si pour une raison ou une autre tu n'es pas satisfait(e), écris-nous à contact@icekey.shop ou via le formulaire contact. On trouve toujours une solution — échange, avoir, remboursement. Your satisfaction, our priority. Always.",
      },
    ],
  },
  {
    category: 'Personnalisation',
    emoji: '✍️',
    tagline: 'Make it yours.',
    items: [
      {
        title: 'Vous proposez la gravure ?',
        content:
          "Oui ! La gravure est disponible sur une sélection de pièces — bagues, pendentifs, plaques. Tu peux graver un prénom, une date, des initiales ou un message court (jusqu'à 20 caractères selon le modèle). Précise ta demande dans les notes lors de la commande ou contacte-nous avant. Prévoir 2–3 jours ouvrés supplémentaires.",
      },
      {
        title: 'Peut-on créer un bijou sur mesure ?',
        content:
          "On adore les projets sur mesure. Utilise notre Builder ou contacte-nous directement avec ta vision (taille, métal, forme de pierre, type de bijou). On te revient avec une proposition sous 48h. Sur mesure n'est pas synonyme de hors de prix chez ICEKEY — on reste honnêtes sur les coûts.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="bg-[#F5F5F5] py-16 text-center">
          <div className="section-container">
            <p className="text-ice-500 text-xs tracking-[0.35em] uppercase font-semibold mb-3">
              Toutes vos questions
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white/70 mb-4">
              FAQ — On répond à tout.
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Moissanite, livraison, entretien, retours — on n&apos;a rien à cacher.
              Your peace of mind, guaranteed.
            </p>
          </div>
        </section>

        {/* ── FAQ Content ── */}
        <section className="section-container py-16">
          <div className="max-w-3xl mx-auto space-y-14">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-charcoal">{cat.category}</h2>
                    <p className="text-ice-500 text-xs font-semibold tracking-widest uppercase">
                      {cat.tagline}
                    </p>
                  </div>
                </div>
                <div className="bg-[#141414] rounded-2xl shadow-card px-6">
                  <ProductAccordion items={cat.items} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Still got questions CTA ── */}
        <section className="bg-[#E0F7FF] py-16">
          <div className="section-container text-center">
            <h2 className="font-serif text-3xl font-bold text-white/70 mb-3">
              Toujours une question ?
            </h2>
            <p className="text-white/65 mb-8 max-w-md mx-auto">
              Notre équipe répond sous 24h, du lundi au vendredi. On est là.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#D4AF37] text-white/70 font-semibold text-sm tracking-wide rounded-full hover:scale-[1.03] hover:shadow-ice transition-all duration-300"
              >
                Nous contacter
              </Link>
              <Link
                href="/shop"
                className="btn-ghost"
              >
                Voir la collection
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
