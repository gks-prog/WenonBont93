"use client";

import { useStore } from "@/lib/store/useStore";
import { CheckoutButton } from "./CheckoutButton";

export function CartDrawer() {
  // Assuming your Zustand store has these properties
  const { cart, removeFromCart } = useStore() as any; 
  
  // Calculate total safely
  const rawTotal = cart.reduce((acc: number, item: any) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return acc + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);
  const formattedTotal = `$${rawTotal.toFixed(2)}`;

  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] w-full max-w-sm bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h3 className="text-white font-bold tracking-widest uppercase text-xs">Your Arsenal</h3>
        <span className="bg-[#7c3aed] text-white text-[10px] px-3 py-1 rounded-full font-bold">{cart.length}</span>
      </div>

      <div className="flex flex-col gap-4 max-h-60 overflow-y-auto mb-6 pr-2">
        {cart.map((item: any, i: number) => (
          <div key={`${item.id}-${i}`} className="flex justify-between items-center gap-4">
            <div className="flex-1 truncate">
              <p className="text-white text-sm font-bold truncate">{item.title}</p>
              <p className="text-[#a1a1aa] text-[10px] uppercase tracking-widest">{item.type}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">{item.price}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 transition-colors">
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
