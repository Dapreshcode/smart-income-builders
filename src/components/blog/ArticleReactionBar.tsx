"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ThumbsUp,
  Heart,
  Bookmark,
  Flame,
  Link2,
  Send,
  MessageCircle,
  XIcon,
} from "lucide-react";

type ReactionKey = "helpful" | "love" | "saved" | "valuable";

type Props = {
  slug: string;
  title?: string;
};

const reactions = [
  { key: "helpful", label: "Helpful", icon: ThumbsUp },
  { key: "love", label: "Loved it", icon: Heart },
  { key: "saved", label: "Save-worthy", icon: Bookmark },
  { key: "valuable", label: "Valuable", icon: Flame },
] as const;

export default function ArticleReactionBar({ slug, title }: Props) {
  const storageKey = useMemo(() => `article-reaction:${slug}`, [slug]);
  const [selected, setSelected] = useState<ReactionKey | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey) as ReactionKey | null;
      if (saved) setSelected(saved);
    } catch {}
  }, [storageKey]);

  const handleReact = (reaction: ReactionKey) => {
    let next: ReactionKey | null = reaction;

    if (selected === reaction) {
      next = null;
    }

    setSelected(next);

    try {
      if (next) {
        localStorage.setItem(storageKey, next);
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {}
  };

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  };

  const getShareText = () => {
    const safeTitle = title || "Check out this article";
    return `${safeTitle}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${getShareText()} ${getShareUrl()}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleXShare = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(getShareUrl());
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: title || "Article",
      text: getShareText(),
      url: getShareUrl(),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await handleCopyLink();
      }
    } catch {}
  };

  return (
    <section className="mt-14">
      <div
        className="
          relative overflow-hidden rounded-[32px] border border-orange-400/25
          bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#020617]
          p-7 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.55)]
        "
      >
        <div className="absolute -top-10 -right-10 h-[200px] w-[200px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-orange-300">
                Reader feedback
              </p>

              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                Was this article useful?
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-300 sm:text-[15px]">
                Your feedback helps improve future content and guides what gets
                expanded next.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {reactions.map((item) => {
                const Icon = item.icon;
                const active = selected === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleReact(item.key)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "scale-[1.03] bg-orange-500 text-white shadow-[0_10px_25px_rgba(249,115,22,0.35)]"
                        : "border border-white/10 bg-white/5 text-gray-200 hover:-translate-y-0.5 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {selected && (
            <div className="text-sm text-orange-200">
              Thanks — your feedback was recorded.
            </div>
          )}

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-orange-300">
                Share this article
              </p>
              <p className="text-sm leading-7 text-gray-300">
                Found it useful? Share it with someone who might need it too.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                <Link2 className="h-4 w-4" />
                {copied ? "Copied" : "Copy link"}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>

<button
  type="button"
  onClick={handleXShare}
  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
>
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2H21.5l-7.19 8.21L22 22h-6.828l-5.347-7.02L3.5 22H.244l7.684-8.77L2 2h6.828l4.84 6.35L18.244 2Zm-2.39 18h1.89L8.41 3.94H6.38L15.854 20Z"/>
  </svg>
  X
</button>

      
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}