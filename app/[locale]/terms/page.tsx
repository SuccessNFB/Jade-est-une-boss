import type { Metadata }    from 'next'
import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente – ICEKEY',
}

const SECTIONS = [
  {
    title: 'Article 1 — Objet',
    content: `Les présentes Conditions Générales de Vente (CGV) régissent toute commande passée sur le site icekey.shop. Toute commande implique l'acceptation pleine et entière des présentes CGV.`,
  },
  {
    title: 'Article 2 — Produits',
    content: `Les bijoux ICEKEY sont fabriqués en argent 925 ou or 14k/18k, serties de pierres moissanite certifiées VVS GRA. Les caractéristiques essentielles de chaque produit sont décrites sur sa fiche. Les photographies sont représentatives mais peuvent varier légèrement de la réalité (reflets, colorimétrie d'écran).`,
  },
  {
    title: 'Article 3 — Prix',
    content: `Les prix sont indiqués en euros TTC. ICEKEY se réserve le droit de modifier ses prix à tout moment. Le prix applicable est celui affiché au moment de la commande. Les frais de livraison sont indiqués séparément avant validation de la commande.`,
  },
  {
    title: 'Article 4 — Commande',
    content: `La commande est définitive après validation du paiement. Un email de confirmation vous est adressé dans les minutes suivant la commande. ICEKEY se réserve le droit d'annuler toute commande en cas de suspicion de fraude ou d'erreur manifeste de prix.`,
  },
  {
    title: 'Article 5 — Paiement',
    content: `Le paiement s'effectue par carte bancaire (Visa, Mastercard, Amex), Apple Pay, Google Pay ou PayPal via la plateforme sécurisée Stripe. Les données bancaires ne transitent jamais par nos serveurs.`,
  },
  {
    title: 'Article 6 — Livraison',
    content: `Délai de traitement : 1–2 jours ouvrés. Livraison en France métropolitaine : 4–7 jours ouvrés (gratuite dès 100 €, 9,90 € en dessous). Europe : 7–12 jours ouvrés. En cas de retard imputable au transporteur, ICEKEY ne pourra être tenu responsable.`,
  },
  {
    title: 'Article 7 — Droit de rétractation',
    content: `Conformément à l'article L.221-18 du Code de la consommation, vous disposez de 30 jours à compter de la réception pour exercer votre droit de rétractation, sans justification. Les frais de retour sont à votre charge sauf en cas de produit défectueux.`,
  },
  {
    title: 'Article 8 — Garantie',
    content: `Tous les bijoux ICEKEY sont couverts par une garantie à vie contre les défauts de fabrication. La garantie légale de conformité (2 ans) s'applique. Sont exclus les dommages résultant d'un usage anormal, d'un accident ou d'un entretien inadapté.`,
  },
  {
    title: 'Article 9 — Données personnelles',
    content: `Le traitement de vos données personnelles est décrit dans notre politique de confidentialité disponible sur icekey.shop/privacy.`,
  },
  {
    title: 'Article 10 — Litiges',
    content: `En cas de litige, nous vous invitons à contacter notre service client à contact@icekey.shop. À défaut de résolution amiable, vous pouvez recourir à la médiation via la plateforme européenne de règlement en ligne des litiges (ec.europa.eu/odr). Le droit français est applicable.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-24">
        <div className="section-container max-w-3xl py-12">

          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Légal</p>
            <h1 className="font-serif text-4xl font-bold text-white mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-sm text-white/50">En vigueur depuis mai 2025</p>
          </div>

          <div className="space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-serif text-lg font-bold text-white mb-2">{s.title}</h2>
                <p className="text-sm text-white/70 leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-[#141414] border border-gray-100 text-center">
            <p className="text-sm text-white/60 mb-2">Service client</p>
            <a href="mailto:contact@icekey.shop" className="text-sm font-bold text-[#D4AF37] hover:underline">
              contact@icekey.shop
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
