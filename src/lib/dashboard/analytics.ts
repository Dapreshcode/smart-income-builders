"use server"

import { createClient } from "@/lib/supabase/server"

interface ReadingHistoryRow {
  viewed_at: string
  post_category: string | null
}

export async function getUserAnalytics(userId: string) {
  const supabase = await createClient()

  // TOTAL ARTICLES READ
  const { count: totalRead } = await supabase
    .from("reading_history")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)

  // CATEGORY DATA
  const { data: categories } = await supabase
    .from("reading_history")
    .select("post_category")
    .eq("user_id", userId)

  // FILTER NULLS
  const validCategories =
    categories
      ?.map((c) => c.post_category)
      .filter(Boolean) || []

  const uniqueCategories = new Set(validCategories)

  // LAST 30 DAYS
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: recentReads } = await supabase
    .from("reading_history")
    .select("viewed_at")
    .eq("user_id", userId)
    .gte("viewed_at", thirtyDaysAgo.toISOString())
    .order("viewed_at", { ascending: true })

  // STREAK
  const readingStreak = calculateReadingStreak(
    (recentReads || []) as { viewed_at: string }[]
  )

  // TODAY READS
  const today = new Date().toISOString().split("T")[0]

  const { count: todayReads } = await supabase
    .from("reading_history")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("viewed_at", `${today}T00:00:00`)
    .lte("viewed_at", `${today}T23:59:59`)

  // TOP CATEGORY
  const categoryCount = new Map<string, number>()

  validCategories.forEach((category) => {
    categoryCount.set(
      category,
      (categoryCount.get(category) || 0) + 1
    )
  })

  let topCategory = "Getting Started"
  let maxCount = 0

  categoryCount.forEach((count, category) => {
    if (count > maxCount) {
      maxCount = count
      topCategory = category
    }
  })

  return {
    totalRead: totalRead || 0,
    uniqueCategories: uniqueCategories.size,
    readingStreak,
    todayReads: todayReads || 0,
    topCategory,
    lastReadAt:
      recentReads?.[recentReads.length - 1]?.viewed_at || null,
  }
}

function calculateReadingStreak(
  reads: { viewed_at: string }[]
): number {
  if (reads.length === 0) return 0

  // UNIQUE DAYS
  const readDates = new Set(
    reads.map((r) => r.viewed_at.split("T")[0])
  )

  let streak = 0

  const currentDate = new Date()

  while (true) {
    const dateStr = currentDate.toISOString().split("T")[0]

    if (readDates.has(dateStr)) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}