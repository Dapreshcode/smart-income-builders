import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import ProfileForm from "@/components/account/ProfileForm"
import SecurityCard from "@/components/account/SecurityCard"

export default async function AccountSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // PROFILE
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] to-[#0a0e1a]">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button (optional) */}
        <div className="mb-6">
          <a 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-orange-400"
          >
            ← Back to Dashboard
          </a>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-orange-300">
            Account Settings
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Profile Settings
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
            Manage your profile information and account security settings.
          </p>
        </div>

        {/* Forms Container */}
        <div className="space-y-8">
          {/* Profile Form */}
          <ProfileForm
            profile={profile}
            email={user.email || ""}
          />

          {/* Security */}
          <SecurityCard />
        </div>
      </div>
    </div>
  )
}