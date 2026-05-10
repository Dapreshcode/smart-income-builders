"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"

type Bookmark = {
  post_slug: string
  created_at: string
}

export default function AccountDashboard({ user }: any) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("bookmarks")
        .select("post_slug, created_at")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setBookmarks(data)
      }

      setLoading(false)
    }

    fetchBookmarks()
  }, [])

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto mt-15">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Welcome back, {user.email}
          </p>
        </div>

        {/* SAVED ARTICLES */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Saved Articles</h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : bookmarks.length === 0 ? (
            <p className="text-gray-400">
              No saved articles yet.
            </p>
          ) : (
            <div className="space-y-4">
              {bookmarks.map((item) => (
                <Link
                  
                  key={item.post_slug}
                  href={`/blog/${item.post_slug}`}
                  className="block rounded-xl border border-white/10 p-4 hover:bg-white/5 transition"
                >
                  <p className="text-sm text-orange-300">
                    Saved
                  </p>
                  <h3 className="text-lg font-medium">
                    {item.post_slug.replace(/-/g, " ")}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* FUTURE EXTENSIONS */}
   <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                                
                <Link
                    href="/account/history"
                    className="text-sm text-white/80 hover:text-orange-300"
                    >
                    Reading History
                </Link>
            </div>
             <p className="text-xs uppercase tracking-[0.16em] text-orange-300">
                Coming next
              </p>
              <p>Email Preferences</p>
              <p>Personalized Recommendations</p>
      </div>
    </main>
  )
}