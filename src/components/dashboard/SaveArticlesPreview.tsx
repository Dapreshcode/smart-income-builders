"use client"

import Link from "next/link"
import { Bookmark } from "lucide-react"
import { motion } from "framer-motion"

interface SavedArticleItem {
  id: string
  created_at: string
  post_slug: string
  post_title: string
  post_image: string | null
}

export default function SavedArticlesPreview({
  articles,
}: {
  articles: SavedArticleItem[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Saved Articles
        </h3>

        <Link
          href="/saved"
          className="text-xs text-orange-400 transition hover:text-orange-300"
        >
          View all →
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-sm text-gray-400">
          No saved articles yet.
        </p>
      ) : (
        <div className="space-y-3">
          {articles.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            >
              <Link
                href={`/blog/${item.post_slug}`}
                className="block rounded-xl border border-white/5 bg-white/5 p-3 transition hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  {item.post_image && (
                    <img
                      src={item.post_image}
                      alt=""
                      className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                    />
                  )}

                  <div className="flex-1">
                    <h4 className="line-clamp-2 text-sm font-medium text-white">
                      {item.post_title}
                    </h4>
                  </div>

                  <Bookmark className="ml-2 h-4 w-4 flex-shrink-0 text-orange-400" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}