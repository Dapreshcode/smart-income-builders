"use client"

import { useEffect } from "react"
import { trackReadingHistory } from "@/app/actions/reading-History"

export default function TrackArticleView({
  slug,
  title,
  category,
}: {
  slug: string
  title: string
  category: string
}) {
  useEffect(() => {
    trackReadingHistory({
      postSlug: slug,
      postTitle: title,
      postCategory: category,
    })
  }, [slug, title, category])

  return null
}