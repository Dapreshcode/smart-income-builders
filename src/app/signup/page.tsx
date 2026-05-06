import SignupForm from "@/components/auth/SignupForm"

export const metadata = {
  title: "Sign Up",
  description: "Create your account to save articles and manage your content journey.",
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300">
            Create account
          </p>
          <h1 className="mt-4 text-3xl font-bold text-white">
            Start building your account
          </h1>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            Save articles, continue your learning paths, and manage your reading journey.
          </p>

          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  )
}