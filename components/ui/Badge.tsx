import { cn } from '@/lib/utils/cn'
import type { PriceTier } from '@/types'

const TIER_STYLES: Record<PriceTier, { bg: string; text: string; border: string }> = {
  entry:   { bg: 'rgba(245,197,66,0.08)',    text: '#F5C542',  border: 'rgba(245,197,66,0.2)' },
  mid:     { bg: 'rgba(245,197,66,0.12)',    text: '#F5C542',  border: 'rgba(245,197,66,0.25)' },
  premium: { bg: 'rgba(201,168,76,0.1)',    text: '#C9A84C',  border: 'rgba(201,168,76,0.2)' },
  luxury:  { bg: 'rgba(201,168,76,0.14)',   text: '#E8C878',  border: 'rgba(201,168,76,0.28)' },
  ultra:   { bg: 'rgba(201,168,76,0.18)',   text: '#E8C878',  border: 'rgba(232,200,120,0.35)' },
}

const TIER_LABELS: Record<PriceTier, string> = {
  entry:   'Éclat',
  mid:     'Prestige',
  premium: 'Luxe',
  luxury:  'Haute Joaillerie',
  ultra:   'Collector',
}

interface BadgeProps {
  tier:      PriceTier
  className?: string
}

export function TierBadge({ tier, className }: BadgeProps) {
  const s = TIER_STYLES[tier]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-widest uppercase',
        className
      )}
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {TIER_LABELS[tier]}
    </span>
  )
}

interface TagBadgeProps {
  children:   React.ReactNode
  className?: string
}

export function TagBadge({ children, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide',
        className
      )}
      style={{
        background: 'rgba(255,255,255,0.06)',
        color: 'rgba(255,255,255,0.5)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {children}
    </span>
  )
}
