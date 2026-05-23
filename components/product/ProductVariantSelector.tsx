'use client'

import { cn } from '@/lib/utils/cn'
import { METALS, type Metal } from '@/types'
import { formatPrice } from '@/lib/utils/formatPrice'

const STONE_SIZES = [
  { value: '3mm',   label: '3 mm',   sub: '0.10 ct' },
  { value: '5mm',   label: '5 mm',   sub: '0.50 ct' },
  { value: '6.5mm', label: '6.5 mm', sub: '1.00 ct' },
  { value: '8mm',   label: '8 mm',   sub: '2.00 ct' },
  { value: '10mm',  label: '10 mm',  sub: '3.00 ct' },
]

export const CHAIN_LENGTHS = [
  { value: '14', label: '14"', surcharge: 0  },
  { value: '16', label: '16"', surcharge: 10 },
  { value: '18', label: '18"', surcharge: 20 },
  { value: '20', label: '20"', surcharge: 30 },
]

const COLOR_SWATCHES = [
  { value: 'silver', label: 'Argent',    bg: '#C0C0C0', border: '#A0A0A0' },
  { value: 'gold',   label: 'Or',        bg: '#FFD700', border: '#D4AF37' },
  { value: 'rose',   label: 'Or Rose',   bg: '#F4A29B', border: '#D98880' },
]

interface Props {
  selectedMetal:     Metal
  selectedSize:      string
  selectedLength:    string
  selectedColor:     string
  availableMetals:   Metal[]
  availableSizes:    string[]
  showLengths:       boolean
  basePrice:         number
  onMetalChange:     (m: Metal) => void
  onSizeChange:      (s: string) => void
  onLengthChange:    (l: string) => void
  onColorChange:     (c: string) => void
}

export function ProductVariantSelector({
  selectedMetal,
  selectedSize,
  selectedLength,
  selectedColor,
  availableMetals,
  availableSizes,
  showLengths,
  basePrice,
  onMetalChange,
  onSizeChange,
  onLengthChange,
  onColorChange,
}: Props) {
  const metalSurcharge  = METALS[selectedMetal]?.surcharge ?? 0
  const lengthSurcharge = CHAIN_LENGTHS.find((l) => l.value === selectedLength)?.surcharge ?? 0

  return (
    <div className="space-y-5">

      {/* Length — chains only */}
      {showLengths && (
        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2.5">
            Longueur — <span className="text-charcoal normal-case font-medium tracking-normal">
              {CHAIN_LENGTHS.find((l) => l.value === selectedLength)?.label}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {CHAIN_LENGTHS.map((l) => {
              const price = basePrice + (METALS[selectedMetal]?.surcharge ?? 0) + l.surcharge
              return (
                <button
                  key={l.value}
                  onClick={() => onLengthChange(l.value)}
                  className={cn(
                    'flex flex-col items-center px-4 py-2 rounded-xl text-sm border-2 transition-all',
                    selectedLength === l.value
                      ? 'border-[#F5C542] bg-[#E0F7FF] text-charcoal'
                      : 'border-white/[0.1] text-white/70 hover:border-[#F5C542]/40'
                  )}
                >
                  <span className="font-semibold">{l.label}</span>
                  <span className={cn('text-[10px] mt-0.5', selectedLength === l.value ? 'text-white/65' : 'text-white/70')}>
                    {formatPrice(price)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Metal */}
      {availableMetals.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2.5">
            Métal — <span className="text-charcoal normal-case font-medium tracking-normal">
              {METALS[selectedMetal]?.label}
              {metalSurcharge > 0 && (
                <span className="text-white/70 ml-1">(+{formatPrice(metalSurcharge)})</span>
              )}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {availableMetals.map((m) => (
              <button
                key={m}
                onClick={() => onMetalChange(m)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all',
                  selectedMetal === m
                    ? 'border-[#F5C542] bg-[#E0F7FF] text-charcoal'
                    : 'border-white/[0.1] text-white/70 hover:border-[#F5C542]/40'
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

      {/* Color swatch — visual only */}
      <div>
        <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2.5">
          Coloris — <span className="text-charcoal normal-case font-medium tracking-normal">
            {COLOR_SWATCHES.find((c) => c.value === selectedColor)?.label}
          </span>
        </p>
        <div className="flex gap-3">
          {COLOR_SWATCHES.map((c) => (
            <button
              key={c.value}
              onClick={() => onColorChange(c.value)}
              title={c.label}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all hover:scale-110',
                selectedColor === c.value
                  ? 'border-[#F5C542] shadow-[0_0_0_2px_#F5C54240]'
                  : 'border-transparent'
              )}
              style={{ background: c.bg, outline: `2px solid ${c.border}20` }}
            />
          ))}
        </div>
      </div>

      {/* Stone size */}
      {availableSizes.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2.5">
            Taille pierre — <span className="text-charcoal normal-case font-medium tracking-normal">
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
                      ? 'border-[#F5C542] bg-[#E0F7FF] text-charcoal'
                      : 'border-white/[0.1] text-white/70 hover:border-[#F5C542]/40'
                  )}
                >
                  <span className="font-semibold">{s?.label ?? size}</span>
                  {s?.sub && (
                    <span className={cn('text-[10px]', selectedSize === size ? 'text-white/65' : 'text-white/70')}>
                      {s.sub}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Total price summary */}
      {(metalSurcharge > 0 || lengthSurcharge > 0) && (
        <div className="flex items-center justify-between text-xs text-white/60 bg-[#141412] rounded-xl px-4 py-2.5">
          <span>Total avec options</span>
          <span className="font-bold text-white/70 text-sm">
            {formatPrice(basePrice + metalSurcharge + lengthSurcharge)}
          </span>
        </div>
      )}
    </div>
  )
}
