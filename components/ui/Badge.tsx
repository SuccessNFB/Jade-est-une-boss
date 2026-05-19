import { cn } from '@/lib/utils/cn'
import type { PriceTier } from '@/types'

const TIER_STYLES: Record<PriceTier, string> = {
  entry:   'bg-ice-100 text-ice-700',
  mid:     'bg-ice-500/10 text-ice-600 border border-ice-500/30',
  premium: 'bg-gold-300/20 text-amber-700',
  luxury:  'bg-gold-300/30 text-amber-800 border border-gold-300/50',
  ultra:   'bg-gradient-to-r from-gold-300/30 to-gold-400/30 text-amber-900 border border-gold-300',
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
  return (
    <span className={cn('badge-tier', TIER_STYLES[tier], className)}>
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
    <span className={cn('badge-tier bg-gray-100 text-gray-600', className)}>
      {children}
    </span>
  )
}
