"use client";

import { useStore } from "@/lib/store/useStore";

// ... PACKS array remains the same ...

export function SamplePacks() {
  const { addToCart } = useStore();

  return (
    // ... layout remains the same down to the button ...
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                  <button 
                    onClick={() => addToCart({ id: pack.id, title: pack.title, price: pack.price, image: pack.image, type: 'Pack' })}
                    className="px-8 py-3 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
                  >
                    Add to Cart - {pack.price}
                  </button>
                </div>
    // ... rest of the code remains the same ...
  );
}
