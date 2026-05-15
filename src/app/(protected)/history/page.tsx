import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import DeleteHistoryButton from "@/components/history/DeleteHistoryButton"
import ClearHistoryButton from "@/components/history/ClearHistoryButton"

export default async function ReadingHistoryPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: history } = await supabase
    .from("reading_history")
    .select("*")
    .order("viewed_at", { ascending: false })

  // Ensure history is always an array
  const historyItems = history || []

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white mt-15">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-orange-300">
              Dashboard
            </p>

            <h1 className="text-4xl font-bold text-white">
              Reading History
            </h1>

            <p className="mt-4 text-gray-300 leading-7">
              Continue reading from where you left off.
            </p>
          </div>

          {historyItems.length > 0 && (
            <ClearHistoryButton historyLength={historyItems.length} />
          )}
        </div>

        {historyItems.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
            <p>No reading history yet.</p>
            <Link
              href="/blog"
              className="mt-4 inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Browse Blog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <Link
                  href={`/blog/${item.post_slug}`}
                  className="block p-6"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-orange-300">
                    {item.post_category}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-white">
                    {item.post_title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-400">
                    Viewed {new Date(item.viewed_at).toLocaleString()}
                  </p>
                </Link>

                <DeleteHistoryButton historyId={item.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}