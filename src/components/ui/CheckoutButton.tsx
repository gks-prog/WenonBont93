"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutButtonProps {
  cartItems: any[];
  totalPrice: string;
}

export function CheckoutButton({ cartItems, totalPrice }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // We now track exact errors

  // Native script injection bypasses Next.js rendering issues
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setErrorMsg("Failed to load payment gateway. Turn off adblocker.");
        setLoading(false);
        return;
      }

      // Ask Backend for Order ID
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (!data.orderId) {
        // This will print EXACTLY what is failing on the server
        setErrorMsg(data.error || "Failed to create secure order.");
        setLoading(false);
        return;
      }

      // Open Razorpay Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: data.currency,
        name: "WENON BONT",
        description: "Secure Audio License Checkout",
        order_id: data.orderId,
        theme: { color: "#7c3aed" },
        handler: function (response: any) {
          window.location.href = "/dashboard?success=true";
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        setErrorMsg("Transaction declined or cancelled.");
        setLoading(false);
      });
      paymentObject.open();

    } catch (error) {
      setErrorMsg("Network error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* If an error happens, we will now see it rendered here */}
      {errorMsg && (
        <div className="text-red-500 text-[10px] text-center font-bold tracking-widest uppercase p-2 border border-red-500/20 bg-red-500/10 rounded-md">
          {errorMsg}
        </div>
      )}
      <button 
        onClick={handleCheckout}
        disabled={loading || cartItems.length === 0}
        className="w-full mt-4 py-5 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#7c3aed] hover:text-white transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        {loading ? "Encrypting Transaction..." : `Secure Checkout — ${totalPrice}`}
      </button>
    </div>
  );
}
