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
    .single()

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-orange-300">
          Account
        </p>

        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-4 text-gray-300 leading-7">
          Manage your profile and account security.
        </p>
      </div>

      {/* Profile Form */}
      <ProfileForm
        initialName={profile?.full_name || ""}
        email={user.email || ""}
      />

      {/* Security */}
      <SecurityCard />
    </div>
  )
}