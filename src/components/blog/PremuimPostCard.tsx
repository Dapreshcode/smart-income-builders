"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock3 } from "lucide-react"

type PremiumPostCardProps = {
  title: string
  image: string
  category: string
  slug: string
  date?: string
  readTime?: string
  description?: string
}

export default function PremiumPostCard({
  title,
  image,
  category,
  slug,
  date,
  readTime,
  description,
}: PremiumPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
    >
      <Link href={`/blog/${slug}`} className="block">
       <div className="relative h-[380px] md:h-[420px] w-full overflow-hidden rounded-[28px]">
 <Image
  src={image || "/p1.png"}
  alt={title || "Blog image"}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
  className="object-cover object-center scale-[1.02] transition duration-700 group-hover:scale-[1.08]"
/>

  {/* base cinematic overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10" />

  {/* extra lower contrast for text */}
  <div className="absolute bottom-0 left-0 right-0 h-[58%] bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

  {/* subtle texture / reflection */}
  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%)] pointer-events-none" />

  {/* soft vignette */}
  <div className="absolute inset-0 shadow-[inset_0_-80px_120px_rgba(0,0,0,0.55)]" />

  {/* glow accent */}
  <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

          {/* content */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-orange-300 backdrop-blur-md">
              {category || "Featured"}
            </div>

            <h3 className="mt-4 text-xl font-semibold leading-snug text-white transition duration-300 group-hover:text-orange-200 md:text-[22px]">
              {title}
            </h3>

            {description && (
              <p className="mt-3 line-clamp-2 max-w-[90%] text-sm leading-6 text-white/65">
                {description}
              </p>
            )}

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/55">
                <span>{date || "Latest"}</span>

                {readTime && (
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {readTime}
                  </span>
                )}
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition group-hover:text-orange-300">
                Read more
                <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}