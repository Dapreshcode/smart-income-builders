"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { signInWithEmail } from "@/app/actions/auth"

export default function LoginForm() {
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await signInWithEmail(formData)
      if (result?.message) {
        setMessage(result.message)
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none"
      />

      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:opacity-70"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      {message && <p className="text-sm text-red-300">{message}</p>}

      <p className="text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-orange-300 hover:text-orange-200">
          Create one
        </Link>
      </p>
    </form>
  )
}