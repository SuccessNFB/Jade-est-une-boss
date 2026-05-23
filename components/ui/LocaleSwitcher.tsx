'use client'

import { useLocale }   from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { cn }          from '@/lib/utils/cn'

export function LocaleSwitcher() {
  const locale     = useLocale()
  const router     = useRouter()
  const pathname   = usePathname()
  const [pending, startTransition] = useTransition()

  function switchLocale(next: string) {
    if (next === locale) return
    startTransition(() => {
      /* Strip current locale prefix (if any) then prepend new one */
      const withoutLocale = pathname.replace(/^\/(fr|en)/, '') || '/'
      const newPath = next === 'fr' ? withoutLocale : `/en${withoutLocale}`
      router.push(newPath)
    })
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-0.5 text-[11px] font-bold tracking-wider select-none"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          disabled={pending}
          className={cn(
            'px-2.5 py-1 rounded-full transition-all duration-200 uppercase',
            locale === l
              ? 'font-black'
              : 'text-white/50 hover:text-white/80'
          )}
          style={locale === l ? { background: '#D4AF37', color: '#0A0A0A' } : {}}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
