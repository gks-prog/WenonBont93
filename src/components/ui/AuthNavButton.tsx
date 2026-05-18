"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export function AuthNavButton() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  if (user) {
    const initial = user.email ? user.email.charAt(0).toUpperCase() : "U";
    return (
      <button onClick={() => router.push("/dashboard")} className="w-9 h-9 rounded-full bg-[#111] border border-white/20 text-white text-xs font-bold hover:border-[#7c3aed] transition-colors">
        {initial}
      </button>
    );
  }

  return (
    <button onClick={() => router.push("/login")} className="px-5 py-2 text-[10px] uppercase font-bold text-white border border-white/20 rounded hover:bg-white hover:text-black">
      LOGIN
    </button>
  );
}
