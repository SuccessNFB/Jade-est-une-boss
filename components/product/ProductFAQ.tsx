import { ProductAccordion } from './ProductAccordion'

const FAQ_ITEMS = [
  {
    title:   'Quelle est la politique de retour ?',
    content: 'Vous disposez de 30 jours à compter de la réception pour nous retourner votre bijou, sans justification. Le retour est gratuit en France. Le remboursement est effectué sous 5 jours ouvrés.',
  },
  {
    title:   'La moissanite est-elle visible différemment du diamant ?',
    content: 'La moissanite a un indice de réfraction supérieur au diamant (2.65 vs 2.42), ce qui lui donne un éclat encore plus intense. À l\'œil nu, elle est indiscernable. Seul un testeur de pierre spécialisé peut faire la différence.',
  },
  {
    title:   'Quand vais-je recevoir ma commande ?',
    content: 'Les bijoux en stock sont expédiés sous 24–48h en colissimo suivi. Les pièces sur mesure nécessitent 7 à 10 jours ouvrés de fabrication avant expédition.',
  },
  {
    title:   'Où sont fabriqués vos bijoux ?',
    content: 'Nos bijoux sont fabriqués par des artisans joailliers partenaires certifiés. Chaque pierre moissanite est certifiée GRA (Gemological Research Association) avec son propre numéro de certificat.',
  },
  {
    title:   'Quels sont les frais d\'expédition ?',
    content: 'La livraison est offerte en France dès 100€ d\'achat. En dessous, les frais sont de 9.90€. Pour la Belgique, Suisse et Luxembourg : 14.90€. Pour le reste de l\'Europe : 19.90€.',
  },
  {
    title:   'Puis-je faire graver mon bijou ?',
    content: 'Oui, tous nos bijoux compatibles peuvent être gravés (jusqu\'à 20 caractères). Utilisez notre configurateur sur la page "Sur Mesure" ou ajoutez une note lors de votre commande.',
  },
]

export function ProductFAQ() {
  return (
    <section className="py-12 border-t border-gray-100">
      <h2 className="font-serif text-xl font-bold text-charcoal mb-6">
        Vous avez une question ?
      </h2>
      <ProductAccordion items={FAQ_ITEMS} />
    </section>
  )
}
