"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"


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

  const avatar = formData.get("avatar") as File | null

  let avatar_url: string | null = null

  if (avatar && avatar.size > 0) {
    const fileExt = avatar.name.split(".").pop()

    const fileName = `${user.id}-${uuidv4()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar)

    if (uploadError) {
      throw uploadError
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName)

    avatar_url = publicUrl
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
  avatar_url,
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


export async function updateProfile(
  formData: FormData
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // FORM VALUES
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

  const avatar = formData.get("avatar") as File

  // VALIDATION
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

  // CHECK EXISTING USERNAME
  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", user.id)
    .maybeSingle()

  if (existingUser) {
    throw new Error("Username already taken")
  }

  // GET CURRENT PROFILE
  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .maybeSingle()

  let avatar_url =
    currentProfile?.avatar_url || null

  // NEW AVATAR UPLOAD
  if (avatar && avatar.size > 0) {
    const fileExt = avatar.name
      .split(".")
      .pop()

    const fileName =
      `${user.id}-${Date.now()}.${fileExt}`

    const { error: uploadError } =
      await supabase.storage
        .from("avatars")
        .upload(fileName, avatar)

    if (uploadError) {
      throw uploadError
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName)

    avatar_url = publicUrl
  }

  // UPDATE PROFILE
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      username,
      bio,
      website,
      location,
      avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    throw error
  }
}