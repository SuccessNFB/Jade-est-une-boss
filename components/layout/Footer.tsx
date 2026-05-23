'use client'

import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { IcekeyLogo } from '@/components/ui/IcekeyLogo'
import { useState } from 'react'
import toast from 'react-hot-toast'

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.19a8.15 8.15 0 004.77 1.52V6.28a4.85 4.85 0 01-1-.41z" />
    </svg>
  )
}

export function Footer() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, source: 'footer' }),
      })
      if (res.ok) {
        toast.success("Bienvenue dans l'Ice Age — check tes emails !")
        setEmail('')
      } else {
        toast.error('Une erreur est survenue. Réessaie.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer style={{ background: '#08090E', borderTop: '1px solid rgba(255,255,255,0.04)' }}>

      {/* ── Newsletter strip ─────────────────────────────── */}
      <div style={{ background: '#0E0F16', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-container py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Sois dans le game 🧊
              </h3>
              <p className="text-sm text-white/30 mt-1">
                Drops en avant-première +{' '}
                <span className="text-white/55 font-semibold">–10%</span> sur ta 1ère commande
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                className="flex-1 sm:w-60 px-4 py-2.5 rounded-full text-sm text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-[#00D9FF]/30"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-ice px-5 py-2.5 disabled:opacity-50 whitespace-nowrap text-[13px]"
              >
                {loading ? '…' : "J'en suis"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main footer ──────────────────────────────────── */}
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <IcekeyLogo variant="full" height={56} color="#ffffff" />
            </div>
            <p className="text-sm leading-relaxed text-white/30 max-w-xs mb-4">
              Moissanite VVS certifié GRA. Diamond test validé. Ships depuis la France en 4–7 jours.
            </p>
            <p className="text-[10px] font-black tracking-[0.35em] text-[#00D9FF] mb-5 uppercase">
              Cold is the new gold
            </p>
            <div className="flex items-center gap-2">
              {[
                { href: '#', label: 'Instagram', icon: <Instagram style={{ width: 14, height: 14 }} /> },
                { href: '#', label: 'TikTok',    icon: <TikTokIcon /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,217,255,0.1)'
                    e.currentTarget.style.color = '#00D9FF'
                    e.currentTarget.style.borderColor = 'rgba(0,217,255,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4
              className="text-[10px] font-black tracking-[0.25em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Politiques
            </h4>
            <ul className="space-y-3">
              {[
                ['Politique de retour', '/shipping#retours'],
                ['Livraison & délais',  '/shipping'],
                ["Guide d'entretien",   '/care-guide'],
                ['Garantie à vie',      '/warranty'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/35 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4
              className="text-[10px] font-black tracking-[0.25em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              À propos
            </h4>
            <ul className="space-y-3">
              {[
                ['Notre histoire',      '/about'],
                ['Notre mission',       '/about#mission'],
                ['Pourquoi Moissanite', '/about#moissanite'],
                ['Sourcing éthique',    '/about#ethics'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/35 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-[10px] font-black tracking-[0.25em] uppercase mb-5"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {[
                ['Nous contacter', '/contact'],
                ['FAQ',            '/faq'],
                ['Suivi commande', '/track'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/35 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────── */}
        <div
          className="mt-12 pt-8 border-t space-y-4"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          {/* Payment methods text */}
          <div className="flex items-center gap-2 flex-wrap">
            {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal', 'Klarna'].map((m) => (
              <span
                key={m}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.25)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {m}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
            <span>© {new Date().getFullYear()} ICEKEY. Tous droits réservés.</span>
            <div className="flex items-center gap-5">
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
