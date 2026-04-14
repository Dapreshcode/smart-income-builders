"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/Subscriptions"

export default function HomeNewsletterCTA() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(async () => {
  const result = await subscribeToNewsletter({
    email,
    source: "homepage",
  })

  setMessage(result.message)
  setStatus(result.ok ? "success" : "error")

  if (result.ok) {
    setSubmitted(true)
    setEmail("")
  }
})
  }

  return (
    <section id="newsletter" className="relative px-4 md:px-6 lg:px-8 py-20 mt-10 mb-10 overflow-hidden">
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_20px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          <div className="relative px-6 py-12 md:px-10 md:py-14 lg:px-14 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-orange-400/85 md:text-xs">
              Weekly Growth Letter
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Build a Smarter
              <span className="text-orange-500"> Online Income System</span>
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-3xl">
                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex-row">
                  <div className="relative flex min-h-[64px] flex-1 items-center">
                    <div className="pointer-events-none absolute left-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8">
                      <Mail className="h-4 w-4 text-orange-400/90" />
                    </div>

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-16 w-full bg-transparent pl-16 pr-5 text-sm text-white placeholder:text-white/38 outline-none md:text-base"
                    />
                  </div>

                  <div className="hidden w-px bg-white/10 sm:block" />

                  <div className="relative p-2 sm:p-2.5">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex h-12 w-full min-w-[170px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:shadow-orange-500/35 disabled:opacity-70"
                    >
                      {isPending ? "Submitting..." : "Subscribe Now"}
                      {!isPending && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {message && (
  <p
    className={`mt-4 text-sm ${
      status === "success" ? "text-green-300" : "text-red-300"
    }`}
  >
    {message}
  </p>
)}
              </form>
            ) : (
              <div className="mt-10 flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-400/20 bg-green-500/10">
                  <CheckCircle2 className="h-7 w-7 text-green-400" />
                </div>
                <p className="mt-4 text-center text-sm text-white/82 md:text-base">
                  You're in. Check your inbox for the next growth insight.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}