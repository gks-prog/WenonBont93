"use client";

import Link from "next/link";
import { useStore } from "@/lib/store/useStore";

export default function Navbar() {
  const { cart, openCart } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        <Link href="/" className="text-white font-bold tracking-[0.3em] uppercase text-sm">
          WENON BONT
        </Link>

        <div className="flex items-center gap-6">
          <button onClick={openCart} className="text-white text-[10px] uppercase tracking-widest">
            Arsenal ({cart.length})
          </button>
          
          <Link href="/auth" className="text-white text-[10px] uppercase tracking-widest border border-white/20 px-4 py-2">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
