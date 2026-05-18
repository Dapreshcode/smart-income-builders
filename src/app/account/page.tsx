import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getProfile } from "@/lib/helpers/profile"
import { completeOnboarding } from "@/app/actions/profile"

export default async function AccountPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const profile = await getProfile(user.id)

  // If onboarding already completed
  if (profile?.onboarding_completed) {
    redirect("/dashboard")
  }

  return (
    <div className="mx-auto mt-24 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
          Complete Registration
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          Complete your profile
        </h1>

        <p className="mt-4 text-gray-300 leading-7">
          Finish setting up your account before accessing
          your dashboard and saved articles.
        </p>
      </div>

      <form
        action={completeOnboarding}
        className="space-y-6"
      >
    {/**Avatar upload */}
        <div>
  <label className="mb-2 block text-sm text-white">
    Profile Photo
  </label>

  <input
    type="file"
    name="avatar"
    accept="image/*"
    className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300"
  />
</div>

        {/* FULL NAME */}
        <div>
          <label className="mb-2 block text-sm text-white">
            Full Name
          </label>

          <input
            type="text"
            name="full_name"
            required
            defaultValue={profile?.full_name ?? ""}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />
        </div>

        {/* USERNAME */}
        <div>
          <label className="mb-2 block text-sm text-white">
            Username
          </label>

          <input
            type="text"
            name="username"
            required
            minLength={3}
            maxLength={20}
            defaultValue={profile?.username ?? ""}
            placeholder="barrycodes"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />

          <p className="mt-2 text-xs text-gray-400">
            Only lowercase letters, numbers, and underscores.
          </p>
        </div>

        {/* BIO */}
        <div>
          <label className="mb-2 block text-sm text-white">
            Bio
          </label>

          <textarea
            name="bio"
            rows={4}
            defaultValue={profile?.bio ?? ""}
            placeholder="Tell people about yourself"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />
        </div>

        {/* WEBSITE */}
        <div>
          <label className="mb-2 block text-sm text-white">
            Website
          </label>

          <input
            type="url"
            name="website"
            defaultValue={profile?.website ?? ""}
            placeholder="https://yourwebsite.com"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="mb-2 block text-sm text-white">
            Location
          </label>

          <input
            type="text"
            name="location"
            defaultValue={profile?.location ?? ""}
            placeholder="Lagos, Nigeria"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-white transition hover:bg-orange-600"
        >
          Complete Setup
        </button>
      </form>
    </div>
  )
}