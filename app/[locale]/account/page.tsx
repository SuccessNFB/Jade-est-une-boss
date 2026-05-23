'use client'

import { useEffect, useState }   from 'react'
import { useRouter }             from 'next/navigation'
import Link                      from 'next/link'
import { motion }                from 'framer-motion'
import { createClient }          from '@/lib/supabase/client'
import { Header }                from '@/components/layout/Header'
import { Footer }                from '@/components/layout/Footer'
import { formatPrice }           from '@/lib/utils/formatPrice'
import { Package, LogOut, User, ChevronRight, ShoppingBag, MessageSquare, ArrowLeft } from 'lucide-react'
import type { User as SupaUser } from '@supabase/supabase-js'
import toast                     from 'react-hot-toast'

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:   { label: 'En attente',  color: 'bg-amber-900/30 text-amber-300 border-amber-600/30' },
  paid:      { label: 'Confirmée',   color: 'bg-blue-900/30 text-blue-300 border-blue-600/30' },
  shipped:   { label: 'Expédiée',    color: 'bg-purple-900/30 text-purple-300 border-purple-600/30' },
  delivered: { label: 'Livrée ✓',   color: 'bg-emerald-900/30 text-emerald-300 border-emerald-600/30' },
  refunded:  { label: 'Remboursée', color: 'bg-white/5 text-white/40 border-white/10' },
  cancelled: { label: 'Annulée',    color: 'bg-red-900/30 text-red-300 border-red-600/30' },
}

interface Order {
  id: string
  stripe_session_id: string
  items: { name: string; quantity: number; price: number }[]
  total_amount: number
  currency: string
  status: string
  created_at: string
}

export default function AccountPage() {
  const router  = useRouter()
  const [user,    setUser]    = useState<SupaUser | null>(null)
  const [orders,  setOrders]  = useState<Order[]>([])
  const [tickets, setTickets] = useState<{ id: string; category: string; status: string; message: string; created_at: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/auth/login?redirect=/account')
        return
      }
      setUser(data.user)

      Promise.all([
        fetch('/api/user/orders').then((r) => r.json()).then((d) => setOrders(d.orders ?? [])),
        fetch('/api/support/tickets').then((r) => r.json()).then((d) => setTickets(d.tickets ?? [])),
      ]).catch(() => {}).finally(() => setLoading(false))
    })
  }, [router])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('À bientôt !')
    router.push('/')
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
          <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        </main>
        <Footer />
      </>
    )
  }

  const firstName = user?.user_metadata?.first_name as string | undefined

  return (
    <>
      <Header />
      <main className="pt-28 pb-24" style={{ background: '#0A0A0A' }}>
        <div className="section-container max-w-3xl py-10">

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-8 text-sm text-white/50 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Retour
          </button>

          {/* Profile header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}
              >
                <span className="font-bold text-lg uppercase" style={{ color: '#D4AF37' }}>
                  {firstName?.[0] ?? user?.email?.[0] ?? '?'}
                </span>
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-white">
                  {firstName ? `Salut ${firstName} 👋` : 'Mon compte'}
                </h1>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {[
              { icon: User,          label: 'Mes infos',            href: '#infos' },
              { icon: MessageSquare, label: 'Support client',        href: '/support' },
              { icon: ShoppingBag,   label: 'Continuer mes achats',  href: '/shop' },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 p-4 rounded-2xl transition-all group"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#141414' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'
                  e.currentTarget.style.background = 'rgba(212,175,55,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = '#141414'
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Icon className="w-4 h-4 transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }} />
                </div>
                <span className="text-sm font-semibold text-white/80">{label}</span>
                <ChevronRight className="w-4 h-4 ml-auto" style={{ color: 'rgba(255,255,255,0.2)' }} />
              </Link>
            ))}
          </div>

          {/* Orders */}
          <section>
            <h2 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" style={{ color: '#D4AF37' }} />
              Mes commandes
            </h2>

            {orders.length === 0 ? (
              <div
                className="text-center py-16 rounded-2xl"
                style={{ border: '1px dashed rgba(255,255,255,0.1)' }}
              >
                <ShoppingBag className="w-10 h-10 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
                <p className="text-sm font-semibold text-white/60 mb-1">Aucune commande pour l&apos;instant</p>
                <Link
                  href="/shop"
                  className="text-sm font-semibold hover:underline"
                  style={{ color: '#D4AF37' }}
                >
                  Découvrir la collection →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, i) => {
                  const s = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="rounded-2xl p-5"
                      style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            {new Date(order.created_at).toLocaleDateString('fr-FR', {
                              day: '2-digit', month: 'long', year: 'numeric',
                            })}
                          </p>
                          <p
                            className="text-xs"
                            style={{ fontFamily: 'var(--font-space-mono), monospace', color: 'rgba(255,255,255,0.4)' }}
                          >
                            #{order.stripe_session_id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color}`}>
                          {s.label}
                        </span>
                      </div>

                      <ul className="space-y-1.5 mb-3">
                        {order.items.map((item, j) => (
                          <li key={j} className="flex justify-between text-sm">
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.name} × {item.quantity}</span>
                            <span
                              className="font-bold"
                              style={{ color: '#D4AF37', fontFamily: 'var(--font-space-mono), monospace' }}
                            >
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div
                        className="flex justify-between pt-3"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Total</span>
                        <span
                          className="font-bold text-white"
                          style={{ fontFamily: 'var(--font-space-mono), monospace', letterSpacing: '-0.02em' }}
                        >
                          {formatPrice(order.total_amount)}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Support tickets */}
          {tickets.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" style={{ color: '#D4AF37' }} />
                Mes demandes SAV
              </h2>
              <div className="space-y-3">
                {tickets.map((t) => {
                  const tColor =
                    t.status === 'resolved'   ? 'bg-emerald-900/30 text-emerald-300 border-emerald-600/30' :
                    t.status === 'in_progress'? 'bg-amber-900/30 text-amber-300 border-amber-600/30' :
                                                'bg-blue-900/30 text-blue-300 border-blue-600/30'
                  const tLabel =
                    t.status === 'open'        ? 'Ouvert' :
                    t.status === 'in_progress' ? 'En cours' :
                    t.status === 'resolved'    ? 'Résolu ✓' : 'Fermé'
                  return (
                    <div
                      key={t.id}
                      className="rounded-2xl p-4 flex items-start justify-between gap-4"
                      style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#141414' }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs capitalize mb-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.category}</p>
                        <p className="text-sm truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.message}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${tColor}`}>
                        {tLabel}
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
