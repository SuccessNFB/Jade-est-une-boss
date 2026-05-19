export type PriceTier = 'entry' | 'mid' | 'premium' | 'luxury' | 'ultra'
export type Metal = 'silver-925' | 'gold-9k' | 'gold-14k' | 'gold-18k' | 'platinum'
export type Category = 'ring' | 'necklace' | 'pendant' | 'bracelet' | 'earring' | 'set'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: Category
  subcategory?: string
  price: number
  compare_at_price?: number
  price_tier: PriceTier
  images: ProductImage[]
  stone_type: string
  stone_size?: string
  stone_color?: string
  metal: Metal
  stock: number
  is_customizable: boolean
  sku: string
  weight_grams?: number
  certificate_type?: string
  tags: string[]
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface ProductImage {
  url: string
  alt: string
  position: number
}

export interface CartItem {
  product: Product
  quantity: number
  customization?: PendantCustomization
}

export interface PendantCustomization {
  metal: Metal
  stone_size: string
  stone_color: string
  engraving?: string
  chain_length?: number
}

export interface PriceTierConfig {
  id: PriceTier
  label: string
  range: string
  min: number
  max: number | null
  description: string
  color: string
}

export const PRICE_TIERS: PriceTierConfig[] = [
  {
    id:          'entry',
    label:       'Éclat',
    range:       '< €100',
    min:         0,
    max:         100,
    description: 'L\'entrée dans l\'univers ICEKEY',
    color:       'ice-400',
  },
  {
    id:          'mid',
    label:       'Prestige',
    range:       '€100 – €200',
    min:         100,
    max:         200,
    description: 'Nos bestsellers signature',
    color:       'ice-500',
  },
  {
    id:          'premium',
    label:       'Luxe',
    range:       '€200 – €400',
    min:         200,
    max:         400,
    description: 'Pièces de caractère certifiées',
    color:       'gold-300',
  },
  {
    id:          'luxury',
    label:       'Haute Joaillerie',
    range:       '€400 – €700',
    min:         400,
    max:         700,
    description: 'Créations exclusives taille haute',
    color:       'gold-400',
  },
  {
    id:          'ultra',
    label:       'Collector',
    range:       '€700 +',
    min:         700,
    max:         null,
    description: 'Pièces uniques sur commande',
    color:       'gold-300',
  },
]

export const METALS: Record<Metal, { label: string; color: string; surcharge: number }> = {
  'silver-925': { label: 'Argent 925',      color: '#C0C0C0', surcharge: 0 },
  'gold-9k':    { label: 'Or 9 carats',     color: '#E8C97A', surcharge: 50 },
  'gold-14k':   { label: 'Or 14 carats',    color: '#FFD700', surcharge: 120 },
  'gold-18k':   { label: 'Or 18 carats',    color: '#FFB800', surcharge: 220 },
  'platinum':   { label: 'Platine',         color: '#E5E4E2', surcharge: 350 },
}
