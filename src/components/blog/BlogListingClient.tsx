"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import PremiumArchiveCard from "@/components/blog/PremiumArchiveCard"

type Post = {
  slug: string
  frontmatter: {
    title: string
    description: string
    image?: string
    category?: string
    date?: string
    tags?: string[]
    readingTime?: string
  }
}

function slugify(text?: string) {
  if (!text) return ""
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

function formatCategoryLabel(category: string) {
  return category || "Uncategorized"
}

function parseDate(date?: string) {
  if (!date) return 0
  const parsed = new Date(date).getTime()
  return Number.isNaN(parsed) ? 0 : parsed
}

const POSTS_PER_PAGE = 6

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
}

export default function BlogListingClient({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeTag, setActiveTag] = useState("All")
  const [sortBy, setSortBy] = useState("latest")
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(posts.map((post) => post.frontmatter.category).filter(Boolean))
    ) as string[]

    return ["All", ...unique]
  }, [posts])

  const tags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.frontmatter.tags || [])
    const unique = Array.from(new Set(allTags.filter(Boolean)))
    return ["All", ...unique]
  }, [posts])

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()

    let result = [...posts].filter((post) => {
      const fm = post.frontmatter
      const title = fm.title?.toLowerCase() || ""
      const description = fm.description?.toLowerCase() || ""
      const category = fm.category?.toLowerCase() || ""
      const tagList = (fm.tags || []).map((tag) => tag.toLowerCase())

      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        tagList.some((tag) => tag.includes(query))

      const matchesCategory =
        activeCategory === "All" || fm.category === activeCategory

      const matchesTag =
        activeTag === "All" || (fm.tags || []).includes(activeTag)

      return matchesSearch && matchesCategory && matchesTag
    })

    result.sort((a, b) => {
      const aDate = parseDate(a.frontmatter.date)
      const bDate = parseDate(b.frontmatter.date)

      if (sortBy === "latest") return bDate - aDate
      if (sortBy === "oldest") return aDate - bDate
      if (sortBy === "title-asc") {
        return a.frontmatter.title.localeCompare(b.frontmatter.title)
      }
      if (sortBy === "title-desc") {
        return b.frontmatter.title.localeCompare(a.frontmatter.title)
      }
      return 0
    })

    return result
  }, [posts, search, activeCategory, activeTag, sortBy])

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const featuredPost = filteredPosts[0]
  const secondaryFeatured = filteredPosts.slice(1, 3)

  const filterKey = `${search}-${activeCategory}-${activeTag}-${sortBy}`

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setVisibleCount(POSTS_PER_PAGE)
  }

  const handleTagChange = (tag: string) => {
    setActiveTag(tag)
    setVisibleCount(POSTS_PER_PAGE)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setVisibleCount(POSTS_PER_PAGE)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setVisibleCount(POSTS_PER_PAGE)
  }

  const resetFilters = () => {
    setSearch("")
    setActiveCategory("All")
    setActiveTag("All")
    setSortBy("latest")
    setVisibleCount(POSTS_PER_PAGE)
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0b0f19] to-[#020617]" />
        <div className="absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-orange-500/25 blur-3xl" />

        <motion.div
          className="relative mx-auto max-w-7xl"
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="max-w-3xl mt-10">
            <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-300">
              Insights & Articles
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Explore the blog
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
              Discover premium guides, actionable articles, and practical insights
              on growth, marketing, and building online income.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>{posts.length} total articles</span>
              <span>•</span>
              <span>Search, sort, and filter instantly</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <motion.div
            className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:p-5"
            initial="initial"
            animate="animate"
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            <div className="grid gap-4 lg:grid-cols-[1.2fr_220px] lg:items-center">
              <div className="flex items-center rounded-2xl border border-white/10 bg-[#111827]/80 px-4 py-3">
                <svg
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.5 17.5l-4.35-4.35m1.85-4.15a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search articles, categories, or tags..."
                  className="ml-3 w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-2xl border border-white/10 bg-[#111827]/80 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="latest">Sort: Latest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="title-asc">Sort: Title A–Z</option>
                <option value="title-desc">Sort: Title Z–A</option>
              </select>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
              Categories
            </p>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const active = activeCategory === category

                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    layout
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                      active
                        ? "bg-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.22)]"
                        : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {category}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
              Tags
            </p>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => {
                const active = activeTag === tag

                return (
                  <motion.button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    layout
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                      active
                        ? "border border-orange-400/20 bg-orange-500/10 text-orange-300"
                        : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {tag}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {featuredPost && (
          <motion.section
            key={`featured-${filterKey}`}
            className="px-4 pb-10 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="mx-auto max-w-7xl">
              <div className="grid items-start gap-8 xl:grid-cols-[1.35fr_0.9fr]">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block overflow-hidden rounded-[30px] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-[400px] w-full overflow-hidden md:h-[460px]">
                    <Image
                      src={featuredPost.frontmatter.image || "/p1.png"}
                      alt={featuredPost.frontmatter.title}
                      fill
                      className="object-cover object-center scale-[1.02] transition duration-700 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 h-[58%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%)] pointer-events-none" />
                    <div className="absolute inset-0 shadow-[inset_0_-90px_120px_rgba(0,0,0,0.55)]" />

                    <div className="absolute left-5 top-5">
                      <span className="inline-flex rounded-full border border-orange-400/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-orange-300 backdrop-blur-md">
                        {featuredPost.frontmatter.category}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition group-hover:text-orange-200 md:text-3xl">
                        {featuredPost.frontmatter.title}
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78 line-clamp-2 md:text-base">
                        {featuredPost.frontmatter.description}
                      </p>

                      <div className="mt-5 flex items-center gap-4 text-xs text-white/75">
                        <span>{featuredPost.frontmatter.date || "Latest post"}</span>
                        <span>•</span>
                        <span>{featuredPost.frontmatter.readingTime || "5 min read"}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="space-y-6">
                  {secondaryFeatured.map((post, index) => (
                    <motion.div
                      key={`${post.slug}-${filterKey}`}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group grid grid-cols-[120px_1fr] gap-4 rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_14px_36px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                      >
                        <div className="relative h-[120px] w-[120px] overflow-hidden rounded-2xl">
                         <Image
                          src={post.frontmatter.image || "/p1.jpg"}
                          alt={post.frontmatter.title}
                          fill
                          sizes="120px"
                          className="object-cover object-center scale-[1.02] transition duration-500 group-hover:scale-[1.07]"
                        />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        </div>

                        <div className="min-w-0 self-center">
                          <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-orange-300">
                            {formatCategoryLabel(post.frontmatter.category || "")}
                          </p>

                          <h3 className="text-[15px] leading-6 font-medium text-gray-100 transition group-hover:text-orange-200">
                            {post.frontmatter.title}
                          </h3>

                          <p className="mt-3 text-xs text-white/55">
                            {post.frontmatter.date || "Latest post"}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">All articles</h2>
              <p className="mt-2 text-sm text-gray-400">
                Showing {visiblePosts.length} of {filteredPosts.length} matching posts
              </p>
            </div>

            {(search || activeCategory !== "All" || activeTag !== "All" || sortBy !== "latest") && (
              <button
                onClick={resetFilters}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Reset filters
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div
                key={`empty-${filterKey}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
              >
                <h3 className="text-2xl font-semibold text-white">
                  No matching posts found
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-400">
                  Try a different keyword, category, or tag to find more content.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${filterKey}-${visibleCount}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-18 sm:grid-cols-3 xl:grid-cols-4"
              >
                {visiblePosts.map((post, index) => {
                  const fm = post.frontmatter
                  const categorySlug = slugify(fm.category)

                  return (
                    <motion.div
                      key={`${post.slug}-${filterKey}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.04,
                        ease: "easeOut",
                      }}
                    >
                      <PremiumArchiveCard
                        slug={post.slug}
                        title={fm.title}
                        description={fm.description}
                        image={fm.image}
                        category={fm.category}
                        date={fm.date}
                        readingTime={fm.readingTime}
                        tags={fm.tags || []}
                        onTagClick={(tag) => {
                          setActiveTag(tag)
                          setVisibleCount(POSTS_PER_PAGE)
                        }}
                      />
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {visibleCount < filteredPosts.length && (
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                className="rounded-2xl bg-[#fff7ed] px-6 py-3 text-sm font-medium text-[#c2410c] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Load more
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}