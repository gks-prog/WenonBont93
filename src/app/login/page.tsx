"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const [isResetMode, setIsResetMode] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const rawEmail = formData.get("email") as string;
    const email = rawEmail ? rawEmail.trim().toLowerCase() : "";
    const password = formData.get("password") as string;

    try {
      if (isResetMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) setErrorMsg(error.message);
        else setSuccessMsg("Password reset link sent to your email.");
        setLoading(false);
        
      } else if (isRegister) {
        const confirmPassword = formData.get("confirmPassword") as string;
        if (password !== confirmPassword) {
          setErrorMsg("Passwords do not match.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          if (error.message.includes("already registered")) {
            setErrorMsg("This email is already registered. Please login.");
          } else {
            setErrorMsg(error.message);
          }
          setLoading(false);
        } else {
          setTimeout(() => {
            router.push("/dashboard");
            router.refresh();
          }, 500);
        }
        
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorMsg("Invalid email or password. Please try again.");
          setLoading(false);
        } else {
          setTimeout(() => {
            router.push("/dashboard");
            router.refresh();
          }, 500);
        }
      }
    } catch (err) {
      setErrorMsg("A network error occurred. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 pt-20">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white uppercase tracking-widest">
            {isResetMode ? "Recover Access" : isRegister ? "Register" : "Login"}
          </h1>
          <p className="text-[#a1a1aa] text-xs uppercase tracking-[0.2em] mt-2">
            {isResetMode ? "Enter your email to reset password" : "Secure Audio Licensing"}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center rounded">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-widest text-center rounded">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-white text-[10px] uppercase tracking-widest font-bold">Email</label>
            <input 
              type="email" 
              name="email"
              required 
              className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-[#7c3aed] transition-colors text-sm"
              placeholder="you@example.com"
            />
          </div>

          {!isResetMode && (
            <div className="flex flex-col gap-2">
              <label className="text-white text-[10px] uppercase tracking-widest font-bold">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required 
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-[#7c3aed] transition-colors text-sm pr-12"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {isRegister && !isResetMode && (
            <div className="flex flex-col gap-2">
              <label className="text-white text-[10px] uppercase tracking-widest font-bold">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword"
                  required 
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-[#7c3aed] transition-colors text-sm pr-12"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#7c3aed] hover:text-white transition-all rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
          >
            {loading ? "Processing..." : isResetMode ? "Send Reset Link" : isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6">
          {!isResetMode && (
            <button 
              type="button"
              onClick={() => { setIsRegister(!isRegister); setErrorMsg(""); }}
              className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-white transition-colors"
            >
              {isRegister ? "Already a User? Login." : "New here? Register."}
            </button>
          )}

          <button 
            type="button"
            onClick={() => { setIsResetMode(!isResetMode); setErrorMsg(""); setSuccessMsg(""); setIsRegister(false); }}
            className="text-[#7c3aed] text-[10px] uppercase tracking-widest hover:text-white transition-colors"
          >
            {isResetMode ? "Return to Login" : "Forgot Password?"}
          </button>
        </div>

      </div>
    </div>
  );
}
