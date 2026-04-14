"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/Subscriptions"

type RelatedPost = {
  slug?: string
  title?: string
  category?: string
  date?: string
  image?: string
  frontmatter?: {
    title?: string
    category?: string
    date?: string
    image?: string
  }
}

type Props = {
  postSlug: string
  category?: string
  related: RelatedPost[]
}

function getPostImage(post: RelatedPost) {
  return post?.image || post?.frontmatter?.image || "/p1.jpg"
}

function getPostDate(post: RelatedPost) {
  return post?.date || post?.frontmatter?.date || ""
}

function getPostTitle(post: RelatedPost) {
  return post?.title || post?.frontmatter?.title || "Recommended post"
}

function getPostCategory(post: RelatedPost) {
  return post?.category || post?.frontmatter?.category || "Article"
}

export default function ArticleSidebar({
  postSlug,
  category,
  related,
}: Props) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(async () => {
      const result = await subscribeToNewsletter({
        email,
        source: "blog-sidebar",
        categoryInterest: category || null,
        postSlug,
      })

      setMessage(result.message)
      setStatus(result.ok ? "success" : "error")

      if (result.ok) {
        setEmail("")
      }
    })
  }

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-[110px] space-y-6">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-orange-400">
            Stay Updated
          </p>

          <h3 className="mt-3 text-lg font-semibold text-white">
            Get smarter digital growth insights
          </h3>

          <p className="mt-2 text-sm leading-7 text-white/60">
            Learn how to build income systems, improve marketing, and grow online
            with practical strategies.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-orange-400/80" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange-400/40"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.25)] transition hover:brightness-110 disabled:opacity-70"
            >
              {isPending ? "Submitting..." : "Subscribe"}
              {!isPending && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 flex items-center gap-2 text-sm ${
                status === "success" ? "text-green-300" : "text-red-300"
              }`}
            >
              {status === "success" && <CheckCircle2 className="h-4 w-4" />}
              {message}
            </div>
          )}
        </div>

        <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <h3 className="mb-5 text-lg font-semibold text-white">
            Recommended
          </h3>

          <div className="space-y-5">
            {related.slice(0, 4).map((post, index) => {
              const href = post?.slug ? `/blog/${post.slug}` : "#"

              return (
                <div
                  key={`${post.slug}-${index}`}
                  className={index !== 0 ? "border-t border-white/10 pt-5" : ""}
                >
                  <Link
                    href={href}
                    className="group grid grid-cols-[96px_1fr] items-start gap-4 rounded-2xl p-2 -m-2 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]"
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={getPostImage(post)}
                        alt={getPostTitle(post)}
                        width={120}
                        height={90}
                        className="h-[90px] w-[120px] object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-orange-300/90">
                        {getPostCategory(post)}
                      </p>

                      <h4 className="text-[15px] font-medium leading-6 tracking-[-0.01em] text-gray-100 transition group-hover:text-orange-200">
                        {getPostTitle(post)}
                      </h4>

                      <p className="mt-3 text-xs uppercase tracking-[0.12em] text-gray-500">
                        {getPostDate(post)}
                      </p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}