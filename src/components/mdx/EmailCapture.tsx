export function EmailCapture() {
  return (
    <div className="my-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
      
      <h3 className="text-xl font-semibold text-white">
        Join Smart Income Builders
      </h3>

      <p className="text-sm mt-3 text-gray-300 leading-6">
        Get weekly strategies to make money online
      </p>

      <div className="mt-5 space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none"
        />

        <button className="rounded-2xl bg-orange-500/90 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(249,115,22,0.18)] transition-all duration-300 hover:bg-orange-500 hover:-translate-y-0.5">
          Subscribe
        </button>
      </div>
    </div>
  );
}