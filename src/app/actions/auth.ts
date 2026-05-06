"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function validatePassword(password: string) {
  return password.length >= 8
}

export async function signUpWithEmail(formData: FormData) {
  const email = normalizeEmail(String(formData.get("email") || ""))
  const password = String(formData.get("password") || "")
  const confirmPassword = String(formData.get("confirmPassword") || "")

  if (!email) {
    return { ok: false, message: "Email is required." }
  }

  if (!validatePassword(password)) {
    return { ok: false, message: "Password must be at least 8 characters." }
  }

  if (password !== confirmPassword) {
    return { ok: false, message: "Passwords do not match." }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL='https://smart-income-builders.vercel.app/'}/auth/callback`,
    },
  })

  if (error) {
    return { ok: false, message: error.message }
  }

  return {
    ok: true,
    message: "Check your email to confirm your account.",
  }
}

export async function signInWithEmail(formData: FormData) {
  const email = normalizeEmail(String(formData.get("email") || ""))
  const password = String(formData.get("password") || "")

  if (!email || !password) {
    return { ok: false, message: "Email and password are required." }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { ok: false, message: error.message }
  }

  redirect("/account")
}

export async function signOutUser() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}