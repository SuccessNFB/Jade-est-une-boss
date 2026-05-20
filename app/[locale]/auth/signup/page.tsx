import type { Metadata }   from 'next'
import { AuthForm }        from '@/components/auth/AuthForm'

export const metadata: Metadata = {
  title: 'Rejoindre la famille',
}

interface Props {
  searchParams: Promise<{ redirect?: string }>
}

export default async function SignupPage({ searchParams }: Props) {
  const { redirect } = await searchParams
  return <AuthForm mode="signup" redirectTo={redirect ?? '/'} />
}
