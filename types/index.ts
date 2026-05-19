export type PriceTier = 'entry' | 'mid' | 'premium' | 'luxury' | 'ultra'
export type Metal     = 'silver-925' | 'gold-9k' | 'gold-14k' | 'gold-18k' | 'platinum'
export type Category  =
  | 'chain'     // Chaînes (cubaines, tennies, rope…)
  | 'pendant'   // Pendentifs
  | 'ring'      // Bagues
  | 'watch'     // Montres iced-out
  | 'bracelet'  // Bracelets
  | 'earring'   // Boucles d'oreilles
  | 'buff'      // Iced Out Buffs / lunettes
  | 'set'       // Sets

export interface Product {
  id:               string
  slug:             string
  name:             string
  description:      string
  category:         Category
  subcategory?:     string
  price:            number
  compare_at_price?: number
  price_tier:       PriceTier
  images:           ProductImage[]
  stone_type:       string
  stone_size?:      string
  stone_color?:     string
  metal:            Metal
  stock:            number
  is_customizable:  boolean
  sku:              string
  weight_grams?:    number
  certificate_type?: string
  chain_width_mm?:  number   // ex: 8, 12, 15, 20, 24
  chain_length_in?: number   // ex: 16, 18, 20, 24
  tags:             string[]
  is_active:        boolean
  is_featured:      boolean
  created_at:       string
  updated_at:       string
}

export interface ProductImage {
  url:      string
  alt:      string
  position: number
}

export interface CartItem {
  product:        Product
  quantity:       number
  customization?: PendantCustomization
}

export interface PendantCustomization {
  metal:        Metal
  stone_size:   string
  stone_color:  string
  engraving?:   string
  chain_length?: number
}

/* ── Price tiers ────────────────────────────────────────────── */
export interface PriceTierConfig {
  id:          PriceTier
  label:       string
  range:       string
  min:         number
  max:         number | null
  description: string
  cta:         string           // CTA différenciée par tier
  roas_target: string
}

export const PRICE_TIERS: PriceTierConfig[] = [
  {
    id:          'entry',
    label:       'Starter',
    range:       '< €100',
    min:         0,
    max:         100,
    description: 'Entre dans l\'univers ICEKEY. Earrings, starter rings, pendants.',
    cta:         'Start Your Collection',
    roas_target: '2.0-2.5x',
  },
  {
    id:          'mid',
    label:       'Flex',
    range:       '€100 – €200',
    min:         100,
    max:         200,
    description: 'Le sweet spot. Chaînes 8-12mm, bracelets, pendants.',
    cta:         'Shop the Flex',
    roas_target: '2.5-3.5x',
  },
  {
    id:          'premium',
    label:       'Premium',
    range:       '€200 – €400',
    min:         200,
    max:         400,
    description: 'Chaînes 14-18mm, custom pendants, montres premium.',
    cta:         'Upgrade Your Game',
    roas_target: '3.0-4.0x',
  },
  {
    id:          'luxury',
    label:       'Luxury',
    range:       '€400 – €700',
    min:         400,
    max:         700,
    description: 'Bust-downs 18mm+, luxury watches. Pour les sérieux.',
    cta:         'Own the Room',
    roas_target: '4.0-5.0x',
  },
  {
    id:          'ultra',
    label:       'Ultra',
    range:       '€700 +',
    min:         700,
    max:         null,
    description: 'Ultra-premium bust-downs 24mm+. Full custom. Éditions limitées.',
    cta:         'Secure Your Piece',
    roas_target: '5.0x+',
  },
]

/* ── Metals ─────────────────────────────────────────────────── */
export const METALS: Record<Metal, { label: string; color: string; surcharge: number }> = {
  'silver-925': { label: 'Argent 925',   color: '#C0C0C0', surcharge: 0 },
  'gold-9k':    { label: 'Or 9 carats',  color: '#E8C97A', surcharge: 50 },
  'gold-14k':   { label: 'Or 14 carats', color: '#FFD700', surcharge: 120 },
  'gold-18k':   { label: 'Or 18 carats', color: '#FFB800', surcharge: 220 },
  'platinum':   { label: 'Platine',      color: '#E5E4E2', surcharge: 350 },
}

/* ── Category config ─────────────────────────────────────────── */
export const CATEGORIES: Record<Category, { label: string; emoji: string }> = {
  chain:    { label: 'Chaînes',        emoji: '⛓️' },
  pendant:  { label: 'Pendentifs',     emoji: '💎' },
  ring:     { label: 'Bagues',         emoji: '💍' },
  watch:    { label: 'Montres',        emoji: '⌚' },
  bracelet: { label: 'Bracelets',      emoji: '📿' },
  earring:  { label: 'Boucles',        emoji: '✨' },
  buff:     { label: 'Iced Out Buffs', emoji: '🕶️' },
  set:      { label: 'Sets',           emoji: '🎁' },
}
