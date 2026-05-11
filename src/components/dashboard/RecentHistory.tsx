"use client"

import Link from "next/link"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"

interface HistoryItem {
  id: string
  viewed_at: string
  post: {
    slug: string
    title: string
    category: string
  } | null
}

export default function RecentHistory({
  history,
}: {
  history: HistoryItem[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Recent History
        </h3>

        <Link
          href="/history"
          className="text-xs text-orange-400 transition hover:text-orange-300"
        >
          View all →
        </Link>
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-gray-400">
          No reading history yet.
        </p>
      ) : (
        <div className="space-y-3">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            >
              <Link
                href={`/blog/${item.post?.slug}`}
                className="block rounded-xl border border-white/5 bg-white/5 p-3 transition hover:bg-white/10"
              >
                <p className="text-[10px] uppercase tracking-wide text-orange-300">
                  {item.post?.category}
                </p>

                <h4 className="mt-1 line-clamp-2 text-sm font-medium text-white">
                  {item.post?.title}
                </h4>

                <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />

                  {new Date(item.viewed_at).toLocaleDateString()}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}