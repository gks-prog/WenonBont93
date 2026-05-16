import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe securely on the server
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10', // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body; // Array of items from your Zustand Cart

    // Format your cart items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image], // Optional: Show the pack/beat artwork in checkout
        },
        // Stripe expects amounts in cents (e.g., $29.99 -> 2999)
        unit_amount: Math.round(parseFloat(item.price.replace('$', '')) * 100),
      },
      quantity: 1,
    }));

    // Create the session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart?canceled=true`,
      // Optional: Pass metadata like the track ID to fulfill the order later via Webhooks
      metadata: {
        orderType: 'digital_download'
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
