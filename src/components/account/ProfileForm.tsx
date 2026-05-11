"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Save, User } from "lucide-react"

interface ProfileFormProps {
  initialName: string
  email: string
}

export default function ProfileForm({
  initialName,
  email,
}: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialName)

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const supabase = createClient()

  const handleUpdateProfile = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)
    setMessage(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage({
        type: "error",
        text: "Not authenticated",
      })

      setLoading(false)
      return
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName.trim(),
        updated_at: new Date().toISOString(),
      })

    if (error) {
      setMessage({
        type: "error",
        text: error.message,
      })
    } else {
      setMessage({
        type: "success",
        text: "Profile updated successfully!",
      })

      setTimeout(() => {
        setMessage(null)
      }, 3500)
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-orange-500/10 p-3">
          <User className="h-5 w-5 text-orange-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Profile Information
          </h2>

          <p className="text-sm text-gray-400">
            Update your public profile details.
          </p>
        </div>
      </div>

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
        
        {/* NAME */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400"
            placeholder="Enter your full name"
            maxLength={60}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-gray-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Email address cannot be changed.
          </p>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />

          {loading
            ? "Saving changes..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  )
}