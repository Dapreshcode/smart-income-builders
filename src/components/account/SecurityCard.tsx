"use client"

import { useRouter } from "next/navigation"
import { Key } from "lucide-react"

export default function SecurityCard() {
  const router = useRouter()

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-orange-500/10 p-3">
          <Key className="h-5 w-5 text-orange-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Security
          </h2>

          <p className="text-sm text-gray-400">
            Manage password and account security.
          </p>
        </div>
      </div>

      <button
        onClick={() =>
          router.push("/account/security")
        }
        className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Change Password
      </button>
    </div>
  )
}