'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Diamond, Check, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { METALS, type Metal } from '@/types'
import { formatPrice } from '@/lib/utils/formatPrice'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

const STONE_SIZES = [
  { value: '3mm',   label: '3 mm',  carat: '0.10 ct', surcharge: 0 },
  { value: '5mm',   label: '5 mm',  carat: '0.50 ct', surcharge: 80 },
  { value: '6.5mm', label: '6.5 mm',carat: '1.00 ct', surcharge: 180 },
  { value: '8mm',   label: '8 mm',  carat: '2.00 ct', surcharge: 350 },
  { value: '10mm',  label: '10 mm', carat: '3.00 ct', surcharge: 600 },
]

const STONE_COLORS = [
  { value: 'D', label: 'D – Sans couleur', hex: '#FFFFFF', border: '#e2e8f0' },
  { value: 'E', label: 'E – Presque sans couleur', hex: '#FAFAFA', border: '#d4d4d8' },
  { value: 'F', label: 'F – Légèrement teinté', hex: '#FFFDE7', border: '#fde68a' },
  { value: 'K', label: 'K – Légère teinte jaune', hex: '#FFF8DC', border: '#fbbf24' },
]

const SHAPES = [
  { value: 'round',    label: 'Rond Brillant' },
  { value: 'oval',     label: 'Oval' },
  { value: 'cushion',  label: 'Coussin' },
  { value: 'pear',     label: 'Poire' },
  { value: 'emerald',  label: 'Émeraude' },
  { value: 'heart',    label: 'Cœur' },
]

const BASE_PRICE = 149

const STEPS = ['Pierre', 'Métal', 'Gravure', 'Récapitulatif']

export function PendantBuilder() {
  const [step,        setStep]        = useState(0)
  const [metal,       setMetal]       = useState<Metal>('gold-14k')
  const [stoneSize,   setStoneSize]   = useState('6.5mm')
  const [stoneColor,  setStoneColor]  = useState('D')
  const [shape,       setShape]       = useState('round')
  const [engraving,   setEngraving]   = useState('')
  const [chainLength, setChainLength] = useState(45)

  const { addItem } = useCartStore()

  const selectedSize  = STONE_SIZES.find((s) => s.value === stoneSize)!
  const selectedMetal = METALS[metal]

  const totalPrice = BASE_PRICE + selectedSize.surcharge + selectedMetal.surcharge

  function handleAddToCart() {
    addItem(
      {
        id:             `custom-${Date.now()}`,
        slug:           'custom-pendant',
        name:           `Pendentif Personnalisé – ${shape} ${stoneSize}`,
        description:    'Pendentif sur mesure ICEKEY',
        category:       'pendant',
        price:          totalPrice,
        price_tier:     totalPrice < 200 ? 'mid' : totalPrice < 400 ? 'premium' : 'luxury',
        images:         [{ url: '/images/custom-pendant.jpg', alt: 'Pendentif sur mesure', position: 0 }],
        stone_type:     'moissanite',
        stone_size:     stoneSize,
        stone_color:    stoneColor,
        metal,
        stock:          99,
        is_customizable: true,
        sku:            `CUSTOM-${Date.now()}`,
        tags:           ['sur-mesure', shape],
        is_active:      true,
        is_featured:    false,
        created_at:     new Date().toISOString(),
        updated_at:     new Date().toISOString(),
      } as any,
      1,
      { metal, stone_size: stoneSize, stone_color: stoneColor, engraving, chain_length: chainLength }
    )
    toast.success('Pendentif personnalisé ajouté au panier !')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === step
                  ? 'bg-ice-500 text-white shadow-ice'
                  : i < step
                  ? 'bg-ice-100 text-ice-600 cursor-pointer hover:bg-ice-200'
                  : 'bg-[#0E0F16] text-gray-400 cursor-not-allowed'
              }`}
            >
              {i < step ? <Check className="w-3.5 h-3.5" /> : <span className="text-xs">{i + 1}</span>}
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px ${i < step ? 'bg-ice-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Price display */}
      <div className="text-center mb-8">
        <motion.div
          key={totalPrice}
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-baseline gap-2"
        >
          <span className="font-serif text-5xl font-bold text-charcoal">{formatPrice(totalPrice)}</span>
          <span className="text-sm text-white/70">prix estimé</span>
        </motion.div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Shape */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-white/70 mb-4">Forme de taille</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {SHAPES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setShape(s.value)}
                    className={`p-3 rounded-xl border-2 text-xs font-medium transition-all ${
                      shape === s.value
                        ? 'border-ice-500 bg-ice-50 text-ice-600'
                        : 'border-white/[0.1] text-white/65 hover:border-ice-300'
                    }`}
                  >
                    <Diamond className="w-5 h-5 mx-auto mb-1 text-ice-400" fill="currentColor" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-white/70 mb-4">Taille de pierre</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STONE_SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStoneSize(s.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      stoneSize === s.value
                        ? 'border-ice-500 bg-ice-50'
                        : 'border-white/[0.1] hover:border-ice-300'
                    }`}
                  >
                    <div className="font-bold text-white/70 text-sm">{s.label}</div>
                    <div className="text-xs text-white/60">{s.carat}</div>
                    {s.surcharge > 0 && (
                      <div className="text-xs text-ice-500 font-semibold mt-1">+{formatPrice(s.surcharge)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-white/70 mb-4">Couleur</h3>
              <div className="flex flex-wrap gap-3">
                {STONE_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setStoneColor(c.value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      stoneColor === c.value
                        ? 'border-ice-500 bg-ice-50'
                        : 'border-white/[0.1] hover:border-ice-300'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border"
                      style={{ background: c.hex, borderColor: c.border }}
                    />
                    <div className="text-sm">
                      <span className="font-bold text-charcoal">{c.value}</span>
                      <span className="text-white/60 ml-1">{c.label.split('–')[1]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="font-serif text-lg font-semibold text-white/70 mb-4">Choisissez votre métal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(Object.entries(METALS) as [Metal, typeof METALS[Metal]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setMetal(key)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                    metal === key
                      ? 'border-ice-500 bg-ice-50'
                      : 'border-white/[0.1] hover:border-ice-300'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-full mb-3 border-2"
                    style={{ background: val.color, borderColor: val.color }}
                  />
                  <div className="font-semibold text-charcoal">{val.label}</div>
                  {val.surcharge > 0
                    ? <div className="text-sm text-ice-500 font-medium mt-1">+{formatPrice(val.surcharge)}</div>
                    : <div className="text-sm text-white/70 mt-1">Inclus</div>
                  }
                </button>
              ))}
            </div>

            {/* Chain length */}
            <div className="mt-8">
              <h3 className="font-serif text-lg font-semibold text-white/70 mb-4">
                Longueur de chaîne : <span className="text-ice-500">{chainLength} cm</span>
              </h3>
              <input
                type="range"
                min={40} max={70} step={5}
                value={chainLength}
                onChange={(e) => setChainLength(Number(e.target.value))}
                className="w-full accent-ice-500"
              />
              <div className="flex justify-between text-xs text-white/70 mt-1">
                <span>40 cm</span><span>55 cm</span><span>70 cm</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-lg mx-auto"
          >
            <h3 className="font-serif text-lg font-semibold text-white/70 mb-2">Gravure personnalisée</h3>
            <p className="text-sm text-white/60 mb-6">Optionnel — jusqu&apos;à 20 caractères au revers de la pièce.</p>
            <div className="space-y-3">
              <input
                type="text"
                maxLength={20}
                placeholder="Ex : Pour toujours · 14.02 · JM"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-white/[0.1] focus:border-ice-500 focus:outline-none text-white/70 placeholder:text-white/60 font-serif text-sm"
              />
              <div className="text-right text-xs text-white/70">{engraving.length}/20</div>
            </div>
            {engraving && (
              <div className="mt-6 p-5 rounded-2xl bg-charcoal text-center">
                <p className="font-serif text-white text-lg italic tracking-widest">"{engraving}"</p>
                <p className="text-white/60 text-xs mt-2">Aperçu gravure</p>
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-lg mx-auto"
          >
            <h3 className="font-serif text-xl font-semibold text-white/70 mb-6">Votre pendentif sur mesure</h3>
            <div className="space-y-3 mb-8">
              {[
                ['Forme',     SHAPES.find((s) => s.value === shape)?.label],
                ['Pierre',    `Moissanite ${stoneSize} (${selectedSize.carat}) · Couleur ${stoneColor}`],
                ['Métal',     selectedMetal.label],
                ['Chaîne',    `${chainLength} cm`],
                ['Gravure',   engraving || '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-white/[0.06]">
                  <span className="text-sm text-white/60">{label}</span>
                  <span className="text-sm font-semibold text-charcoal">{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-3">
                <span className="font-bold text-charcoal">Total</span>
                <span className="font-bold text-xl text-white/70 font-serif">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-5 h-5" />
              Ajouter au panier
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-white/[0.06]">
        <Button
          variant="ghost"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          Retour
        </Button>
        {step < STEPS.length - 1 && (
          <Button variant="primary" onClick={() => setStep(step + 1)}>
            Continuer
          </Button>
        )}
      </div>
    </div>
  )
}
