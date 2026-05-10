import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AccountDashboard from "@/components/account/AccountDashboard"

export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <AccountDashboard user={user} />
}