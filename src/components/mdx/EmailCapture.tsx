"use client"

import { useState, useTransition } from "react"
import { ArrowRight, CheckCircle2, Mail } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/Subscriptions"

type EmailCaptureProps = {
  source?: string
  category?: string | null
  postSlug?: string | null
  title?: string
  description?: string
}

export function EmailCapture({
  source = "blog-inline",
  category = null,
  postSlug = null,
  title = "Join Smart Income Builders",
  description = "Get practical insights on digital growth, income systems, and modern marketing.",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(async () => {
      const result = await subscribeToNewsletter({
        email,
        source,
        categoryInterest: category,
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
    <div className="my-12 rounded-[28px] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)] sm:p-7">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300">
        <Mail className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-300">
        {description}
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange-400/40"
        />

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500/90 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(249,115,22,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 disabled:opacity-70"
        >
          {isPending ? "Submitting..." : "Subscribe"}
          {!isPending && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 flex items-center justify-center gap-2 text-sm ${
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