"use client";

import { useEffect, useState } from "react";

type Heading = {
  slug: string;
  text: string;
  level: number;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!headings?.length) return;

    const els = headings
      .map((h) => document.getElementById(h.slug))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            return (
              els.indexOf(a.target as HTMLElement) -
              els.indexOf(b.target as HTMLElement)
            );
          });

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0.15,
      }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 mb-5 tracking-[0.18em] uppercase">
        Table of Contents
      </h4>

      <ul className="space-y-2">
        {headings.map((h) => {
          const isActive = active === h.slug;

          return (
            <li key={h.slug} className={h.level === 3 ? "ml-4" : ""}>
              <a
                href={`#${h.slug}`}
               className={`flex items-start gap-2 rounded-xl px-3 py-2.5 text-sm leading-6 transition-all duration-300 ${
  isActive
    ? "bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/20 shadow-[0_8px_20px_rgba(249,115,22,0.08)]"
    : "text-gray-400 hover:text-white hover:bg-white/5"
}`}
              >
                <span
                 className={`mt-[7px] h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-300 ${
  isActive ? "bg-orange-400 scale-110" : "bg-gray-600"
}`}
                />
                <span className="break-words">{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}