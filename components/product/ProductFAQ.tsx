import { ProductAccordion } from './ProductAccordion'

const FAQ_ITEMS = [
  {
    title:   "C'est quoi le moissanite ?",
    content: (
      <p>Une pierre certifiée VVS créée en laboratoire — même éclat qu&apos;un diamant, dureté 9.25 Mohs. Le flex sans le prix d&apos;une maison.</p>
    ),
  },
  {
    title:   'Ça passe les diamond tests ?',
    content: (
      <p>Oui, ça passe. Notre certification GRA le prouve — tu peux tester toi-même à la réception, on assume.</p>
    ),
  },
  {
    title:   'Ça va durer combien de temps ?',
    content: (
      <p>À vie. 9.25 Mohs de dureté, quasiment aussi résistant qu&apos;un diamant. Chaque pièce est livrée avec une garantie à vie.</p>
    ),
  },
  {
    title:   "Comment j'entretiens ma chaîne ?",
    content: (
      <p>Eau tiède + chiffon doux, c&apos;est tout ce qu&apos;il faut. Un guide d&apos;entretien complet est glissé dans ton colis.</p>
    ),
  },
  {
    title:   "Et si j'aime pas ?",
    content: (
      <p>30 jours pour changer d&apos;avis. Remboursement complet, aucune question posée. C&apos;est notre promesse.</p>
    ),
  },
]

export function ProductFAQ() {
  return (
    <section className="py-12 border-t border-white/[0.06]">
      <h2 className="font-serif text-2xl font-bold text-white/70 mb-2">
        Questions Fréquentes
      </h2>
      <p className="text-sm text-white/60 mb-6">Tout ce que tu dois savoir avant de sécuriser ta pièce.</p>
      <ProductAccordion items={FAQ_ITEMS} />
    </section>
  )
}
