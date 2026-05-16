"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// 1. Process a Purchase
export async function purchaseProduct(productId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("You must be logged in to purchase.");

  const { error } = await supabase
    .from("purchases")
    .insert({ user_id: user.id, product_id: productId });

  if (error) {
    if (error.code === '23505') return { success: true, message: "Already purchased" };
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  return { success: true };
}

// 2. Admin: Upload a new Beat or Pack
export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const newProduct = {
    title: formData.get("title") as string,
    type: formData.get("type") as string, // 'Beat', 'Pack', or 'Course'
    price: parseFloat(formData.get("price") as string),
    image_url: formData.get("image_url") as string,
    audio_url: formData.get("audio_url") as string,
    secure_file_url: formData.get("secure_file_url") as string, // Protected file path in Supabase Storage
  };

  const { error } = await supabase.from("products").insert(newProduct);
  if (error) throw new Error(error.message);

  revalidatePath("/beats");
  revalidatePath("/sample-packs");
  return { success: true };
}
