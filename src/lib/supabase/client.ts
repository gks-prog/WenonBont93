import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // 1. Extract the URL from environment variables
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  
  // 2. The Failsafe: If it doesn't start with http/https, force a dummy URL so the build passes
  if (!url.startsWith('http')) {
    url = 'https://build-bypass.supabase.co';
  }

  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'build-bypass-key';

  return createBrowserClient(url, key)
}
