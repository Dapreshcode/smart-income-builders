import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AccountSidebar from "@/components/account/AccountSidebar"

export default async function AccountLayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Sidebar */}
        <AccountSidebar>{null}</AccountSidebar>
        

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </main>
  )
}