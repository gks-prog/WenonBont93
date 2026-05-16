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
    { name: "Home", path: "/" }, // Added Home
    { name: "Portfolio", path: "/portfolio" },
    { name: "Beats", path: "/beats" },
    { name: "Sample Packs", path: "/sample-packs" },
    { name: "Courses", path: "/courses" },
  ];

  return (
    <header className={`fixed top-0 w-full z-[90] transition-all duration-700 ${scrolled ? "bg-white/[0.02] backdrop-blur-3xl backdrop-saturate-150 border-b border-white/10 py-4 shadow-2xl" : "bg-gradient-to-b from-black/80 to-transparent py-6"}`}>
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,3rem)] flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl md:text-2xl tracking-tighter hover:text-[#7c3aed] transition-colors duration-500">WENON BONT</Link>
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
      </div>
    </header>
  );
}
