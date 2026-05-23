'use client'

import { useState }        from 'react'
import Link                from 'next/link'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { useAuthGuard }    from '@/components/auth/useAuthGuard'
import { Loader2, CheckCircle, Package, RefreshCw, Star, Shield, CreditCard, HelpCircle } from 'lucide-react'
import toast               from 'react-hot-toast'

const CATEGORIES = [
  { value: 'livraison', label: 'Livraison & suivi',     icon: Package },
  { value: 'retour',    label: 'Retour & remboursement', icon: RefreshCw },
  { value: 'produit',   label: 'Question produit',       icon: Star },
  { value: 'garantie',  label: 'Garantie',               icon: Shield },
  { value: 'paiement',  label: 'Paiement',               icon: CreditCard },
  { value: 'autre',     label: 'Autre',                  icon: HelpCircle },
]

export default function SupportPage() {
  const { user } = useAuthGuard()
  const [category, setCategory] = useState('')
  const [orderId,  setOrderId]  = useState('')
  const [message,  setMessage]  = useState('')
  const [email,    setEmail]    = useState('')
  const [name,     setName]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!category || !message.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/support/ticket', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ category, order_id: orderId || undefined, message, email, name }),
      })
      if (!res.ok) { toast.error('Une erreur est survenue. Réessaie.'); return }
      setDone(true)
    } catch {
      toast.error('Impossible de contacter le serveur.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20 pb-24">
        <div className="section-container max-w-2xl py-12">

          {done ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-7 h-7 text-green-500" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-white mb-3">Demande envoyée ✓</h1>
              <p className="text-white/60 text-sm mb-2">On revient vers toi sous <strong>24h ouvrées</strong>.</p>
              <p className="text-white/40 text-xs mb-8">Vérifie tes spams si tu ne reçois pas de réponse.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] text-white font-bold text-sm hover:bg-[#E8C572] transition-all">
                  Retour à la boutique
                </Link>
                {user && (
                  <Link href="/account" className="text-sm font-semibold text-white/50 hover:text-white transition-colors">
                    Voir mes tickets →
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-2">Support</p>
                <h1 className="font-serif text-4xl font-bold text-white mb-3">On est là pour toi</h1>
                <p className="text-white/55 text-sm">Dis-nous ce qui se passe, on répond sous 24h.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider">
                    Sujet *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setCategory(value)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm font-semibold transition-all text-left ${
                          category === value
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${category === value ? 'text-[#D4AF37]' : 'text-white/30'}`} />
                        <span className="text-xs leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order ID */}
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                    Numéro de commande <span className="normal-case font-normal text-white/30">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="ex: cs_live_..."
                    className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-charcoal/25 outline-none focus:border-[#D4AF37]/60 transition-all"
                  />
                </div>

                {/* Name + email (guests only) */}
                {!user && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Prénom *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ton prénom"
                        className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-charcoal/25 outline-none focus:border-[#D4AF37]/60 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ton@email.com"
                        className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-charcoal/25 outline-none focus:border-[#D4AF37]/60 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Décris ton problème en détail…"
                    className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-charcoal/25 outline-none focus:border-[#D4AF37]/60 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !category || !message.trim()}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#D4AF37] text-white font-bold text-sm hover:bg-[#E8C572] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Envoyer ma demande'}
                </button>

                <p className="text-center text-xs text-white/30">
                  Réponse sous 24h ouvrées · contact@icekey.shop
                </p>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
