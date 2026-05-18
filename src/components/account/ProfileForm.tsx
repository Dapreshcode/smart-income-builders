"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Save, User } from "lucide-react"
import { updateProfile } from "@/app/actions/profile"

interface ProfileFormProps {
  email: string

  profile: {
    full_name: string | null
    username: string | null
    bio: string | null
    website: string | null
    location: string | null
    avatar_url: string | null
  } | null
}

export default function ProfileForm({
  profile,
  email,
}: ProfileFormProps) {
 const [fullName, setFullName] = useState(
  profile?.full_name || ""
)

const [username, setUsername] = useState(
  profile?.username || ""
)

const [bio, setBio] = useState(
  profile?.bio || ""
)

const [website, setWebsite] = useState(
  profile?.website || ""
)

const [location, setLocation] = useState(
  profile?.location || ""
)

const [avatarFile, setAvatarFile] =
  useState<File | null>(null)

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  

  

  return (
    <form
     action={updateProfile}
  encType="multipart/form-data"
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
{/* AVATAR */}

        <div>
  <label className="mb-2 block text-sm font-medium text-gray-300">
    Profile Photo
  </label>

  <div className="mb-4 flex items-center gap-4">
    {profile?.avatar_url ? (
      <img
        src={profile.avatar_url}
        alt="Avatar"
        className="h-20 w-20 rounded-full object-cover"
      />
    ) : (
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
        {fullName?.charAt(0).toUpperCase()}
      </div>
    )}

    <input
      type="file"
      name="avatar"
      accept="image/*"
      onChange={(e) =>
        setAvatarFile(
          e.target.files?.[0] || null
        )
      }
      className="text-sm text-gray-400"
    />
  </div>
</div>
        
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

{/* USERNAME */}
        <div>
  <label className="mb-2 block text-sm font-medium text-gray-300">
    Username
  </label>

  <input
    type="text"
    name="username"
    value={username}
    onChange={(e) =>
      setUsername(
        e.target.value.toLowerCase()
      )
    }
    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400"
    placeholder="barrycodes"
  />

  <p className="mt-2 text-xs text-gray-500">
    Lowercase letters, numbers, underscores only.
  </p>
</div>

{/* BIO */}
<div>
  <label className="mb-2 block text-sm font-medium text-gray-300">
    Bio
  </label>

  <textarea
    name="bio"
    rows={4}
    value={bio}
    onChange={(e) =>
      setBio(e.target.value)
    }
    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400"
    placeholder="Tell people about yourself"
  />
</div>


{/* WEBSITE */}
<div>
  <label className="mb-2 block text-sm font-medium text-gray-300">
    Website
  </label>

  <input
    type="url"
    name="website"
    value={website}
    onChange={(e) =>
      setWebsite(e.target.value)
    }
    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400"
    placeholder="https://yourwebsite.com"
  />
</div>

{/* LOCATION */}

<div>
  <label className="mb-2 block text-sm font-medium text-gray-300">
    Location
  </label>

  <input
    type="text"
    name="location"
    value={location}
    onChange={(e) =>
      setLocation(e.target.value)
    }
    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400"
    placeholder="Lagos, Nigeria"
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