"use server"

import { createClient } from "@/lib/supabase/server"

type SubscribeInput = {
  email: string
  source?: string
  categoryInterest?: string | null
  postSlug?: string | null
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export async function subscribeToNewsletter({
  email,
  source = "unknown",
  categoryInterest = null,
  postSlug = null,
}: SubscribeInput) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail) {
    return { ok: false, message: "Email is required." }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("subscribers").insert({
    email: normalizedEmail,
    source,
    category_interest: categoryInterest,
    post_slug: postSlug,
  })

  if (error) {
    if (error.code === "23505") {
      return { ok: true, message: "You are already subscribed." }
    }

    return { ok: false, message: error.message }
  }

  return { ok: true, message: "Subscribed successfully." }
}



export async function subscribeToCategoryOnly({
  email,
  categorySlug,
  source = "post",
  postSlug = null,
}: {
  email: string
  categorySlug: string
  source?: string
  postSlug?: string | null
}) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !categorySlug) {
    return { ok: false, message: "Missing required fields." }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("category_subscriptions").insert({
    email: normalizedEmail,
    category_slug: categorySlug,
    source,
    post_slug: postSlug,
  })

  if (error) {
    if (error.code === "23505") {
      return { ok: true, message: "You are already subscribed to this category." }
    }

    return { ok: false, message: error.message }
  }

  return { ok: true, message: "Category subscription saved." }
}