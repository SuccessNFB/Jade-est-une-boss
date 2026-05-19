'use client'

import { cn } from '@/lib/utils/cn'
import { METALS, type Metal } from '@/types'

const STONE_SIZES = [
  { value: '3mm',   label: '3 mm',  sub: '0.10 ct' },
  { value: '5mm',   label: '5 mm',  sub: '0.50 ct' },
  { value: '6.5mm', label: '6.5 mm',sub: '1.00 ct' },
  { value: '8mm',   label: '8 mm',  sub: '2.00 ct' },
  { value: '10mm',  label: '10 mm', sub: '3.00 ct' },
]

interface Props {
  selectedMetal:     Metal
  selectedSize:      string
  availableMetals:   Metal[]
  availableSizes:    string[]
  onMetalChange:     (m: Metal) => void
  onSizeChange:      (s: string) => void
}

export function ProductVariantSelector({
  selectedMetal,
  selectedSize,
  availableMetals,
  availableSizes,
  onMetalChange,
  onSizeChange,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Metal */}
      {availableMetals.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest mb-2.5">
            Métal — <span className="text-charcoal normal-case font-medium tracking-normal">{METALS[selectedMetal]?.label}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {availableMetals.map((m) => (
              <button
                key={m}
                onClick={() => onMetalChange(m)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all',
                  selectedMetal === m
                    ? 'border-charcoal bg-charcoal text-white'
                    : 'border-gray-200 text-charcoal hover:border-charcoal/40'
                )}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                  style={{ background: METALS[m]?.color }}
                />
                {METALS[m]?.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stone size */}
      {availableSizes.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest mb-2.5">
            Taille — <span className="text-charcoal normal-case font-medium tracking-normal">
              {STONE_SIZES.find((s) => s.value === selectedSize)?.label}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const s = STONE_SIZES.find((x) => x.value === size)
              return (
                <button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  className={cn(
                    'flex flex-col items-center px-4 py-2 rounded-xl text-sm border-2 transition-all',
                    selectedSize === size
                      ? 'border-charcoal bg-charcoal text-white'
                      : 'border-gray-200 text-charcoal hover:border-charcoal/40'
                  )}
                >
                  <span className="font-semibold">{s?.label ?? size}</span>
                  {s?.sub && (
                    <span className={cn('text-[10px]', selectedSize === size ? 'text-white/60' : 'text-charcoal/40')}>
                      {s.sub}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
