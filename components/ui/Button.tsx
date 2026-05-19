'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'ghost' | 'outline-ice'
  size?:    'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:      'bg-charcoal text-white hover:bg-ice-500 hover:shadow-ice focus-visible:ring-ice-500',
      gold:         'bg-gold-300 text-charcoal hover:bg-gold-400 hover:shadow-gold focus-visible:ring-gold-400',
      ghost:        'border border-charcoal/20 text-charcoal hover:border-ice-500 hover:text-ice-600 focus-visible:ring-ice-500',
      'outline-ice':'border border-ice-500 text-ice-600 hover:bg-ice-500 hover:text-white focus-visible:ring-ice-500',
    }

    const sizes = {
      sm: 'px-5 py-2 text-xs tracking-wide',
      md: 'px-7 py-3.5 text-sm tracking-wide',
      lg: 'px-9 py-4 text-base tracking-wider',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export { Button }
