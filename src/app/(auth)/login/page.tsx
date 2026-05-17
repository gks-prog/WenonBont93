"use client";

import { useState } from "react";
import { loginUser, registerUser, resetPassword } from "@/app/actions/auth";

export default function AuthPage() {
  // These are the state variables the compiler said were missing
  const [isResetMode, setIsResetMode] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      if (isResetMode) {
        const res = await resetPassword(formData);
        if (res?.error) setErrorMsg(res.error);
        if (res?.success) setSuccessMsg(res.success);
      } else if (isRegister) {
        const res = await registerUser(formData);
        if (res?.error) setErrorMsg(res.error);
      } else {
        const res = await loginUser(formData);
        if (res?.error) setErrorMsg(res.error);
      }
    } catch (err) {
      setErrorMsg("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white uppercase tracking-widest">
            {isResetMode ? "Recover Access" : isRegister ? "Join the Arsenal" : "Client Portal"}
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
              <input 
                type="password" 
                name="password"
                required 
                className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-[#7c3aed] transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#7c3aed] hover:text-white transition-all rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
          >
            {loading ? "Processing..." : isResetMode ? "Send Reset Link" : isRegister ? "Create Account" : "Authenticate"}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6">
          {!isResetMode && (
            <button 
              onClick={() => { setIsRegister(!isRegister); setErrorMsg(""); }}
              className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-white transition-colors"
            >
              {isRegister ? "Already a User? Sign In." : "New here? Create an account."}
            </button>
          )}

          <button 
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
