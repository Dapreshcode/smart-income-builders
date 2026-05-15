import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getProfile } from "@/lib/helpers/profile"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const profile = await getProfile(user.id)

  if (!profile?.onboarding_completed) {
    redirect("/account")
  }

  return <>{children}</>
}