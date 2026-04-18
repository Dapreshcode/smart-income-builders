// app/start-here/page.tsx
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Compass } from "lucide-react";
import {
  startHerePaths,
  featuredGuides,
  recommendedToolsPreview,
} from "@/data/startHere";

export const metadata = {
  title: "Start Here",
  description:
    "A guided roadmap to help you start a blog, grow traffic, and learn practical ways to make money online.",
};

export default function StartHerePage() {
  return (
    <>
      <Script
        id="start-here-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Start Here",
            description:
              "A guided roadmap to help readers start a blog, grow traffic, and learn practical online income methods.",
          }),
        }}
      />

      <main className="min-h-screen bg-[#0b0f19] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0b0f19] to-[#020617]" />
          <div className="absolute left-[-60px] top-[-40px] h-[280px] w-[280px] rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute right-[-80px] top-[20px] h-[320px] w-[320px] rounded-full bg-orange-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl mt-6">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-orange-300">
                <Compass className="h-4 w-4" />
                Start here
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                A clear roadmap to build, grow, and monetize your blog
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                This page is your guided starting point. Use it to find the
                right next step, whether you want to start a blog, learn SEO,
                explore monetization, or discover the tools behind this site.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blog/how-to-start-a-blog"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  Start with the first guide
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Explore tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-gray-300">
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-orange-400" />
    <span>Beginners building their first website</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-orange-400" />
    <span>Creators growing traffic and email</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-orange-400" />
    <span>Bloggers ready to monetize properly</span>
  </div>
</div>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-orange-300">
              Choose your path
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Pick the direction that matches where you are
            </h2>
            <p className="mt-4 text-gray-300 leading-7">
              You do not need to read everything at once. Start with the path
              that fits your current goal, then move deeper into the blog.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {startHerePaths.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-orange-400/20 hover:bg-white/[0.06]"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/20">
                    <Icon className="h-5 w-5" />
                  </div>

                                  <h3 className="text-xl font-semibold text-white transition group-hover:text-orange-200">
                    {item.title}
                  </h3>

                  {item.level && (
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {item.level}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    {item.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange-300">
                     Explore path
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-orange-300">
                Recommended starting guides
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Start with these core articles
              </h2>
              <p className="mt-4 text-gray-300 leading-7">
                These are the posts that give the strongest foundation for new
                readers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="group rounded-[28px] border border-white/10 bg-[#0f172a]/60 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:bg-[#111827]"
                >
                 <div className="mb-3 flex flex-wrap items-center gap-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-orange-300">
                    {guide.category}
                  </p>

                  {guide.level && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/60">
                      {guide.level}
                    </span>
                  )}
                </div>

                  <h3 className="text-xl font-semibold leading-tight text-white transition group-hover:text-orange-200">
                    {guide.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-300">
                    {guide.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange-300">
                    Read guide
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-orange-300">
                Tools I recommend
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                The stack behind this blog
              </h2>
              <p className="mt-4 max-w-2xl text-gray-300 leading-7">
                These are the kinds of tools that help with publishing,
                building, list growth, and content production.
              </p>

              <div className="mt-8">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  Visit tools page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {recommendedToolsPreview.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.22)]"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-300">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-orange-300"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

          {/* STORY / TRUST */}
        <section className="border-y border-white/10 bg-gradient-to-br from-[#111827]/80 to-[#0b1220]/80">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-orange-300">
                Why this blog exists
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Built to document what actually works
              </h2>
              <p className="mt-5 text-gray-300 leading-8">
                This site is built around practical learning, real experiments,
                and clear explanations. The goal is not to publish empty advice,
                but to create content that is useful, honest, and strong enough
                to help readers take action.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-orange-400/20 bg-gradient-to-br from-[#ff7a1a]/90 via-[#ff6a00]/85 to-[#d45500]/85 p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-10">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/80">
              Ready to begin
            </p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
              Start with the first guide and build from there
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
              The best next step is to begin with the core beginner guide, then
              use this page to keep moving deeper into the system.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog/how-to-start-a-blog"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#d45500] transition hover:-translate-y-0.5"
              >
                Read the first guide
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Browse all articles
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}