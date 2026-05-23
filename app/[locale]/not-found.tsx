import Link from 'next/link'
import { Diamond } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center gap-6 text-center p-6">
      <Diamond className="w-12 h-12 text-ice-300" fill="currentColor" />
      <h1 className="font-serif text-6xl font-bold text-charcoal">404</h1>
      <p className="text-white/40 max-w-sm">
        Cette page n&apos;existe pas. Explorez notre collection de bijoux moissanite.
      </p>
      <Link href="/">
        <Button variant="primary">Retour à l&apos;accueil</Button>
      </Link>
    </div>
  )
}
