"use client";

import { useEffect, useState, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";

export function AuthNavButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  useEffect(() => {
    let isMounted = true;
    
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) {
        setUser(session?.user || null);
        setLoading(false);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user || null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return <div className="w-8 h-8 rounded-full border border-white/20 animate-pulse bg-white/10" />;
  }

  // If Logged In: Force hard reload using standard <a> tag
  if (user) {
    const initial = user.email ? user.email.charAt(0).toUpperCase() : "U";
    return (
      <a href="/dashboard" className="relative group block">
        <div className="w-9 h-9 rounded-full bg-[#111] border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#7c3aed] group-hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]">
          <span className="text-white text-xs font-bold font-mono">{initial}</span>
        </div>
      </a>
    );
  }

  // If Guest: Force hard reload using standard <a> tag
  return (
    <a 
      href="/login"
      className="px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white border border-white/20 rounded-sm hover:bg-white hover:text-black transition-all"
    >
      Login
    </a>
  );
}
