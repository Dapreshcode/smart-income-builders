"use client"

import { useState, useTransition } from "react"
import { subscribeToNewsletter } from "@/app/actions/Subscriptions"
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react"

type Props = {
  postSlug: string
  category?: string
}

export default function SidebarSubscribe({ postSlug, category }: Props) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="sticky top-[110px] rounded-[26px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      
      <p className="text-[11px] uppercase tracking-[0.2em] text-orange-400">
        Stay Updated
      </p>

      <h3 className="mt-3 text-lg font-semibold text-white">
        Get smarter digital growth insights
      </h3>

      <p className="mt-2 text-sm text-white/60 leading-6">
        Learn how to build income systems, improve marketing, and grow online with practical strategies.
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
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange-400/40"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.25)] transition hover:brightness-110 disabled:opacity-70"
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
  )
}