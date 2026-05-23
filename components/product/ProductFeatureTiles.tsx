import { Award, RefreshCw, Truck, Gem, Settings, Shield } from 'lucide-react'

const TILES = [
  { icon: Award,    label: 'Certifié GRA',         sub: 'Diamond test ✓ — prouvé' },
  { icon: Truck,    label: 'Ships depuis la France', sub: '4–7 jours · livraison offerte' },
  { icon: RefreshCw,label: 'Retour 30 jours',       sub: 'Satisfait ou remboursé' },
  { icon: Gem,      label: 'VVS Grade D',            sub: 'Éclat maximal garanti' },
  { icon: Settings, label: 'Sur mesure',             sub: 'Gravure & personnalisation' },
  { icon: Shield,   label: 'Paiement sécurisé',     sub: 'Stripe 3D Secure' },
]

export function ProductFeatureTiles() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TILES.slice(0, 4).map(({ icon: Icon, label, sub }) => (
        <div
          key={label}
          className="flex items-start gap-3 p-3.5 rounded-xl bg-[#141412] border border-white/[0.06]"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1A1A17] shadow-sm flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-ice-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white/70 leading-tight">{label}</p>
            <p className="text-[11px] text-white/60 mt-0.5 leading-tight">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
