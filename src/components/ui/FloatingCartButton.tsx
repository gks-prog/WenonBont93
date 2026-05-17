"use client";

import { useStore } from "@/lib/store/useStore";

export function FloatingCartButton() {
  const { cart, isCartOpen, toggleCart } = useStore();

  // Hide if cart is empty or if the cart drawer is currently open
  if (cart.length === 0) return null;

  return (
    <button
      data-cart-toggle
      onClick={toggleCart}
      className={`lg:hidden fixed bottom-6 left-6 z-[80] w-14 h-14 bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/10 active:scale-95 ${
        isCartOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
      }`}
    >
      <div className="relative">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span className="absolute -top-2 -right-3 w-5 h-5 bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg border-2 border-[#111111]">
          {cart.length}
        </span>
      </div>
    </button>
  );
}
