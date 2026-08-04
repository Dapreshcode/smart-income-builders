import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserAnalytics } from "@/lib/dashboard/analytics"
import DashboardClient from "@/components/dashboard/DashboardClient"

export interface ReadingHistoryItem {
  id: string
  viewed_at: string
  post_slug: string
  post_title: string
  post_category: string | null
}

export interface SavedArticleItem {
  id: string
  created_at: string
  post_slug: string
  post_title: string
  post_image: string | null
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const analytics = await getUserAnalytics(user.id)

  // RECENT HISTORY — no join needed, post_slug/title/category live on the row
  const { data: recentHistory } = await supabase
    .from("reading_history")
    .select("id, viewed_at, post_slug, post_title, post_category")
    .eq("user_id", user.id)
    .order("viewed_at", { ascending: false })
    .limit(5)

  // SAVED ARTICLES — same, using bookmarks' own columns
  const { data: savedArticles } = await supabase
    .from("bookmarks")
    .select("id, created_at, post_slug, post_title, post_image")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const formattedHistory: ReadingHistoryItem[] = recentHistory || []
  const formattedSaved: SavedArticleItem[] = savedArticles || []

  const { count: savedCount } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const continueReading = formattedHistory.length > 0 ? formattedHistory[0] : null

  const stats = [
    {
      title: "Articles Read",
      value: analytics.totalRead,
      icon: "BookOpen",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      link: "/history",
      description: "Total articles you've read",
    },
    {
      title: "Saved Articles",
      value: savedCount || 0,
      icon: "Bookmark",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      link: "/saved",
      description: "Articles you've bookmarked",
    },
    {
      title: "Reading Streak",
      value: `${analytics.readingStreak} ${analytics.readingStreak === 1 ? "day" : "days"}`,
      icon: "TrendingUp",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      link: "#",
      description: "Consecutive days reading",
    },
    {
      title: "Learning Paths",
      value: analytics.uniqueCategories,
      icon: "Layers",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      link: "/start-here",
      description: "Topics and systems explored",
    },
  ]

  const insights = {
    topCategory: analytics.topCategory,
    todayReads: analytics.todayReads,
    uniqueCategories: analytics.uniqueCategories,
  }

  return (
    <DashboardClient
      username={profile?.username || user.email?.split("@")[0] || "Reader"}
      fullName={profile?.full_name || null}
      stats={stats}
      insights={insights}
      continueReading={continueReading}
      recentHistory={formattedHistory}
      savedArticles={formattedSaved}
    />
  )
}