'use client'

import { useEffect, useState } from 'react'
import { useRouter }           from 'next/navigation'
import { createClient }        from '@/lib/supabase/client'
import type { User }           from '@supabase/supabase-js'

export function useAuthGuard() {
  const [user,    setUser]    = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  function requireAuth(redirectTo: string) {
    if (!user) {
      router.push(`/auth/login?redirect=${encodeURIComponent(redirectTo)}`)
      return false
    }
    return true
  }

  return { user, loading, requireAuth }
}
