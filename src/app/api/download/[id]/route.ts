import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // <-- Next.js 15 requirement: params is a Promise
) {
  // Await the params before extracting the ID
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const supabase = await createClient();

  // 1. Verify User is Logged In
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  // 2. Verify User Actually Purchased This Item
  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (!purchase) return new NextResponse("Payment Required", { status: 403 });

  // 3. Get the Secure File Path from the Product
  const { data: product } = await supabase
    .from("products")
    .select("secure_file_url")
    .eq("id", productId)
    .single();

  if (!product || !product.secure_file_url) {
    return new NextResponse("File Not Found", { status: 404 });
  }

  // 4. Generate a temporary, expiring signed URL from Supabase Private Storage
  const { data: signedUrlData, error } = await supabase
    .storage
    .from("secure-assets") // Your private bucket name
    .createSignedUrl(product.secure_file_url, 60); // Expires in 60 seconds

  if (error || !signedUrlData) {
    return new NextResponse("Error generating download link", { status: 500 });
  }

  // 5. Redirect the user to the secure download
  return NextResponse.redirect(signedUrlData.signedUrl);
}
