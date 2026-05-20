import { ProductAccordion } from './ProductAccordion'

const FAQ_ITEMS = [
  {
    title:   "C'est quoi le moissanite ?",
    content: (
      <p>Lab-created brilliance. Sparkles like diamonds. Built forever. VVS certified.</p>
    ),
  },
  {
    title:   'Ça passe les diamond tests ?',
    content: (
      <p>Yes. Our VVS certification proves it&apos;s real moissanite.</p>
    ),
  },
  {
    title:   'Ça va durer combien de temps ?',
    content: (
      <p>Forever. 9.25 Mohs hardness. Lifetime guarantee.</p>
    ),
  },
  {
    title:   "Comment j'entretiens ma chaîne ?",
    content: (
      <p>Warm water + soft cloth. Care guide included.</p>
    ),
  },
  {
    title:   "Et si j'aime pas ?",
    content: (
      <p>30 days, full refund. No questions asked.</p>
    ),
  },
]

export function ProductFAQ() {
  return (
    <section className="py-12 border-t border-gray-100">
      <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">
        Questions Fréquentes
      </h2>
      <p className="text-sm text-charcoal/50 mb-6">Tout ce que tu dois savoir avant de sécuriser ta pièce.</p>
      <ProductAccordion items={FAQ_ITEMS} />
    </section>
  )
}
