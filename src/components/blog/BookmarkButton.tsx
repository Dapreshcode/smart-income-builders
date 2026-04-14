"use client"

import { useState, useTransition } from "react"
import { Bookmark } from "lucide-react"
import { removeBookmark, saveBookmark } from "@/app/actions/bookmarks"

type Props = {
  postSlug: string
  initiallySaved?: boolean
}

export default function BookmarkButton({
  postSlug,
  initiallySaved = false,
}: Props) {
  const [saved, setSaved] = useState(initiallySaved)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const result = saved
        ? await removeBookmark(postSlug)
        : await saveBookmark(postSlug)

      setMessage(result.message)
      setStatus(result.ok ? "success" : "error")

      if (result.ok) {
        setSaved(!saved)
      }
    })
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
          saved
            ? "border-orange-400/30 bg-orange-500/10 text-orange-300"
            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
        } disabled:opacity-70`}
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        {isPending ? "Please wait..." : saved ? "Saved" : "Save article"}
      </button>

      {message && (
        <p
          className={`text-xs ${
            status === "success" ? "text-green-300" : "text-red-300"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}