"use client";

import { useEffect, useState } from "react";

export default function FloatingArticleHeader({
  category,
  title,
}: {
  category: string;
  title: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 260);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
   <div
  className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    show
      ? "translate-y-0 opacity-100"
      : "-translate-y-full opacity-0 pointer-events-none"
  }`}
>
  <div className="border-b border-white/10 bg-[#0b0f19]/75 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
      <span className="hidden sm:inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-300 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]">
        {category}
      </span>

      <p className="text-sm md:text-[15px] font-medium text-white/95 line-clamp-1">
        {title}
      </p>
    </div>
  </div>
</div>
  );
}