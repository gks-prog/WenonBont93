import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({ request })

    // 1. Safe Fallbacks (Prevents Edge Runtime from panicking if keys are missing)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://build-bypass.supabase.co";
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "build-bypass-key";

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
          },
        },
      }
    )

    // 2. Only attempt to fetch the user if we actually have real keys
    // If it's the bypass key, we skip this to prevent network timeout crashes.
    if (supabaseUrl !== "https://build-bypass.supabase.co") {
      const { data: { user } } = await supabase.auth.getUser()

      // Protect Dashboard Route
      if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Redirect logged-in users away from auth pages
      if (request.nextUrl.pathname.startsWith('/login') && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    return supabaseResponse

  } catch (error) {
    // 3. THE FAILSAFE
    // If absolutely anything goes wrong with Supabase on the Edge server, 
    // catch the error and just let the website load normally. 
    console.error("Middleware Auth Error:", error);
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
