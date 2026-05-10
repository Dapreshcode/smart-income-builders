"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { deleteHistoryItem } from "@/app/actions/reading-History"
import { useRouter } from "next/navigation"

export default function DeleteHistoryButton({ historyId }: { historyId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
    
    try {
      console.log("Attempting to delete history item:", historyId)
      const result = await deleteHistoryItem(historyId)
      console.log("Delete result:", result)
      
      if (result.success) {
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to delete:", error)
      setError(error instanceof Error ? error.message : "Failed to delete")
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/80 backdrop-blur-sm">
        <div className="flex flex-col gap-2 px-4">
          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </button>
            <button
              onClick={() => {
                setShowConfirm(false)
                setError(null)
              }}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="absolute top-4 right-4 rounded-full bg-red-500/20 p-2 text-red-400 opacity-0 transition hover:bg-red-500/30 group-hover:opacity-100"
      aria-label="Delete history item"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}