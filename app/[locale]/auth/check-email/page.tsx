import type { Metadata }  from 'next'
import Link               from 'next/link'
import { IcekeyLogo }     from '@/components/ui/IcekeyLogo'
import { Mail }           from 'lucide-react'

export const metadata: Metadata = { title: 'Vérifie tes emails' }

interface Props {
  searchParams: Promise<{ email?: string }>
}

export default async function CheckEmailPage({ searchParams }: Props) {
  const { email } = await searchParams

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #07090F 0%, #0D1220 50%, #07090F 100%)' }}
    >
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <IcekeyLogo variant="horizontal" height={24} color="#ffffff" />
        </div>

        <div className="w-16 h-16 rounded-2xl bg-[#F5C542]/10 border border-[#F5C542]/20 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-7 h-7 text-[#F5C542]" />
        </div>

        <h1 className="font-serif text-3xl font-bold text-white mb-3">
          Vérifie tes emails 📬
        </h1>
        <p className="text-white/70 text-sm leading-relaxed mb-2">
          On a envoyé un lien de confirmation à
        </p>
        {email && (
          <p className="text-[#F5C542] font-semibold text-sm mb-6">{email}</p>
        )}
        <p className="text-white/60 text-xs mb-8">
          Clique sur le lien dans l&apos;email pour activer ton compte.<br />
          Vérifie aussi tes spams si tu ne le vois pas.
        </p>

        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/15 text-white/60 text-sm font-semibold hover:border-[#F5C542]/40 hover:text-white transition-all"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  )
}
