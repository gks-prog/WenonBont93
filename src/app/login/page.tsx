"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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
    const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
    const password = formData.get("password") as string;

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setErrorMsg(error.message);
          setLoading(false); 
        } else {
          setSuccessMsg("Account Created! Routing...");
          router.push("/dashboard");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorMsg("Invalid credentials.");
          setLoading(false); 
        } else {
          setSuccessMsg("Logged In! Routing...");
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setErrorMsg("Network error.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-white uppercase text-center mb-6">
          {isRegister ? "Register" : "Login"}
        </h1>

        {errorMsg && <div className="mb-4 text-red-500 text-xs text-center">{errorMsg}</div>}
        {successMsg && <div className="mb-4 text-green-500 text-xs text-center">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" name="email" required placeholder="Email" className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded" />
          <input type="password" name="password" required placeholder="Password" className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded" />
          
          <button type="submit" disabled={loading} className="w-full py-4 bg-white text-black text-xs uppercase font-bold rounded mt-2">
            {loading ? "Processing..." : isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        <button onClick={() => setIsRegister(!isRegister)} className="w-full mt-6 text-[#a1a1aa] text-xs uppercase hover:text-white">
          {isRegister ? "Switch to Login" : "Switch to Register"}
        </button>
      </div>
    </div>
  );
}
