import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import ChangePasswordForm from "@/components/account/ChangePasswordForm"

export default async function SecurityPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-orange-300">
          Account Security
        </p>

        <h1 className="text-4xl font-bold text-white">
          Security Settings
        </h1>

        <p className="mt-4 max-w-2xl text-gray-300 leading-7">
          Manage your password and account security preferences.
        </p>
      </div>

      {/* Password Form */}
      <ChangePasswordForm />
    </div>
  )
}