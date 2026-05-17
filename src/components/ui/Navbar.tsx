"use client";

import Link from "next/link";
import { useStore } from "@/lib/store/useStore";
// Make sure this file actually exists in this folder!
import { AuthNavButton } from "./AuthNavButton"; 

export const Navbar = () => {
  const { cart, openCart } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        <Link href="/" className="text-white font-bold tracking-[0.3em] uppercase text-sm hover:text-[#7c3aed] transition-colors">
          WENON BONT
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/beats" className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-white transition-colors">Beats</Link>
          <Link href="/kits" className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-white transition-colors">Sound Kits</Link>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={openCart}
            className="text-white flex items-center gap-2 hover:text-[#7c3aed] transition-colors group"
          >
            <span className="text-[10px] uppercase tracking-widest hidden sm:block">Arsenal</span>
            <div className="relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7c3aed] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </button>

          <AuthNavButton />
          
        </div>
      </div>
    </nav>
  );
};
