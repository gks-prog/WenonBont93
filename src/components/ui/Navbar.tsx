"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-surface/50 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      {/* clamp() inline padding for fluid container edges */}
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1rem,5vw,3rem)] flex justify-between items-center">
        <Link 
          href="/" 
          className="text-primary font-bold text-xl tracking-tighter hover:text-accent transition-colors duration-300 z-50 relative"
        >
          WENON BONT
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {["Portfolio", "Beats", "Samples", "Studio"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors py-2"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle - Minimum 44x44px touch target */}
        <button 
          className="md:hidden relative z-50 p-2 -mr-2 text-primary focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-primary transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block h-px bg-primary transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-px bg-primary transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 transition-opacity duration-500 md:hidden flex items-center justify-center ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <nav className="flex flex-col gap-8 items-center">
            {["Portfolio", "Beats", "Samples", "Studio"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-fluid-h2 font-medium text-secondary hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
