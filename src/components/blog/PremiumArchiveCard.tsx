"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock3 } from "lucide-react"

type PremiumArchiveCardProps = {
  title: string
  description?: string
  image?: string
  category?: string
  date?: string
  readingTime?: string
  slug: string
  tags?: string[]
  onTagClick?: (tag: string) => void
  tall?: boolean
}

export default function PremiumArchiveCard({
  title,
  description,
  image,
  category,
  date,
  readingTime,
  slug,
  tags = [],
  onTagClick,
  tall = true,
}: PremiumArchiveCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.32)]"
    >
      <Link href={`/blog/${slug}`} className="block">
        <div
          className={`relative w-full overflow-hidden ${
            tall ? "h-[380px] md:h-[430px]" : "h-[340px] md:h-[380px]"
          }`}
        >
          <Image
            src={image || "/p1.png"}
            alt={title || "Blog image"}
            fill
            sizes={
              tall
                ? "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            }
            className="object-cover object-center scale-[1.02] transition duration-700 group-hover:scale-[1.08]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 h-[58%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%)] pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_-90px_120px_rgba(0,0,0,0.55)]" />
          <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-orange-400/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-orange-300 backdrop-blur-md">
                {category || "Featured"}
              </span>

              {tags.slice(0, 2).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  aria-label={`Filter by ${tag}`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onTagClick?.(tag)
                  }}
                  className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] text-white/72 backdrop-blur-md transition hover:bg-white/15 hover:text-white"
                >
                  #{tag}
                </button>
              ))}
            </div>

            <h3 className="mt-4 text-xl font-semibold leading-snug text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition group-hover:text-orange-200">
              {title}
            </h3>

            {description && (
              <p className="mt-3 line-clamp-2 max-w-[92%] text-sm leading-6 text-white/72">
                {description}
              </p>
            )}

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/75">
                <span>{date || "Latest post"}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {readingTime || "5 min read"}
                </span>
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition group-hover:text-orange-300">
                Read more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}