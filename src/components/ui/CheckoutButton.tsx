"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  cartItems: any[]; // Pass your Zustand cart state here
  totalPrice: string;
}

export function CheckoutButton({ cartItems, totalPrice }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect the user to the secure Stripe portal
        window.location.href = data.url;
      } else {
        console.error("Checkout failed:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading || cartItems.length === 0}
      className="w-full py-5 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#7c3aed] hover:text-white transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    >
      {loading ? "Processing..." : `Checkout — ${totalPrice}`}
    </button>
  );
}
