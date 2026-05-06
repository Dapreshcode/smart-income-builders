import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { signOutUser } from "@/app/actions/auth"

export const metadata = {
  title: "Account",
  description: "Manage your account, saved articles, and reading activity.",
}

export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300">
            Account
          </p>
          <h1 className="mt-4 text-2xl font-bold text-white">Your dashboard</h1>
          <p className="mt-3 text-sm leading-7 text-gray-300 break-all">
            {user.email}
          </p>

          <nav className="mt-8 space-y-3">
            <Link href="/saved" className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Saved Articles
            </Link>
          </nav>

          <form action={signOutUser} className="mt-8">
            <button
              type="submit"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Sign out
            </button>
          </form>
        </aside>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300">
            Overview
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white">
            Welcome to your account area
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300">
            This is where your saved articles, future reading history, and account preferences will live.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link
              href="/saved"
              className="rounded-[22px] border border-white/10 bg-white/5 p-5 hover:bg-white/10"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-orange-300">
                Library
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">Saved Articles</h3>
              <p className="mt-2 text-sm leading-7 text-gray-300">
                Revisit the guides you chose to keep for later.
              </p>
            </Link>

            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-orange-300">
                Coming next
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">Reading History</h3>
              <p className="mt-2 text-sm leading-7 text-gray-300">
                Keep track of where you have been and what to continue next.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}