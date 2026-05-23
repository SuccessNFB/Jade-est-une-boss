import type { Metadata }    from 'next'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Politique de confidentialité – ICEKEY',
}

const SECTIONS = [
  {
    title: '1. Qui sommes-nous ?',
    content: `ICEKEY (ci-après « nous ») est responsable du traitement de vos données personnelles collectées via le site icekey.shop. Pour toute question : contact@icekey.shop.`,
  },
  {
    title: '2. Données collectées',
    content: `Nous collectons les données que vous nous fournissez directement : nom, adresse email, adresse de livraison, numéro de téléphone lors d'une commande. Les données de paiement sont traitées directement par Stripe — nous n'avons jamais accès à vos coordonnées bancaires. Nous collectons également des données de navigation (cookies, adresse IP) à des fins analytiques.`,
  },
  {
    title: '3. Finalités du traitement',
    content: `Vos données sont utilisées pour : traiter et expédier vos commandes, vous envoyer la confirmation et le suivi de commande, vous adresser des communications marketing (avec votre consentement), améliorer notre service, et respecter nos obligations légales.`,
  },
  {
    title: '4. Base légale',
    content: `Exécution du contrat (commandes), intérêt légitime (amélioration du service, sécurité), consentement (newsletter, cookies analytiques), et obligation légale (facturation, comptabilité).`,
  },
  {
    title: '5. Partage des données',
    content: `Vos données peuvent être partagées avec nos prestataires : Stripe (paiement), Supabase (base de données), Resend (emails transactionnels), Vercel (hébergement), et les transporteurs pour la livraison. Ces prestataires agissent en qualité de sous-traitants et ne peuvent utiliser vos données à d'autres fins.`,
  },
  {
    title: '6. Durée de conservation',
    content: `Données de commande : 10 ans (obligations comptables). Données de compte : jusqu'à suppression du compte. Données de newsletter : jusqu'à désinscription. Cookies analytiques : 13 mois maximum.`,
  },
  {
    title: '7. Vos droits (RGPD)',
    content: `Vous disposez des droits d'accès, de rectification, d'effacement, de portabilité, de limitation et d'opposition. Pour exercer ces droits : contact@icekey.shop. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).`,
  },
  {
    title: '8. Cookies',
    content: `Nous utilisons des cookies strictement nécessaires (fonctionnement du site) et des cookies analytiques (Google Analytics 4 — avec anonymisation de l'IP). Vous pouvez refuser les cookies analytiques sans impact sur votre navigation.`,
  },
  {
    title: '9. Modifications',
    content: `Cette politique peut être mise à jour. La date de dernière révision est indiquée en bas de page. Votre utilisation continue du site après modification vaut acceptation.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20 pb-24">
        <div className="section-container max-w-3xl py-12">

          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Légal</p>
            <h1 className="font-serif text-4xl font-bold text-charcoal mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-sm text-charcoal/50">Dernière mise à jour : mai 2025</p>
          </div>

          <div className="space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-serif text-lg font-bold text-charcoal mb-2">{s.title}</h2>
                <p className="text-sm text-charcoal/70 leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-sm text-charcoal/60 mb-2">Une question sur vos données ?</p>
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
