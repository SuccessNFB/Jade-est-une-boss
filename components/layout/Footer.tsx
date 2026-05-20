'use client'

import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { IcekeyLogo } from '@/components/ui/IcekeyLogo'
import { useState } from 'react'
import toast from 'react-hot-toast'

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.19a8.15 8.15 0 004.77 1.52V6.28a4.85 4.85 0 01-1-.41z" />
    </svg>
  )
}

const PAYMENT_ICONS = [
  { label: 'Visa',       src: 'https://cdn.simpleicons.org/visa/ffffff' },
  { label: 'Mastercard', src: 'https://cdn.simpleicons.org/mastercard/ffffff' },
  { label: 'Amex',       src: 'https://cdn.simpleicons.org/americanexpress/ffffff' },
  { label: 'Apple Pay',  src: 'https://cdn.simpleicons.org/applepay/ffffff' },
  { label: 'Google Pay', src: 'https://cdn.simpleicons.org/googlepay/ffffff' },
  { label: 'PayPal',     src: 'https://cdn.simpleicons.org/paypal/ffffff' },
  { label: 'Klarna',     src: 'https://cdn.simpleicons.org/klarna/ffffff' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
      if (res.ok) {
        toast.success("Bienvenue dans l'Ice Age 🧊 — check tes emails !")
        setEmail('')
      } else {
        toast.error('Une erreur est survenue. Réessaie.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-charcoal">

      {/* ── Newsletter bar ────────────────────────────────────── */}
      <div className="bg-[#00D9FF]">
        <div className="section-container py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-charcoal">
              Join the Ice Age 🧊
            </h3>
            <p className="text-sm text-charcoal/60 mt-1">
              Early access + <strong>10% off</strong> your first order
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              className="flex-1 sm:w-64 px-4 py-3 rounded-full text-sm text-charcoal placeholder-charcoal/40 bg-white/90 focus:outline-none focus:ring-2 focus:ring-charcoal/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-full bg-charcoal text-white text-sm font-semibold hover:bg-charcoal/80 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? '...' : 'Get Exclusive Drops'}
            </button>
          </form>
        </div>
      </div>

      {/* ── Main footer ───────────────────────────────────────── */}
      <div className="section-container py-14 text-white/70">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <IcekeyLogo variant="full" height={64} color="#ffffff" />
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Bijoux en moissanite certifiés VVS. Chaque pièce est conçue pour durer une vie, à un prix qui respecte la vôtre.
            </p>
            <p className="mt-4 text-xs font-bold tracking-[0.3em] text-[#00D9FF]">
              COLD IS THE NEW GOLD
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00D9FF] hover:text-charcoal transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00D9FF] hover:text-charcoal transition-all">
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Politiques</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Politique de retour',  '/shipping#retours'],
                ['Livraison & délais',   '/shipping'],
                ["Guide d'entretien",    '/care-guide'],
                ['Garantie à vie',       '/warranty'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#00D9FF] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">À propos</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Notre histoire',       '/about'],
                ['Notre mission',        '/about#mission'],
                ['Pourquoi Moissanite',  '/about#moissanite'],
                ['Sourcing éthique',     '/about#ethics'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#00D9FF] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Nous contacter',   '/contact'],
                ['FAQ',              '/faq'],
                ['Suivi commande',   '/track'],
                ['Chat en direct',   '/contact#chat'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#00D9FF] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4">

          {/* Payment icons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {PAYMENT_ICONS.map((icon) => (
              <div key={icon.label} className="h-7 px-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon.src} alt={icon.label} className="h-4 object-contain opacity-60" />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <span>© {new Date().getFullYear()} ICEKEY. Tous droits réservés.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#00D9FF] transition-colors">Confidentialité</Link>
              <Link href="/terms"   className="hover:text-[#00D9FF] transition-colors">CGV</Link>
              <Link href="/contact" className="hover:text-[#00D9FF] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
