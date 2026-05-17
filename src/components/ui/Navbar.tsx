"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store/useStore";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cart, toggleCart } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Beats", path: "/beats" },
    { name: "Sample Packs", path: "/sample-packs" },
    { name: "Courses", path: "/courses" },
  ];

  return (
    <header className={`fixed top-0 w-full z-[90] transition-all duration-700 ${scrolled ? "bg-white/[0.02] backdrop-blur-3xl backdrop-saturate-150 border-b border-white/10 py-4 shadow-2xl" : "bg-gradient-to-b from-black/80 to-transparent py-6"}`}>
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,3rem)] flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl md:text-2xl tracking-tighter hover:text-[#7c3aed] transition-colors duration-500">WENON BONT</Link>
        
        <div className="flex items-center gap-6 lg:gap-10">
          <nav className="hidden lg:flex gap-10 items-center">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-colors ${pathname === link.path ? "text-[#7c3aed]" : "text-[#a1a1aa] hover:text-white"}`}>
                {link.name}
              </Link>
            ))}
            <Link href="/login" className="ml-4 text-[10px] tracking-[0.2em] uppercase font-bold text-white px-8 py-3 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 rounded-sm">
              Login/Register
            </Link>
          </nav>

          {/* Luxury Cart Trigger */}
          <button 
            data-cart-toggle
            onClick={toggleCart}
            className="relative p-2 text-white/70 hover:text-white transition-colors duration-300 group"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-105 transition-transform">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7c3aed] text-white text-[8px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)] border border-[#0a0a0a]">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
