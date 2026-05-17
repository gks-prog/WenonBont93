"use client";

import Link from "next/link";
import { loginUser, registerUser } from "@/app/actions/auth";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    
    // Dynamically call login or register based on the UI state
    const result = isLogin ? await loginUser(formData) : await registerUser(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7c3aed]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-3xl backdrop-saturate-150 border border-white/10 p-10 md:p-12 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="text-white font-bold text-2xl tracking-tighter block mb-6">WENON BONT</Link>
          <h2 className="text-white text-sm tracking-[0.3em] uppercase font-bold">
            {isLogin ? "Client Portal" : "Create Account"}
          </h2>
        </div>

        <form action={handleAuth} className="flex flex-col gap-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] tracking-widest uppercase text-center rounded-lg">
              {error}
            </div>
          )}
// Inside your login form component, add this state:
const [isResetMode, setIsResetMode] = useState(false);
const [message, setMessage] = useState("");

// And add this button right under the password input:
<button 
  type="button" 
  onClick={() => setIsResetMode(!isResetMode)}
  className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-white mt-2 self-start transition-colors"
>
  {isResetMode ? "Back to Login" : "Forgot Password?"}
</button>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-[0.2em] ml-1">Email Address</label>
            <input name="email" type="email" placeholder="studio@example.com" className="bg-[#050505] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-[0.2em] ml-1">Password</label>
            <input name="password" type="password" placeholder="••••••••" className="bg-[#050505] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7c3aed] transition-colors" required minLength={6} />
          </div>
          
          <button type="submit" disabled={loading} className="mt-4 w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-[#7c3aed] hover:text-white transition-all duration-300 disabled:opacity-50">
            {loading ? "Processing..." : isLogin ? "Authenticate" : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#a1a1aa] hover:text-white text-[10px] uppercase tracking-widest transition-colors">
            {isLogin ? "Need an account? Register here." : "Already have an account ? Sign in."}
          </button>
        </div>
      </div>
    </main>
  );
}
