"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function trackReadingHistory({
  postSlug,
  postTitle,
  postCategory,
}: {
  postSlug: string
  postTitle: string
  postCategory: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return
  }

  const { error } = await supabase
    .from("reading_history")
    .upsert(
      {
        user_id: user.id,
        post_slug: postSlug,
        post_title: postTitle,
        post_category: postCategory,
        viewed_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,post_slug",
      }
    )

  if (error) {
    console.error("Reading history error:", error.message)
  }
}

export async function deleteHistoryItem(historyId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { error, data } = await supabase
    .from("reading_history")
    .delete()
    .eq("id", historyId)
    .eq("user_id", user.id)
    .select()

  if (error) {
    console.error("Delete history error:", error)
    throw new Error(`Failed to delete history item: ${error.message}`)
  }

  console.log("Deleted item:", data)
  revalidatePath("/history")
  return { success: true }
}

export async function clearAllHistory() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("No user found")
    throw new Error("Unauthorized - No user found")
  }

  console.log("Clearing history for user:", user.id)

  const { error, data, count } = await supabase
    .from("reading_history")
    .delete()
    .eq("user_id", user.id)
    .select()

  if (error) {
    console.error("Clear history error:", error)
    throw new Error(`Failed to clear history: ${error.message}`)
  }

  console.log(`Deleted ${data?.length || 0} history items`)
  revalidatePath("/history")
  return { success: true, deletedCount: data?.length || 0 }
}