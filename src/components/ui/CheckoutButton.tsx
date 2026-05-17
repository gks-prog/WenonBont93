"use client";

import { useState } from "react";
import Script from "next/script";

// Satisfy strict TypeScript for the injected window.Razorpay object
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

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);

    try {
      // 1. Ask the backend to create a secure order
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (!data.orderId) {
        console.error("Order creation failed");
        setLoading(false);
        return;
      }

      // 2. Configure the Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your public key
        amount: data.amount,
        currency: data.currency,
        name: "WENON BONT",
        description: "Secure Audio License Checkout",
        order_id: data.orderId,
        theme: {
          color: "#7c3aed", // Matches your cinematic purple branding
        },
        handler: function (response: any) {
          // 3. Payment Successful -> Redirect to Dashboard
          // response.razorpay_payment_id contains the transaction receipt
          window.location.href = "/dashboard?success=true";
        },
      };

      // 4. Open the UI overlay
      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on("payment.failed", function (response: any) {
        console.error("Payment Failed", response.error.description);
        setLoading(false);
      });

      paymentObject.open();

    } catch (error) {
      console.error("Network error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Inject the Razorpay logic into the Next.js document */}
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <button 
        onClick={handleCheckout}
        disabled={loading || cartItems.length === 0}
        className="w-full py-5 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#7c3aed] hover:text-white transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]"
      >
        {loading ? "Encrypting Transaction..." : `Secure Checkout — ${totalPrice}`}
      </button>
    </>
  );
}
