"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Portfolio", path: "/portfolio" },
    { name: "Beats", path: "/beats" },
    { name: "Sample Packs", path: "/sample-packs" },
    { name: "Courses", path: "/courses" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-[90] transition-all duration-700 ${
        scrolled
          ? "bg-white/[0.02] backdrop-blur-3xl backdrop-saturate-150 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4"
          : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,3rem)] flex justify-between items-center">
        <Link 
          href="/" 
          className="text-white font-bold text-xl md:text-2xl tracking-tighter hover:text-[#7c3aed] transition-colors duration-500 drop-shadow-md"
        >
          WENON BONT
        </Link>

        <nav className="hidden md:flex gap-10 items-center">
          {navLinks.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 drop-shadow-sm ${
                  isActive ? "text-white border-b border-[#7c3aed] pb-1" : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <Link 
            href="/login"
            className="text-xs tracking-[0.15em] uppercase font-medium text-white px-6 py-2.5 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all duration-500"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
