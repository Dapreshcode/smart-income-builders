"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Bookmark,
  History,
  Shield,
} from "lucide-react"

const accountLinks = [
  {
    href: "/userdashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/account/settings",
    label: "Profile Settings",
    icon: User,
  },
  {
    href: "/saved",
    label: "Saved Articles",
    icon: Bookmark,
  },
  {
    href: "/account/history",
    label: "Reading History",
    icon: History,
  },
  {
    href: "/account/security",
    label: "Security",
    icon: Shield,
  },
]

export default function AccountSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#070b14] pt-28">
      <div className="mx-auto flex max-w-7xl gap-6 px-4">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[260px] shrink-0">
          <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
                Account
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Manage Account
              </h2>
            </div>

            <nav className="space-y-1">
              {accountLinks.map((link) => {
                const Icon = link.icon
                const active = pathname === link.href

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-orange-500/15 text-orange-300"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}