import { ProductAccordion } from './ProductAccordion'

const FAQ_ITEMS = [
  {
    title:   "C'est quoi le moissanite ?",
    content: (
      <p>
        Lab-created brilliance that sparkles brighter than diamonds. Durable, ethical, and built to last forever.
        Same sparkle, fraction of the cost — and a conscience that's crystal clear.
      </p>
    ),
  },
  {
    title:   'Ça passe les diamond tests ?',
    content: (
      <p>
        Moissanite passes 99% of diamond tests because it&apos;s <em>that</em> close.
        Notre certification VVS prouve que c&apos;est le vrai deal. Brillance : 2.65 (vs 2.42 pour le diamant).
      </p>
    ),
  },
  {
    title:   'Ça va durer combien de temps ?',
    content: (
      <p>
        Forever. 9.25 sur l&apos;échelle de Mohs (les diamants sont à 10). Ton flex est fait pour durer une vie.
        C&apos;est exactement pour ça qu&apos;on le garantit à vie.
      </p>
    ),
  },
  {
    title:   "Comment j'entretiens ma chaîne ?",
    content: (
      <p>
        Easy. Eau tiède + chiffon doux chaque semaine. Évite les produits chimiques agressifs.
        On t&apos;inclut un guide d&apos;entretien + un chiffon microfibre dans chaque commande.
      </p>
    ),
  },
  {
    title:   "Et si j'aime pas ?",
    content: (
      <p>
        30 jours, remboursement complet, sans questions. On est <em>tellement</em> confiants que tu vas adorer.
        Si c&apos;est pas le cas — on te rembourse direct. We got you.
      </p>
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
