"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

import {
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
} from "lucide-react"

export default function ChangePasswordForm() {
  const supabase = createClient()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword,
    setShowConfirmPassword] = useState(false)

  const [loading, setLoading] =
    useState(false)

  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const passwordsMatch =
    password === confirmPassword

  const passwordValid = password.length >= 8

  const handleUpdatePassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setMessage(null)

    if (!passwordValid) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters.",
      })

      return
    }

    if (!passwordsMatch) {
      setMessage({
        type: "error",
        text: "Passwords do not match.",
      })

      return
    }

    try {
      setLoading(true)

      const { error } =
        await supabase.auth.updateUser({
          password,
        })

      if (error) {
        setMessage({
          type: "error",
          text: error.message,
        })
      } else {
        setMessage({
          type: "success",
          text: "Password updated successfully!",
        })

        setPassword("")
        setConfirmPassword("")

        setTimeout(() => {
          setMessage(null)
        }, 4000)
      }
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleUpdatePassword}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-orange-500/10 p-3">
          <ShieldCheck className="h-5 w-5 text-orange-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Change Password
          </h2>

          <p className="text-sm text-gray-400">
            Use a strong and secure password.
          </p>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          className={`mb-5 rounded-2xl px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-green-500/10 text-green-300"
              : "bg-red-500/10 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-5">

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            New Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition focus:border-orange-400"
              placeholder="Enter new password"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            <KeyRound className="h-3 w-3 text-orange-300" />

            <span
              className={
                passwordValid
                  ? "text-green-300"
                  : "text-gray-500"
              }
            >
              Minimum 8 characters
            </span>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none transition focus:border-orange-400"
              placeholder="Confirm new password"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`mt-2 text-xs ${
                passwordsMatch
                  ? "text-green-300"
                  : "text-red-300"
              }`}
            >
              {passwordsMatch
                ? "Passwords match"
                : "Passwords do not match"}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={
            loading ||
            !passwordsMatch ||
            !passwordValid
          }
          className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Updating password..."
            : "Update Password"}
        </button>
      </div>
    </form>
  )
}