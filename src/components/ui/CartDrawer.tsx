"use client";

import { useStore, Track } from "@/lib/store/useStore";
import { CheckoutButton } from "./CheckoutButton";
import Image from "next/image"; // Next.js native image optimization

export function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, closeCart, toastMessage } = useStore();

  const rawTotal = cart.reduce((acc: number, item: Track) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + (isNaN(priceNum) ? 0 : priceNum * (item.quantity || 1));
  }, 0);
  const formattedTotal = `$${rawTotal.toFixed(2)}`;

  const unpackedCartItems = cart.flatMap(item => 
    Array.from({ length: item.quantity || 1 }, () => item)
  );

  return (
    <>
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[110] px-6 py-3 bg-[#7c3aed] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-500 ease-out ${
        toastMessage ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
      }`}>
        {toastMessage}
      </div>

      {isCartOpen && <div onClick={closeCart} className="fixed inset-0 z-[95] cursor-default" />}

      <div className={`fixed bottom-8 right-4 md:right-8 z-[100] w-[calc(100%-2rem)] md:w-full max-w-sm bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isCartOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"
      }`}>
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <h3 className="text-white font-bold tracking-widest uppercase text-xs">Your Arsenal</h3>
          <span className="bg-[#7c3aed] text-white text-[10px] px-3 py-1 rounded-full font-bold">
            {cart.length} Items
          </span>
        </div>

        <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto mb-6 pr-2 custom-scrollbar relative z-10">
          {cart.length === 0 ? (
            <p className="text-[#a1a1aa] text-xs text-center py-4 uppercase tracking-widest">Arsenal is empty</p>
          ) : (
            cart.map((item: Track, i: number) => (
              <div key={`${item.id}-${i}`} className="flex justify-between items-center gap-4">
                
                {/* BRAND NEW: The Image Thumbnail Container */}
                <div className="w-12 h-12 rounded-md bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 relative">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-white/40">WB</div>
                  )}
                </div>

                <div className="flex-1 truncate">
                  <p className="text-white text-sm font-bold truncate">
                    {item.title} 
                    {item.quantity && item.quantity > 1 && (
                      <span className="text-[#7c3aed] ml-2 text-xs">x{item.quantity}</span>
                    )}
                  </p>
                  <p className="text-[#a1a1aa] text-[10px] uppercase tracking-widest">{item.type}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-white text-sm font-bold">{item.price}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-red-500 transition-colors p-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <CheckoutButton cartItems={unpackedCartItems} totalPrice={formattedTotal} />
      </div>
    </>
  );
}
