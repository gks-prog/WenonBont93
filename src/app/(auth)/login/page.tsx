"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7c3aed]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-3xl backdrop-saturate-150 border border-white/10 p-10 md:p-12 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="text-white font-bold text-2xl tracking-tighter block mb-6">WENON BONT</Link>
          <h2 className="text-white text-sm tracking-[0.3em] uppercase font-bold">Client Portal</h2>
        </div>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-[0.2em] ml-1">Email Address</label>
            <input type="email" placeholder="name@example.com" className="bg-[#050505] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-[0.2em] ml-1 flex justify-between">
              Password
              <a href="#" className="text-white/40 hover:text-white transition-colors">Forgot?</a>
            </label>
            <input type="password" placeholder="••••••••" className="bg-[#050505] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" />
          </div>
          
          {/* Note: This is a placeholder link to the dashboard for testing. In production, this will be handled by Supabase Auth */}
          <Link href="/dashboard" className="mt-4 w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-[#7c3aed] hover:text-white transition-all text-center block">
            Authenticate
          </Link>
        </form>
      </div>
    </main>
  );
}
