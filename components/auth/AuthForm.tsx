'use client'

import { useState }        from 'react'
import { useRouter }       from 'next/navigation'
import Link                from 'next/link'
import { motion }          from 'framer-motion'
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react'
import { createClient }  from '@/lib/supabase/client'
import { IcekeyLogo }    from '@/components/ui/IcekeyLogo'
import { trackSignUp }   from '@/lib/analytics/gtag'
import toast             from 'react-hot-toast'

interface Props {
  mode:        'login' | 'signup'
  redirectTo?: string
}

export function AuthForm({ mode, redirectTo = '/' }: Props) {
  const router = useRouter()
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [firstName, setFirstName] = useState('')
  const [showPwd,   setShowPwd]   = useState(false)
  const [loading,   setLoading]   = useState(false)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { first_name: firstName },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
          },
        })
        if (error) throw error

        trackSignUp()

        /* Trigger welcome email server-side */
        await fetch('/api/auth/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, firstName }),
        }).catch(() => {})

        toast.success('Vérifie tes emails pour confirmer ton compte !')
        router.push(`/auth/check-email?email=${encodeURIComponent(email)}`)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.'
      if (msg.includes('Invalid login credentials')) {
        toast.error('Email ou mot de passe incorrect.')
      } else if (msg.includes('already registered')) {
        toast.error('Ce compte existe déjà. Connecte-toi !')
      } else {
        toast.error(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const isSignup = mode === 'signup'

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #07090F 0%, #0D1220 50%, #07090F 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #00D9FF 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#0E0F16]/[0.04] border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-sm">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <IcekeyLogo variant="horizontal" height={24} color="#ffffff" />
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            {isSignup ? (
              <>
                <h1 className="font-serif text-3xl font-bold text-white mb-2">
                  Rejoignez la famille ❄️
                </h1>
                <p className="text-white/50 text-sm leading-relaxed">
                  Créez votre compte pour passer commande<br />
                  et accéder aux offres exclusives membres.
                </p>
                {/* Benefits */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['-5% sur ta 1ère commande ✓', 'Offres exclusives membres', 'Suivi de commandes'].map((b) => (
                    <span key={b} className="text-[10px] font-semibold text-[#00D9FF] bg-[#00D9FF]/10 border border-[#00D9FF]/20 px-3 py-1 rounded-full">
                      {b}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="font-serif text-3xl font-bold text-white mb-2">
                  Bon retour 👋
                </h1>
                <p className="text-white/50 text-sm">
                  Connectez-vous pour continuer.
                </p>
              </>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ton prénom"
                  required
                  className="w-full bg-[#0E0F16]/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-[#00D9FF]/60 focus:bg-[#0E0F16]/8 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                autoComplete="email"
                className="w-full bg-[#0E0F16]/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-[#00D9FF]/60 focus:bg-[#0E0F16]/8 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignup ? 'Min. 8 caractères' : '••••••••'}
                  required
                  minLength={8}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  className="w-full bg-[#0E0F16]/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/20 text-sm outline-none focus:border-[#00D9FF]/60 focus:bg-[#0E0F16]/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isSignup && (
                <div className="flex justify-end mt-1.5">
                  <Link href="/auth/reset-password" className="text-xs text-white/40 hover:text-[#00D9FF] transition-colors">
                    Mot de passe oublié ?
                  </Link>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#00D9FF] text-white/70 font-bold text-sm tracking-wide hover:bg-[#00EEFF] hover:shadow-[0_0_28px_rgba(0,217,255,0.5)] transition-all disabled:opacity-60 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isSignup ? 'Créer mon compte' : 'Se connecter'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-white/40 mt-6">
            {isSignup ? (
              <>
                Déjà membre ?{' '}
                <Link href={`/auth/login${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="text-[#00D9FF] font-semibold hover:underline">
                  Se connecter
                </Link>
              </>
            ) : (
              <>
                Pas encore membre ?{' '}
                <Link href={`/auth/signup${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="text-[#00D9FF] font-semibold hover:underline">
                  Rejoindre la famille
                </Link>
              </>
            )}
          </p>

          {/* Legal */}
          {isSignup && (
            <p className="text-center text-[10px] text-white/20 mt-4 leading-relaxed">
              En créant un compte, vous acceptez nos{' '}
              <Link href="/terms" className="underline hover:text-white/40">CGV</Link>{' '}
              et notre{' '}
              <Link href="/privacy" className="underline hover:text-white/40">politique de confidentialité</Link>.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
