"use client";

import { useEffect, useState, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthNavButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Memoize the client to prevent infinite re-renders
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    checkSession();

    // 2. Safely destructure the subscription object directly
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (event === 'SIGNED_IN') router.refresh();
    });

    // 3. Clean unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]); // Safe dependency array

  if (loading) {
    return <div className="w-8 h-8 rounded-full border border-white/20 animate-pulse bg-white/10" />;
  }

  // If Logged In: Show Luxury Circular Avatar
  if (user) {
    const initial = user.email ? user.email.charAt(0).toUpperCase() : "U";
    return (
      <Link href="/dashboard" className="relative group">
        <div className="w-9 h-9 rounded-full bg-[#111] border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#7c3aed] group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]">
          <span className="text-white text-xs font-bold font-mono">{initial}</span>
        </div>
      </Link>
    );
  }

// If Guest: Show standard Login Button
  return (
    <Link 
      href="/auth" // <--- CHANGE THIS IF YOUR FOLDER IS NAMED /login
      className="px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white border border-white/20 rounded-sm hover:bg-white hover:text-black transition-all"
    >
      Login
    </Link>
  );
}
