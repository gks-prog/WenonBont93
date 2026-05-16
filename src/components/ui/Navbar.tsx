"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-[90] transition-all duration-700 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5 py-4"
          : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,3rem)] flex justify-between items-center">
        <Link 
          href="/" 
          className="text-white font-bold text-xl md:text-2xl tracking-tighter hover:text-[#7c3aed] transition-colors duration-500"
        >
          WENON BONT
        </Link>

        <nav className="hidden md:flex gap-10 items-center">
          {["Portfolio", "Beats", "Samples"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-[0.15em] uppercase font-medium text-[#a1a1aa] hover:text-white transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <button className="text-xs tracking-[0.15em] uppercase font-medium text-white px-6 py-2.5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500">
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
