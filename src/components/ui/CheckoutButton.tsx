"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

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
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize a lightweight browser client to check auth status instantly
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
      // 1. MANDATORY AUTH CHECK: Verify user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setErrorMsg("AUTHENTICATION REQUIRED. REDIRECTING...");
        setTimeout(() => {
          window.location.href = "/auth"; // Ensure this matches your login page URL route
        }, 1500);
        return; 
      }

      // 2. Load Payment Gateway
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setErrorMsg("Failed to load payment gateway. Turn off adblocker.");
        setLoading(false);
        return;
      }

      // 3. Create Secure Order
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (!data.orderId) {
        setErrorMsg(data.error || "Failed to create secure order.");
        setLoading(false);
        return;
      }

      // 4. Open Razorpay
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
        {loading ? "Processing..." : `Secure Checkout — ${totalPrice}`}
      </button>
    </div>
  );
}
