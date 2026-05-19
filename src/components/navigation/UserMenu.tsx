"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import Link from "next/link"

import { LogOut, Settings, Shield, LayoutDashboard } from "lucide-react"

import { signOutUser} from "@/app/actions/auth"

interface UserMenuProps {
  fullName: string | null
  username: string | null
  avatarUrl: string | null
}

export default function UserMenu({
  fullName,
  username,
  avatarUrl,
}: UserMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="outline-none">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username || "User"}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10 transition hover:ring-orange-400"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white ring-2 ring-white/10 transition hover:ring-orange-400">
              {fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={12}
          align="end"
          className="z-50 min-w-[240px] overflow-hidden rounded-3xl border border-white/10 bg-[#0B1120]/95 p-2 shadow-2xl backdrop-blur-xl"
        >
          {/* USER INFO */}
          <div className="border-b border-white/10 px-4 py-3">
            <p className="truncate text-sm font-semibold text-white">
              {fullName}
            </p>

            <p className="truncate text-xs text-gray-400">
              @{username}
            </p>
          </div>

          {/* DASHBOARD */}
          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard"
              className="mt-2 flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-300 outline-none transition hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />

              Dashboard
            </Link>
          </DropdownMenu.Item>

          {/* SETTINGS */}
          <DropdownMenu.Item asChild>
            <Link
              href="/account/settings"
              className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-300 outline-none transition hover:bg-white/5 hover:text-white"
            >
              <Settings className="h-4 w-4" />

              Settings
            </Link>
          </DropdownMenu.Item>

          {/* SECURITY */}
          <DropdownMenu.Item asChild>
            <Link
              href="/account/security"
              className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm text-gray-300 outline-none transition hover:bg-white/5 hover:text-white"
            >
              <Shield className="h-4 w-4" />

              Security
            </Link>
          </DropdownMenu.Item>

          {/* DIVIDER */}
          <div className="my-2 border-t border-white/10" />

          {/* LOGOUT */}
          <form action={signOutUser}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-red-300 transition hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />

              Logout
            </button>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}