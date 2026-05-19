"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold text-white">
        Something went wrong
      </h1>

      <p className="mt-4 max-w-md text-gray-400">
        An unexpected error occurred while loading this page.
      </p>

      <button
        onClick={() => reset()}
        className="mt-8 rounded-2xl bg-orange-500 px-6 py-3 text-white"
      >
        Try Again
      </button>
    </div>
  )
}