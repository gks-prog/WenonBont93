import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    const totalAmount = items.reduce((acc: number, item: any) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);

    const amountInSubunits = Math.round(totalAmount * 100);

    // 1. Manually encode your API keys for HTTP Basic Auth
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    // 2. Make a raw fetch request directly to Razorpay's REST API
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        amount: amountInSubunits,
        currency: "USD", // Or "INR"
        receipt: `rcpt_${Math.random().toString(36).substring(7)}`,
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      throw new Error(order.error?.description || "Failed to create Razorpay order");
    }

    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency 
    });

  } catch (err: any) {
    console.error("Razorpay Raw API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
