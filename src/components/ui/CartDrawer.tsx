"use client";

import { useStore } from "@/lib/store/useStore";

export function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useStore();

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />

      {/* Slide-out Drawer */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[120] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-white font-bold tracking-widest uppercase">Your Cart ({cart.length})</h2>
          <button onClick={toggleCart} className="text-white/50 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.length === 0 ? (
            <p className="text-[#a1a1aa] text-center mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-4 items-center bg-[#111111] p-3 rounded-lg border border-white/5">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <h4 className="text-white font-bold text-sm tracking-tight">{item.title}</h4>
                  <span className="text-[#a1a1aa] text-xs uppercase">{item.type}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-white font-medium">{item.price}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500/80 hover:text-red-500 text-xs uppercase tracking-widest font-bold">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/5 bg-[#0a0a0a]">
          <button className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-[#7c3aed] hover:text-white transition-colors duration-300 mb-3">
            Secure Checkout
          </button>
          <button onClick={toggleCart} className="w-full py-4 bg-transparent border border-white/20 text-white font-bold tracking-widest uppercase text-sm rounded-sm hover:border-white transition-colors duration-300">
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
