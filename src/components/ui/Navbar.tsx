"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store/useStore";
import { AuthNavButton } from "./AuthNavButton";

export const Navbar = () => {
  const { cart, openCart } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define your navigation links here so they are easy to manage
  const navLinks = [
    { name: "Beats", href: "/beats" },
    { name: "Sound Kits", href: "/kits" },
    { name: "Services", href: "/services" }, // Add any missing sections here
    { name: "Licensing", href: "/licensing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* LEFT: LOGO */}
          <Link href="/" className="text-white font-black tracking-[0.3em] uppercase text-sm md:text-base hover:text-[#7c3aed] transition-colors z-50">
            WENON BONT
          </Link>

          {/* CENTER: DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[#a1a1aa] text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#7c3aed] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-4 md:gap-6 z-50">
            
            {/* Cart Trigger */}
            <button 
              onClick={openCart}
              className="text-white flex items-center gap-2 hover:text-[#7c3aed] transition-colors group"
            >
              <span className="text-[10px] uppercase tracking-widest hidden sm:block font-bold">Arsenal</span>
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#7c3aed] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                    {cart.length}
                  </span>
                )}
              </div>
            </button>

            {/* Dynamic Circular User Avatar / Login */}
            <AuthNavButton />

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 focus:outline-none"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
            
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-40 md:hidden transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-lg uppercase tracking-[0.3em] font-bold hover:text-[#7c3aed] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
