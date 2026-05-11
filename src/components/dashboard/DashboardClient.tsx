"use client"

import Link from "next/link"
import {
  BookOpen,
  Bookmark,
  TrendingUp,
  Calendar,
  Target,
  Award,
  ArrowRight,
  Layers,
} from "lucide-react"

import RecentHistory from "./RecentHistory"
import SavedArticlesPreview from "./SaveArticlesPreview"
import StatsCard from "./StatsCard"

import { motion } from "framer-motion"

const iconMap = {
  BookOpen,
  Bookmark,
  TrendingUp,
  Calendar,
  Target,
  Award,
  ArrowRight,
  Layers,
}

interface PostPreview {
  slug: string
  title: string
  category: string
}

interface ReadingHistoryItem {
  id: string
  viewed_at: string
  post: PostPreview | null
}

interface SavedArticleItem {
  id: string
  created_at: string
  post: PostPreview | null
}

interface DashboardClientProps {
  userName: string
  stats: Array<{
    title: string
    value: string | number
    icon: string
    color: string
    bgColor: string
    link: string
    description: string
  }>
  insights: {
    topCategory: string
    todayReads: number
    uniqueCategories: number
  }
  continueReading: ReadingHistoryItem | null
  recentHistory: ReadingHistoryItem[]
  savedArticles: SavedArticleItem[]
}

export default function DashboardClient({
  userName,
  stats,
  insights,
  continueReading,
  recentHistory,
  savedArticles,
}: DashboardClientProps) {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white mt-15">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* WELCOME */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-orange-300">
            Dashboard Overview
          </p>

          <h1 className="text-4xl font-bold text-white">
            Welcome back, {userName}
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300 leading-7">
            Continue learning, track your progress, and move deeper into the systems that matter most.
          </p>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const IconComponent =
              iconMap[stat.icon as keyof typeof iconMap]

            return (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={IconComponent}
                color={stat.color}
                bgColor={stat.bgColor}
                link={stat.link}
                description={stat.description}
                delay={index * 0.08}
              />
            )
          })}
        </motion.div>

        {/* CONTINUE READING */}
        {continueReading && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mb-12 overflow-hidden rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent p-7"
          >
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-orange-300">
              Continue Reading
            </p>

            <h2 className="text-2xl font-bold text-white">
              {continueReading.post?.title}
            </h2>

            <p className="mt-3 text-sm text-gray-300">
              Continue where you stopped and keep building momentum.
            </p>

            <Link
              href={`/blog/${continueReading.post?.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Resume Article
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

        {/* INSIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mb-12 rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-6"
        >
          <h3 className="mb-5 text-lg font-semibold text-white">
            Reading Insights
          </h3>

          <div className="grid gap-5 sm:grid-cols-3">

            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-orange-400" />

              <div>
                <p className="text-sm text-gray-400">
                  Top Category
                </p>

                <p className="text-lg font-semibold text-white">
                  {insights.topCategory}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-400" />

              <div>
                <p className="text-sm text-gray-400">
                  Today's Reads
                </p>

                <p className="text-lg font-semibold text-white">
                  {insights.todayReads} article
                  {insights.todayReads !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-green-400" />

              <div>
                <p className="text-sm text-gray-400">
                  Categories Explored
                </p>

                <p className="text-lg font-semibold text-white">
                  {insights.uniqueCategories}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACTIVITY */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentHistory history={recentHistory.map(item => ({
            id: item.id,
            viewed_at: item.viewed_at,
            post: item.post
          }))} />
          <SavedArticlesPreview articles={savedArticles.map(item => ({
            id: item.id,
            created_at: item.created_at,
            post: item.post
          }))} />
        </div>

        {/* QUICK ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-orange-500/10 to-transparent p-6"
        >
          <h3 className="mb-3 text-lg font-semibold text-white">
            Continue Your Journey
          </h3>

          <p className="mb-5 max-w-2xl text-gray-300">
            Explore more systems, strategies, and structured learning paths designed to help you grow.
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              href="/blog"
              className="inline-flex rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Browse Blog
            </Link>

            <Link
              href="/start-here"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Explore Learning Paths
            </Link>

            <Link
              href="/history"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Reading History
            </Link>

          </div>
        </motion.div>

      </div>
    </main>
  )
}