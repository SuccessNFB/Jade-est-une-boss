'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ice' | 'outline' | 'ghost' | 'gold' | 'primary'
  size?:    'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'ice', size = 'md', loading, children, disabled, ...props }, ref) => {

    const base = [
      'inline-flex items-center justify-center gap-2 font-bold rounded-full',
      'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2',
      'active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' ')

    const variants: Record<string, string> = {
      ice:     'bg-[#D4AF37] text-[#08090E] hover:bg-[#E8C572] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] focus-visible:ring-[#D4AF37]/50',
      outline: 'bg-transparent text-white/75 border border-white/12 hover:border-white/25 hover:text-white backdrop-blur-sm focus-visible:ring-white/20',
      ghost:   'bg-transparent text-white/60 hover:text-white focus-visible:ring-white/15',
      gold:    'bg-[#D4AF37] text-[#08090E] hover:bg-[#E8C572] hover:shadow-[0_0_28px_rgba(212,175,55,0.35)] focus-visible:ring-[#D4AF37]/50',
      primary: 'bg-[#D4AF37] text-[#08090E] hover:bg-[#E8C572] focus-visible:ring-[#D4AF37]/50',
    }

    const sizes: Record<string, string> = {
      sm: 'px-5 py-2 text-[11px] tracking-wide',
      md: 'px-7 py-3 text-[12px] tracking-wide',
      lg: 'px-9 py-4 text-sm tracking-wide',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant] ?? variants.ice, sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export { Button }
