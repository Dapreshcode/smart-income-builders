import Link from "next/link";

type CTAProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
};

export function CTA({
  title = "Start Building Your Income Today",
  description = "Learn proven strategies to build, grow, and monetize your blog effectively.",
  buttonText = "Get Started",
  href = "/start-here",
}: CTAProps) {
  return (
    <div
      className="my-12 rounded-[28px] border border-orange-400/20 
      bg-gradient-to-br from-[#ff7a1a]/90 via-[#ff6a00]/85 to-[#d45500]/85
      p-8 text-white text-center shadow-[0_14px_40px_rgba(0,0,0,0.28)]"
    >
      <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
        {title}
      </h3>

      <p className="mt-4 text-sm md:text-base text-white/90 max-w-xl mx-auto leading-7">
        {description}
      </p>

      <div className="mt-6">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-2xl 
          bg-white px-6 py-3 text-sm font-semibold text-[#d45500]
          shadow-[0_8px_20px_rgba(0,0,0,0.2)]
          transition-all duration-300 hover:-translate-y-0.5"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}