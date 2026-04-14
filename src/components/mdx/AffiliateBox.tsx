import Link from "next/link";

type AffiliateBoxProps = {
  title: string;
  link: string;
  cta: string;
  description?: string;
  badge?: string;
};

export function AffiliateBox({
  title,
  link,
  cta,
  description,
  badge = "Recommended resource",
}: AffiliateBoxProps) {
  const isExternal = link.startsWith("http");

  const buttonClass =
    "inline-flex items-center rounded-xl bg-orange-500/90 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-500 hover:-translate-y-0.5";

  return (
    <div className="my-10 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 sm:p-7 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.32)]">
      <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-orange-300">
        {badge}
      </p>

      <h4 className="text-lg sm:text-xl font-semibold leading-snug text-white">
        {title}
      </h4>

      {description && (
        <p className="mt-3 text-sm leading-7 text-gray-300">{description}</p>
      )}

      <div className="mt-5">
        {isExternal ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            {cta}
          </a>
        ) : (
          <Link href={link} className={buttonClass}>
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}