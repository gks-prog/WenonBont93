import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // We use fallbacks here strictly to prevent Next.js from crashing during static build pre-rendering.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://build-bypass.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "build-bypass-key"
  )
}
