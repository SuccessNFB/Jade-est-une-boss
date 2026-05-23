'use client'

import { useState, useEffect }   from 'react'
import { useRouter }             from 'next/navigation'
import Link                      from 'next/link'
import { motion }                from 'framer-motion'
import { Eye, EyeOff, Loader2, ArrowRight, Mail, CheckCircle } from 'lucide-react'
import { createClient }          from '@/lib/supabase/client'
import { IcekeyLogo }            from '@/components/ui/IcekeyLogo'
import toast                     from 'react-hot-toast'

type State = 'request' | 'sent' | 'update' | 'done'

export default function ResetPasswordPage() {
  const router  = useRouter()
  const [state,    setState]   = useState<State>('request')
  const [email,    setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd] = useState(false)
  const [loading,  setLoading] = useState(false)

  /* Detect recovery session from email link */
  useEffect(() => {
    const supabase = createClient()
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setState('update')
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    })
    setLoading(false)
    if (error) { toast.error(error.message); return }
    setState('sent')
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) { toast.error(error.message); return }
    setState('done')
    setTimeout(() => router.push('/'), 2500)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #07090F 0%, #0D1220 50%, #07090F 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, #D4AF37 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-sm">
          <div className="flex justify-center mb-8">
            <IcekeyLogo variant="horizontal" height={24} color="#ffffff" />
          </div>

          {/* ── Request state ── */}
          {state === 'request' && (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-white mb-2">Mot de passe oublié</h1>
                <p className="text-white/70 text-sm">Entre ton email, on t&apos;envoie un lien.</p>
              </div>
              <form onSubmit={handleRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-[#D4AF37]/60 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#D4AF37] text-charcoal font-bold text-sm hover:bg-[#00EEFF] hover:shadow-[0_0_28px_rgba(212,175,55,0.5)] transition-all disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Envoyer le lien <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          )}

          {/* ── Sent state ── */}
          {state === 'sent' && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-5">
                <Mail className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3">Vérifie tes emails 📬</h2>
              <p className="text-white/70 text-sm mb-2">Lien envoyé à</p>
              <p className="text-[#D4AF37] font-semibold text-sm mb-6">{email}</p>
              <p className="text-white/70 text-xs">Pense à vérifier tes spams si tu ne le vois pas.</p>
            </div>
          )}

          {/* ── Update state ── */}
          {state === 'update' && (
            <>
              <div className="text-center mb-8">
                <h1 className="font-serif text-2xl font-bold text-white mb-2">Nouveau mot de passe</h1>
                <p className="text-white/70 text-sm">Choisis un mot de passe d&apos;au moins 8 caractères.</p>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Nouveau mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPwd ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 caractères"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/20 text-sm outline-none focus:border-[#D4AF37]/60 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white/60 transition-colors"
                    >
                      {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#D4AF37] text-charcoal font-bold text-sm hover:bg-[#00EEFF] hover:shadow-[0_0_28px_rgba(212,175,55,0.5)] transition-all disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Mettre à jour <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          )}

          {/* ── Done state ── */}
          {state === 'done' && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3">Mot de passe mis à jour ✓</h2>
              <p className="text-white/70 text-sm">Tu vas être redirigé automatiquement…</p>
            </div>
          )}

          {state === 'request' && (
            <p className="text-center text-sm text-white/60 mt-6">
              <Link href="/auth/login" className="text-[#D4AF37] font-semibold hover:underline">
                ← Retour à la connexion
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
