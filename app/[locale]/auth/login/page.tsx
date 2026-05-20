import type { Metadata }   from 'next'
import { AuthForm }        from '@/components/auth/AuthForm'

export const metadata: Metadata = {
  title: 'Connexion',
}

interface Props {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirect } = await searchParams
  return <AuthForm mode="login" redirectTo={redirect ?? '/'} />
}
