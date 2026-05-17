import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // 1. Extract the URL
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  
  // 2. The Failsafe
  if (!url.startsWith('http')) {
    url = 'https://build-bypass.supabase.co';
  }

  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'build-bypass-key';

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Ignored during server component execution
        }
      },
    },
  })
}
