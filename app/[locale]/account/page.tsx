'use client'

import { useEffect, useState }   from 'react'
import { useRouter }             from 'next/navigation'
import Link                      from 'next/link'
import { motion }                from 'framer-motion'
import { createClient }          from '@/lib/supabase/client'
import { AnnouncementBar }       from '@/components/layout/AnnouncementBar'
import { Header }                from '@/components/layout/Header'
import { Footer }                from '@/components/layout/Footer'
import { formatPrice }           from '@/lib/utils/formatPrice'
import { Package, LogOut, User, ChevronRight, ShoppingBag, MessageSquare } from 'lucide-react'
import type { User as SupaUser } from '@supabase/supabase-js'
import toast                     from 'react-hot-toast'

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  pending:      { label: 'En attente',   color: 'bg-amber-50 text-amber-700 border-amber-200' },
  paid:         { label: 'Confirmée',    color: 'bg-blue-50 text-blue-700 border-blue-200' },
  shipped:      { label: 'Expédiée',     color: 'bg-purple-50 text-purple-700 border-purple-200' },
  delivered:    { label: 'Livrée ✓',    color: 'bg-green-50 text-green-700 border-green-200' },
  refunded:     { label: 'Remboursée',   color: 'bg-[#121210] text-gray-500 border-white/[0.1]' },
  cancelled:    { label: 'Annulée',      color: 'bg-red-50 text-red-700 border-red-200' },
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
        <AnnouncementBar />
        <Header />
        <main className="pt-24 pb-24 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        </main>
        <Footer />
      </>
    )
  }

  const firstName = user?.user_metadata?.first_name as string | undefined

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="pt-20 pb-24">
        <div className="section-container max-w-3xl py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                <span className="font-bold text-[#D4AF37] text-lg uppercase">
                  {firstName?.[0] ?? user?.email?.[0] ?? '?'}
                </span>
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-charcoal">
                  {firstName ? `Salut ${firstName} 👋` : 'Mon compte'}
                </h1>
                <p className="text-sm text-white/70">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-charcoal transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { icon: User,          label: 'Mes infos',           href: '#infos' },
              { icon: MessageSquare, label: 'Contacter le support', href: '/support' },
              { icon: ShoppingBag,   label: 'Continuer mes achats', href: '/shop' },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/[0.06] bg-[#121210] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#141414] shadow-sm flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <span className="text-sm font-semibold text-charcoal">{label}</span>
                <ChevronRight className="w-4 h-4 text-charcoal/20 ml-auto" />
              </Link>
            ))}
          </div>

          {/* Orders */}
          <section>
            <h2 className="font-serif text-xl font-bold text-white/70 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#D4AF37]" />
              Mes commandes
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-dashed border-white/[0.1]">
                <ShoppingBag className="w-10 h-10 text-charcoal/15 mx-auto mb-3" />
                <p className="text-sm font-semibold text-white/70 mb-1">Aucune commande pour l&apos;instant</p>
                <Link href="/shop" className="text-sm text-[#D4AF37] font-semibold hover:underline">
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
                      className="rounded-2xl border border-white/[0.06] p-5 bg-[#141414] shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-xs text-white/70 mb-0.5">
                            {new Date(order.created_at).toLocaleDateString('fr-FR', {
                              day: '2-digit', month: 'long', year: 'numeric',
                            })}
                          </p>
                          <p className="text-xs font-mono text-white/60">#{order.stripe_session_id.slice(-8).toUpperCase()}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color}`}>
                          {s.label}
                        </span>
                      </div>

                      <ul className="space-y-1 mb-3">
                        {order.items.map((item, j) => (
                          <li key={j} className="flex justify-between text-sm">
                            <span className="text-white/70">{item.name} × {item.quantity}</span>
                            <span className="font-semibold text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex justify-between pt-3 border-t border-gray-50">
                        <span className="text-sm text-white/60">Total</span>
                        <span className="font-bold font-serif text-charcoal">{formatPrice(order.total_amount)}</span>
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
              <h2 className="font-serif text-xl font-bold text-white/70 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                Mes demandes SAV
              </h2>
              <div className="space-y-3">
                {tickets.map((t) => (
                  <div key={t.id} className="rounded-2xl border border-white/[0.06] p-4 bg-[#141414] shadow-sm flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 mb-0.5 capitalize">{t.category}</p>
                      <p className="text-sm text-white/70 truncate">{t.message}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${
                      t.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                      t.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {t.status === 'open' ? 'Ouvert' : t.status === 'in_progress' ? 'En cours' : t.status === 'resolved' ? 'Résolu ✓' : 'Fermé'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
