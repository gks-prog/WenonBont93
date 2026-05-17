"use server";

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
  const supabase = await createClient();
  const rawEmail = formData.get("email") as string;
  const email = rawEmail ? rawEmail.trim().toLowerCase() : "";
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Invalid email or password. Please try again." };
  
  redirect("/dashboard");
}

export async function registerUser(formData: FormData) {
  const supabase = await createClient();
  const rawEmail = formData.get("email") as string;
  const email = rawEmail ? rawEmail.trim().toLowerCase() : "";
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "This email is already registered. Please sign in." };
    }
    return { error: error.message };
  }
  
  redirect("/dashboard");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const rawEmail = formData.get("email") as string;
  const email = rawEmail ? rawEmail.trim().toLowerCase() : "";

  if (!email) return { error: "Please provide a valid email address." };

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) return { error: error.message };
  
  return { success: "Password reset link sent to your email." };
}
