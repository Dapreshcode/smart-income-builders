"use client"

import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)

    await supabase.auth.signOut()

    router.push("/")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />

      {loading ? "Signing out..." : "Logout"}
    </button>
  )
}