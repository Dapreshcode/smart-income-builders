"use server"

import { createClient } from "@/lib/supabase/server"

export async function saveBookmark(postSlug: string) {
  if (!postSlug) {
    return { ok: false, message: "Missing post slug." }
  }

  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { ok: false, message: "Sign in to save articles." }
  }

  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    post_slug: postSlug,
  })

  if (error) {
    if (error.code === "23505") {
      return { ok: true, message: "Article already saved." }
    }

    return { ok: false, message: error.message }
  }

  return { ok: true, message: "Article saved." }
}

export async function removeBookmark(postSlug: string) {
  if (!postSlug) {
    return { ok: false, message: "Missing post slug." }
  }

  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { ok: false, message: "Sign in to manage bookmarks." }
  }

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", user.id)
    .eq("post_slug", postSlug)

  if (error) {
    return { ok: false, message: error.message }
  }

  return { ok: true, message: "Bookmark removed." }
}

export async function getBookmarkState(postSlug: string) {
  if (!postSlug) return false

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("post_slug", postSlug)
    .maybeSingle()

  if (error) return false

  return !!data
}