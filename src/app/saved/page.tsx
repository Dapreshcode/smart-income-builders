import { createClient } from "@/lib/supabase/server"
import { getAllPosts } from "@/lib/mdx"
import Link from "next/link"

export default async function SavedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ❌ Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            Sign in to view saved articles
          </h1>
          <p className="text-gray-400">
            Your saved content will appear here.
          </p>
        </div>
      </div>
    )
  }

  // ✅ Get bookmarks
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("post_slug")
    .eq("user_id", user.id)

  const bookmarkedSlugs = bookmarks?.map((b) => b.post_slug) || []

  // ✅ Get all posts (MDX)
  const allPosts = getAllPosts()

  // ✅ Match saved posts
  const savedPosts = allPosts.filter((post) =>
    bookmarkedSlugs.includes(post.slug)
  )

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">
          Saved Articles
        </h1>

        {savedPosts.length === 0 ? (
          <p className="text-gray-400">
            You haven’t saved any articles yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {savedPosts.map((post) => {
              const fm = post.frontmatter

              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-5 hover:-translate-y-1 transition shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
                    <p className="text-xs uppercase text-orange-300 mb-2">
                      {fm.category}
                    </p>

                    <h3 className="text-lg font-semibold group-hover:text-orange-200">
                      {fm.title}
                    </h3>

                    <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                      {fm.description}
                    </p>

                    <p className="text-xs text-gray-500 mt-4">
                      {fm.date}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}