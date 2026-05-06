"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { signUpWithEmail } from "@/app/actions/auth"

export default function SignupForm() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isPending, startTransition] = useTransition()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword

  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage("")
      setStatus("idle")
    }, 5000)

    return () => clearTimeout(timer)
  }, [message])

  const handleSubmit = async (formData: FormData) => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.")
      setStatus("error")
      return
    }

    startTransition(async () => {
      const result = await signUpWithEmail(formData)
      setMessage(result.message)
      setStatus(result.ok ? "success" : "error")
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* EMAIL */}
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition focus:border-orange-400"
      />

      {/* PASSWORD */}
      <input
        name="password"
        type="password"
        required
        minLength={8}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition focus:border-orange-400"
      />

      {/* CONFIRM PASSWORD */}
      <div>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition focus:border-orange-400"
        />

        {passwordsMismatch && (
          <p className="mt-2 text-xs text-red-300">
            Passwords do not match
          </p>
        )}

        {passwordsMatch && (
          <p className="mt-2 text-xs text-green-300">
            Passwords match ✓
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isPending || passwordsMismatch}
        className="w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>

      {/* FEEDBACK MESSAGE */}
      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-green-300" : "text-red-300"
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-300 hover:text-orange-200">
          Sign in
        </Link>
      </p>
    </form>
  )
}