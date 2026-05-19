import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-white">
        404
      </h1>

      <p className="mt-4 text-gray-400">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-2xl bg-orange-500 px-6 py-3 text-white"
      >
        Return Home
      </Link>
    </div>
  )
}