"use client";

import { useEffect, useRef } from "react";
import { useStore, Track } from "@/lib/store/useStore";
import { CheckoutButton } from "./CheckoutButton";

export function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, closeCart } = useStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // 1. Auto-close on scroll
  useEffect(() => {
    if (!isCartOpen) return;
    const handleScroll = () => closeCart();
    
    // Add small delay to prevent immediate close if the add-to-cart button caused a layout shift
    const timeout = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 100);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCartOpen, closeCart]);

  // 2. Auto-close on click outside
  useEffect(() => {
    if (!isCartOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      // Ignore clicks on navbar cart button or mobile floating button
      const target = e.target as HTMLElement;
      if (target.closest('[data-cart-toggle]')) return;
      
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        closeCart();
      }
    };
    
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isCartOpen, closeCart]);

  const rawTotal = cart.reduce((acc: number, item: Track) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return acc + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);
  const formattedTotal = `$${rawTotal.toFixed(2)}`;

  return (
    <div 
      ref={drawerRef}
      className={`fixed bottom-8 right-4 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-full max-w-sm bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isCartOpen && cart.length > 0
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h3 className="text-white font-bold tracking-widest uppercase text-xs">Your Arsenal</h3>
        <span className="bg-[#7c3aed] text-white text-[10px] px-3 py-1 rounded-full font-bold">
          {cart.length}
        </span>
      </div>

      <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto mb-6 pr-2 custom-scrollbar">
        {cart.map((item: Track, i: number) => (
          <div key={`${item.id}-${i}`} className="flex justify-between items-center gap-4">
            <div className="flex-1 truncate">
              <p className="text-white text-sm font-bold truncate">{item.title}</p>
              <p className="text-[#a1a1aa] text-[10px] uppercase tracking-widest">{item.type}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">{item.price}</span>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-white/40 hover:text-red-500 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <CheckoutButton cartItems={cart} totalPrice={formattedTotal} />
    </div>
  );
}
