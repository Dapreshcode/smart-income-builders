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
import LogoutButton from "./LogoutButton"

const links = [
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
    href: "/account/saved",
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

export default function AccountSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-[280px] shrink-0 lg:block mt-15">
      <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
            Account Area
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">
            Manage Account
          </h2>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon
            const active = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
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

        <div className="mt-6 border-t border-white/10 pt-6">
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}