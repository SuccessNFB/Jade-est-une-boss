import { Lock, RefreshCw, Award } from 'lucide-react'

export function TrustSignals() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
      {[
        { icon: Lock,      text: 'Paiement SSL sécurisé' },
        { icon: RefreshCw, text: '30 jours · zéro question' },
        { icon: Award,     text: 'Certif GRA · diamond test ✓' },
      ].map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-ice-500" />
          <span>{text}</span>
        </div>
      ))}
    </div>
  )
}
