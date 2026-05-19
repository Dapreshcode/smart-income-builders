"use client"

import { useState } from "react"
import { Save, User, Globe, MapPin, FileText, AtSign, Camera } from "lucide-react"
import { updateProfile } from "@/app/actions/profile"
import SubmitButton from "./SubmitButton"

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
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [username, setUsername] = useState(profile?.username || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [website, setWebsite] = useState(profile?.website || "")
  const [location, setLocation] = useState(profile?.location || "")
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form
      action={updateProfile}
      className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl sm:rounded-3xl"
    >
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500/10 p-2.5 sm:p-3">
            <User className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Profile Information
            </h2>
            <p className="text-xs text-gray-400 sm:text-sm">
              Update your public profile details
            </p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 p-6 sm:p-8">
        {/* AVATAR SECTION */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-300">
            <Camera className="h-4 w-4" />
            Profile Photo
          </label>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex-shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-orange-500/20 sm:h-28 sm:w-28"
                />
              ) : profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full object-cover ring-2 ring-orange-500/20 sm:h-28 sm:w-28"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-3xl font-bold text-white ring-2 ring-orange-500/20 sm:h-28 sm:w-28">
                  {fullName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-600"
              />
              <p className="mt-2 text-xs text-gray-500">
                Recommended: Square image, at least 200x200px
              </p>
            </div>
          </div>
        </div>

        {/* NAME */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <User className="h-4 w-4" />
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:rounded-2xl"
            placeholder="Enter your full name"
            maxLength={60}
          />
        </div>

        {/* USERNAME */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <AtSign className="h-4 w-4" />
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-white outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:rounded-2xl"
            placeholder="username"
          />
          <p className="text-xs text-gray-500">
            Lowercase letters, numbers, and underscores only.
          </p>
        </div>

        {/* BIO */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <FileText className="h-4 w-4" />
            Bio
          </label>
          <textarea
            name="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:rounded-2xl"
            placeholder="Tell people about yourself..."
            maxLength={160}
          />
          <p className="text-right text-xs text-gray-500">
            {bio.length}/160 characters
          </p>
        </div>

        {/* WEBSITE */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Globe className="h-4 w-4" />
            Website
          </label>
          <input
            type="url"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:rounded-2xl"
            placeholder="https://yourwebsite.com"
          />
        </div>

        {/* LOCATION */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400 sm:rounded-2xl"
            placeholder="City, Country"
          />
        </div>

        {/* EMAIL - Readonly */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-400 outline-none sm:rounded-2xl"
          />
          <p className="text-xs text-gray-500">
            Email address cannot be changed. Contact support for assistance.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}