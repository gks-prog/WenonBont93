import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay securely on the server
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    // 1. Calculate the total price safely from your cart strings (e.g., "$49.99")
    const totalAmount = items.reduce((acc: number, item: any) => {
      // Strip out the currency symbol and parse the number
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);

    // 2. Razorpay expects amounts in subunits (e.g., paise for INR, cents for USD)
    // $49.99 * 100 = 4999
    const amountInSubunits = Math.round(totalAmount * 100);

    // 3. Create the secure order
    const options = {
      amount: amountInSubunits,
      currency: "USD", // Change this to "INR" if you are charging in Indian Rupees
      receipt: `rcpt_${Math.random().toString(36).substring(7)}`,
    };

    const order = await razorpay.orders.create(options);
    
    // 4. Send the order details back to the frontend
    return NextResponse.json({ 
      orderId: order.id, 
      amount: options.amount, 
      currency: options.currency 
    });

  } catch (err: any) {
    console.error("Razorpay Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
