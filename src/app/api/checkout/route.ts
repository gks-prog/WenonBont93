import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    // 1. Safely calculate total
    let totalAmount = 0;
    items.forEach((item: any) => {
      const price = parseFloat(String(item.price).replace(/[^0-9.-]+/g, ""));
      if (!isNaN(price)) totalAmount += price;
    });

    const amountInSubunits = Math.round(totalAmount * 100);

    // 2. Fetch Keys securely
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    
    if (!keyId || !keySecret) {
       return NextResponse.json({ error: "Missing Razorpay Keys in Vercel" }, { status: 500 });
    }

    // 3. Raw Native API Request to Razorpay
    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        amount: amountInSubunits,
        currency: "USD", // Change to INR if needed
        receipt: `rcpt_${Math.random().toString(36).substring(7)}`,
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: order.error?.description || "Order Failed" }, { status: 400 });
    }

    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency 
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
