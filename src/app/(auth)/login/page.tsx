"use client";

import Link from "next/link";
import { loginUser } from "@/app/actions/auth";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Wrapper function satisfies TypeScript by returning void
  const handleAuth = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    
    const result = await loginUser(formData);
    
    // If the server action returns an error object, capture and display it
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-6 relative overflow-hidden">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7c3aed]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-3xl backdrop-saturate-150 border border-white/10 p-10 md:p-12 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="text-white font-bold text-2xl tracking-tighter block mb-6">WENON BONT</Link>
          <h2 className="text-white text-sm tracking-[0.3em] uppercase font-bold">Client Portal</h2>
        </div>

        <form action={handleAuth} className="flex flex-col gap-6">
          {/* Error Message Display */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] tracking-widest uppercase text-center rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-[0.2em] ml-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              placeholder="studio@example.com" 
              className="bg-[#050505] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" 
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-[0.2em]">Password</label>
            </div>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="bg-[#050505] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" 
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-[#7c3aed] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Authenticate"}
          </button>
        </form>
      </div>
    </main>
  );
}
