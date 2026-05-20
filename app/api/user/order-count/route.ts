import { NextResponse }  from 'next/server'
import { createClient }  from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ count: null, isFirstOrder: false })

  const { count } = await supabase
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return NextResponse.json({
    count:        count ?? 0,
    isFirstOrder: (count ?? 0) === 0,
  })
}
