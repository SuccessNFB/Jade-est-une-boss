'use client'

import { useState, useEffect, useRef } from 'react'
import Link                             from 'next/link'
import { useRouter }                    from 'next/navigation'
import { User, LogOut, Package }        from 'lucide-react'
import { createClient }                 from '@/lib/supabase/client'
import { motion, AnimatePresence }      from 'framer-motion'
import type { User as SupaUser }        from '@supabase/supabase-js'

export function UserMenu() {
  const [supaUser, setSupaUser] = useState<SupaUser | null>(null)
  const [open, setOpen]         = useState(false)
  const ref                     = useRef<HTMLDivElement>(null)
  const router                  = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setSupaUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      setSupaUser(s?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  /* Close on click outside */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setOpen(false)
    router.push('/')
    router.refresh()
  }

  if (!supaUser) {
    return (
      <Link
        href="/auth/login"
        className="p-2.5 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-[#0E0F16]/10 hidden sm:flex"
        aria-label="Mon compte"
      >
        <User style={{ width: 18, height: 18 }} />
      </Link>
    )
  }

  /* Avatar — first letter of email or first_name */
  const initial = (
    supaUser.user_metadata?.first_name?.[0] ??
    supaUser.email?.[0] ??
    'U'
  ).toUpperCase()

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-[#00D9FF] text-white/70 font-black text-xs flex items-center justify-center hover:bg-[#00EEFF] transition-colors"
        aria-label="Mon compte"
      >
        {initial}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 bg-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs font-bold text-white truncate">
                {supaUser.user_metadata?.first_name
                  ? `Bonjour ${supaUser.user_metadata.first_name} 👋`
                  : 'Mon compte'}
              </p>
              <p className="text-[10px] text-white/70 truncate mt-0.5">{supaUser.email}</p>
            </div>

            {/* Links */}
            <div className="py-1">
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#0E0F16]/5 transition-colors"
              >
                <Package className="w-3.5 h-3.5" />
                Mes commandes
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#0E0F16]/5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Se déconnecter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
