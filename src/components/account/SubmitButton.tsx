"use client"

import { Save } from "lucide-react"
import { useFormStatus } from "react-dom"

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-50 sm:w-auto"
    >
      <Save className="h-4 w-4" />

      {pending
        ? "Saving changes..."
        : "Save Changes"}
    </button>
  )
}