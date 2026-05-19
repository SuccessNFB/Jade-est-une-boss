import Link from 'next/link'
import { Diamond, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Diamond className="w-5 h-5 text-ice-400" fill="currentColor" />
              <span className="font-serif text-xl font-bold tracking-widest text-white">ICEKEY</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Bijoux en moissanite certifiés. Chaque pièce est conçue pour durer une vie, à un prix qui respecte la vôtre.
            </p>
            <p className="mt-4 text-xs font-semibold tracking-widest text-ice-400">
              COLD IS THE NEW GOLD
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-ice-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-ice-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['Bagues',      '/shop?cat=ring'],
                ['Colliers',    '/shop?cat=necklace'],
                ['Pendentifs',  '/shop?cat=pendant'],
                ['Bracelets',   '/shop?cat=bracelet'],
                ['Boucles',     '/shop?cat=earring'],
                ['Sur Mesure',  '/builder'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-ice-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Informations</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['À propos',          '/about'],
                ['Certification',     '/certification'],
                ['Livraison & Retour','/shipping'],
                ['Contact',           '/contact'],
                ['Mentions légales',  '/legal'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-ice-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} ICEKEY. Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <span>Paiement sécurisé Stripe</span>
            <span>·</span>
            <span>Livraison France & Europe</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
