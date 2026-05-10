"use client"

import { useState } from "react"
import { AlertTriangle, Trash2 } from "lucide-react"
import { clearAllHistory } from "@/app/actions/reading-History"
import { useRouter } from "next/navigation"

export default function ClearHistoryButton({ historyLength }: { historyLength: number }) {
  const [isClearing, setIsClearing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleClear = async () => {
    setIsClearing(true)
    setError(null)
    
    try {
      console.log("Attempting to clear history...")
      const result = await clearAllHistory()
      console.log("Clear result:", result)
      
      if (result.success) {
        console.log(`Successfully deleted ${result.deletedCount} items`)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to clear history:", error)
      setError(error instanceof Error ? error.message : "Failed to clear history")
    } finally {
      setIsClearing(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="mx-4 max-w-md rounded-2xl border border-white/10 bg-[#0b0f19] p-6 shadow-2xl">
          <div className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="h-6 w-6" />
            <h3 className="text-lg font-semibold">Clear All History?</h3>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            This will permanently delete {historyLength} {historyLength === 1 ? "item" : "items"} from your reading history. This action cannot be undone.
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-400">
              Error: {error}
            </p>
          )}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleClear}
              disabled={isClearing}
              className="flex-1 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
            >
              {isClearing ? "Clearing..." : "Yes, Clear All"}
            </button>
            <button
              onClick={() => {
                setShowConfirm(false)
                setError(null)
              }}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
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
      className="flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
    >
      <Trash2 className="h-4 w-4" />
      Clear All History
    </button>
  )
}