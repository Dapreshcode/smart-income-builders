"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PremiumPostCard from "@/components/blog/PremuimPostCard"

export default function FeaturedPostsClient({ posts }: any) {
  return (
    <section className="relative px-4 sm:px-6 py-20 overflow-hidden">
      {/* soft transparent overlay to blend into your global background */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-orange-400/80">
              Featured Content
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Featured Guides & Insights
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
              Explore premium breakdowns on blogging, digital growth, monetization,
              and building smarter income streams online.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 backdrop-blur-md transition hover:border-orange-400/40 hover:text-orange-300"
          >
            View all articles
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        {/* cards */}
      <div className="grid grid-cols-1 gap-15 md:grid-cols-3 xl:grid-cols-4">
  {posts.map((post: any, index: number) => {
    const fm = post.frontmatter

    return (
      <div
        key={post.slug}
        className={index === 0 ? "md:col-span-2 xl:col-span-2" : ""}
      >
        <PremiumPostCard
          slug={post.slug}
          title={fm.title}
          image={fm.image || "/p1.jpg"}
          category={fm.category || "Featured"}
          date={fm.date || "Latest"}
          readTime={fm.readTime || "5 min read"}
          description={fm.description}
        />
      </div>
    )
  })}
</div>
      </div>
    </section>
  )
}