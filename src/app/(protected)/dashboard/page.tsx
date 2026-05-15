import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserAnalytics } from "@/lib/dashboard/analytics"
import DashboardClient from "@/components/dashboard/DashboardClient"

export interface PostPreview {
  slug: string
  title: string
  category: string
}

export interface ReadingHistoryItem {
  id: string
  viewed_at: string
  post: PostPreview | null
}

export interface SavedArticleItem {
  id: string
  created_at: string
  post: PostPreview | null
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // PROFILE
  const { data: profile } = await supabase
    .from("subscribers")
    .select("*")
    .eq("id", user.id)
    .single()

  // ANALYTICS
  const analytics = await getUserAnalytics(user.id)

  // RECENT HISTORY
  const { data: recentHistory } = await supabase
    .from("reading_history")
    .select(`
      id,
      viewed_at,
      post (
        slug,
        title,
        category
      )
    `)
    .eq("user_id", user.id)
    .order("viewed_at", { ascending: false })
    .limit(5)

  // SAVED ARTICLES PREVIEW
  const { data: savedArticles } = await supabase
    .from("saved_articles")
    .select(`
      id,
      created_at,
      post (
        slug,
        title,
        category
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // NORMALIZED HISTORY
  const formattedHistory: ReadingHistoryItem[] =
    (recentHistory || []).map((item: any) => ({
      id: item.id,
      viewed_at: item.viewed_at,
      post: item.posts?.[0] || null,
    }))

  // NORMALIZED SAVED ARTICLES
  const formattedSaved: SavedArticleItem[] =
    (savedArticles || []).map((item: any) => ({
      id: item.id,
      created_at: item.created_at,
      post: item.posts?.[0] || null,
    }))

  // REAL BOOKMARK COUNT
  const { count: savedCount } = await supabase
    .from("saved_articles")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // CONTINUE READING
  const continueReading =
    formattedHistory.length > 0
      ? formattedHistory[0]
      : null

  // DASHBOARD STATS
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
      value: `${analytics.readingStreak} ${
        analytics.readingStreak === 1 ? "day" : "days"
      }`,
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
      userName={
        profile?.full_name ||
        user.email?.split("@")[0] ||
        "Reader"
      }
      stats={stats}
      insights={insights}
      continueReading={continueReading}
      recentHistory={formattedHistory}
      savedArticles={formattedSaved}
    />
  )
}