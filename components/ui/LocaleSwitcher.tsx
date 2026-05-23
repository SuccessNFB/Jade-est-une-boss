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
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-[#141414]/5 p-0.5 text-[11px] font-bold tracking-wider select-none">
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          disabled={pending}
          className={cn(
            'px-2.5 py-1 rounded-full transition-all duration-200 uppercase',
            locale === l
              ? 'bg-[#D4AF37] text-white/70 shadow-sm'
              : 'text-white/70 hover:text-white'
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
