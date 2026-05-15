"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function completeOnboarding(
  formData: FormData
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const full_name = formData
    .get("full_name")
    ?.toString()
    .trim()

  const username = formData
    .get("username")
    ?.toString()
    .trim()
    .toLowerCase()

  const bio = formData
    .get("bio")
    ?.toString()
    .trim()

  const website = formData
    .get("website")
    ?.toString()
    .trim()

  const location = formData
    .get("location")
    ?.toString()
    .trim()

  if (!full_name || !username) {
    throw new Error(
      "Full name and username are required"
    )
  }

  const usernameRegex = /^[a-z0-9_]+$/

  if (!usernameRegex.test(username)) {
    throw new Error(
      "Username can only contain lowercase letters, numbers, and underscores"
    )
  }

  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", user.id)
    .maybeSingle()

  if (existingUser) {
    throw new Error("Username already taken")
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      username,
      bio,
      website,
      location,
      onboarding_completed: true,
    })
    .eq("id", user.id)

  if (error) {
    throw error
  }

  redirect("/dashboard")
}