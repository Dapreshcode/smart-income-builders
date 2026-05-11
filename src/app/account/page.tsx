import Link from "next/link"

export default function AccountPage() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 mt-15">
      <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
        Account Overview
      </p>

      <h1 className="mt-3 text-3xl font-bold text-white">
        Welcome to your account
      </h1>

      <p className="mt-4 max-w-2xl text-gray-300 leading-7">
        Manage your profile, saved articles, reading history,
        and security settings from one place.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/account/settings"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
        >
          <h3 className="text-lg font-semibold text-white">
            Profile Settings
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Update your name and account preferences.
          </p>
        </Link>

        <Link
          href="/account/security"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
        >
          <h3 className="text-lg font-semibold text-white">
            Security
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Change password and secure your account.
          </p>
        </Link>
      </div>
    </div>
  )
}