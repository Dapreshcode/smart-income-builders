"use client";

import { useState } from "react";

type Heading = {
  slug: string;
  text: string;
  level: number;
};

export default function MobileToc({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);

  if (!headings?.length) return null;

  return (
    <div className="lg:hidden mb-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
            Table of Contents
          </span>
          <span className="text-gray-400">{open ? "−" : "+"}</span>
        </button>

        {open && (
          <div className="px-5 pb-5">
            <ul className="space-y-2.5">
              {headings.map((h) => (
                <li key={h.slug} className={h.level === 3 ? "ml-4" : ""}>
                  <a
                    href={`#${h.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}