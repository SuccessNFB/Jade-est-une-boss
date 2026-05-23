'use client'

import { useEffect, useState } from 'react'
import { useRouter }           from 'next/navigation'
import { createClient }        from '@/lib/supabase/client'
import { CheckCircle, Clock, AlertCircle, XCircle, Send, Loader2, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'contact@icekey.shop'

const STATUS_CONFIG = {
  open:        { label: 'Ouvert',     color: 'bg-red-900/30 text-red-300 border-red-600/30',    icon: AlertCircle },
  in_progress: { label: 'En cours',   color: 'bg-amber-900/30 text-amber-300 border-amber-600/30', icon: Clock },
  resolved:    { label: 'Résolu',     color: 'bg-emerald-900/30 text-emerald-300 border-emerald-600/30', icon: CheckCircle },
  closed:      { label: 'Fermé',      color: 'bg-white/5 text-white/40 border-white/10',   icon: XCircle },
}

const CATEGORY_LABEL: Record<string, string> = {
  livraison: '📦 Livraison',
  retour:    '↩️ Retour',
  produit:   '💎 Produit',
  garantie:  '🛡️ Garantie',
  paiement:  '💳 Paiement',
  autre:     '❓ Autre',
}

interface Ticket {
  id: string
  customer_email: string
  customer_name: string
  category: string
  order_id: string | null
  message: string
  status: string
  admin_reply: string | null
  created_at: string
}

export default function AdminSupportPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [tickets,    setTickets]    = useState<Ticket[]>([])
  const [filter,     setFilter]     = useState('open')
  const [loading,    setLoading]    = useState(true)
  const [expanded,   setExpanded]   = useState<string | null>(null)
  const [reply,      setReply]      = useState('')
  const [saving,     setSaving]     = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email !== ADMIN_EMAIL) { router.push('/'); return }
      setAuthorized(true)
    })
  }, [router])

  useEffect(() => {
    if (!authorized) return
    setLoading(true)
    fetch(`/api/support/admin?status=${filter}`)
      .then((r) => r.json())
      .then((d) => setTickets(d.tickets ?? []))
      .catch(() => toast.error('Erreur chargement tickets'))
      .finally(() => setLoading(false))
  }, [authorized, filter])

  async function updateTicket(ticketId: string, status?: string, replyText?: string) {
    setSaving(true)
    try {
      const res = await fetch('/api/support/admin', {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ticketId, status, reply: replyText }),
      })
      if (!res.ok) throw new Error()
      toast.success(replyText ? 'Réponse envoyée ✓' : 'Statut mis à jour ✓')
      setReply('')
      setExpanded(null)
      setTickets((prev) => prev.map((t) =>
        t.id === ticketId ? { ...t, ...(status ? { status } : {}), ...(replyText ? { admin_reply: replyText } : {}) } : t
      ))
    } catch {
      toast.error('Erreur')
    } finally {
      setSaving(false)
    }
  }

  if (!authorized) return null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl font-bold">ICEKEY Admin · SAV</h1>
          <p className="text-white/60 text-xs">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''} · filtre : {filter}</p>
        </div>
        <button onClick={() => setFilter(filter)} className="text-white/60 hover:text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="border-b px-6 flex gap-1 overflow-x-auto">
        {['open', 'in_progress', 'resolved', 'closed', 'all'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-3 text-xs font-bold tracking-wide uppercase whitespace-nowrap border-b-2 transition-colors ${
              filter === s
                ? 'border-[#D4AF37] text-white'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            {s === 'all' ? 'Tous' : STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.label ?? s}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-3">
        {loading ? (
          <div className="text-center py-16"><Loader2 className="w-6 h-6 animate-spin text-white/20 mx-auto" /></div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-16 text-white/30 text-sm">Aucun ticket</div>
        ) : tickets.map((ticket) => {
          const sc   = STATUS_CONFIG[ticket.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.open
          const Icon = sc.icon
          const isExpanded = expanded === ticket.id

          return (
            <div key={ticket.id} className="rounded-2xl overflow-hidden">
              {/* Ticket header */}
              <button
                onClick={() => { setExpanded(isExpanded ? null : ticket.id); setReply(ticket.admin_reply ?? '') }}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sc.color} flex items-center gap-1`}>
                      <Icon className="w-3 h-3" />{sc.label}
                    </span>
                    <span className="text-[10px] text-white/40 font-medium">
                      {CATEGORY_LABEL[ticket.category] ?? ticket.category}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white truncate">
                    {ticket.customer_name || ticket.customer_email}
                  </p>
                  <p className="text-xs text-white/40 truncate">{ticket.message}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-white/30">
                    {new Date(ticket.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </p>
                  {ticket.order_id && (
                    <p className="text-[10px] font-mono text-white/30 mt-0.5">#{ticket.order_id.slice(-6).toUpperCase()}</p>
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                    <div><span className="text-white/40">Email :</span> <span className="font-medium">{ticket.customer_email}</span></div>
                    {ticket.order_id && <div><span className="text-white/40">Commande :</span> <span className="font-mono">{ticket.order_id}</span></div>}
                  </div>

                  {/* Message */}
                  <div className="rounded-xl p-4">
                    <p className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed">{ticket.message}</p>
                  </div>

                  {/* Previous reply */}
                  {ticket.admin_reply && (
                    <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-4">
                      <p className="text-[10px] font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">Ta réponse précédente</p>
                      <p className="text-sm text-white/70 whitespace-pre-wrap">{ticket.admin_reply}</p>
                    </div>
                  )}

                  {/* Reply form */}
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={4}
                    placeholder="Réponds au client…"
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-charcoal/25 outline-none focus:border-[#D4AF37]/60 transition-all resize-none"
                  />

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => updateTicket(ticket.id, undefined, reply)}
                      disabled={!reply.trim() || saving}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4AF37] text-white text-xs font-bold hover:bg-[#E8C572] transition-colors disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                      Envoyer réponse
                    </button>
                    {(['in_progress', 'resolved', 'closed'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateTicket(ticket.id, s)}
                        disabled={saving || ticket.status === s}
                        className="px-3 py-2 rounded-full border border-white/10 text-xs font-semibold text-white/60 hover:border-white/20 hover:text-white transition-colors disabled:opacity-30"
                      >
                        → {STATUS_CONFIG[s].label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
