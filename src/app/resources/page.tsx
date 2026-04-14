// app/tools/page.tsx
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Wrench, Globe, Mail, Sparkles, Palette } from "lucide-react";

const toolCategories = [
  {
    title: "Blogging & Website Tools",
    icon: Globe,
    tools: [
      {
        name: "Hosting Platform",
        description:
          "The foundation for speed, uptime, trust, and performance.",
        note: "Use this for launching and running your blog reliably.",
        cta: "See hosting options",
        href: "#",
      },
      {
        name: "Content Management Setup",
        description:
          "Your publishing system should be easy to manage and scalable.",
        note: "This affects how fast you can publish and maintain content.",
        cta: "Learn more",
        href: "#",
      },
    ],
  },
  {
    title: "Email Marketing",
    icon: Mail,
    tools: [
      {
        name: "Email Platform",
        description:
          "Build an audience you own and stay in touch beyond search traffic.",
        note: "Great for newsletters, lead magnets, and reader retention.",
        cta: "Explore email tools",
        href: "#",
      },
    ],
  },
  {
    title: "Content & AI Tools",
    icon: Sparkles,
    tools: [
      {
        name: "Research & Writing Tools",
        description:
          "Helpful for idea generation, outlining, and improving productivity.",
        note: "Best used to support your thinking, not replace originality.",
        cta: "Explore content tools",
        href: "#",
      },
    ],
  },
  {
    title: "Design & Creation",
    icon: Palette,
    tools: [
      {
        name: "Design Tools",
        description:
          "Useful for blog graphics, thumbnails, layouts, and visual assets.",
        note: "Strong visuals improve clarity and engagement.",
        cta: "See design tools",
        href: "#",
      },
    ],
  },
];

export const metadata = {
  title: "Tools & Resources",
  description:
    "Explore the tools and resources recommended for blogging, email marketing, content creation, and design.",
};

export default function ToolsPage() {
  return (
    <>
      <Script
        id="tools-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Tools & Resources",
            description:
              "Recommended tools and resources for blogging, email marketing, content creation, and design.",
          }),
        }}
      />

      <main className="min-h-screen bg-[#0b0f19] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0b0f19] to-[#020617]" />
          <div className="absolute left-[-40px] top-[-40px] h-[260px] w-[260px] rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute right-[-60px] top-[10px] h-[300px] w-[300px] rounded-full bg-orange-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl mt-6">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-orange-300">
                <Wrench className="h-4 w-4" />
                Tools & resources
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                The tools behind this blog
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                This page collects the tools, platforms, and resources that
                support publishing, audience growth, content creation, and
                design. Keep this page practical, curated, and easy to act on.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/start-here"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  Start with the roadmap
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Browse articles
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-orange-300">
              Recommended stack
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Organized by what you are trying to do
            </h2>
            <p className="mt-4 text-gray-300 leading-7">
              Each section below focuses on a different part of the workflow so
              readers can find the right tools faster.
            </p>
          </div>

          <div className="space-y-10">
            {toolCategories.map((category) => {
              const Icon = category.icon;

              return (
                <section
                  key={category.title}
                  className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
                >
                  <div className="mb-8 flex items-start gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/20">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-gray-300">
                        Curated options for this part of your blogging and content workflow.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {category.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="rounded-[24px] border border-white/10 bg-[#0f172a]/60 p-6 transition hover:-translate-y-1 hover:bg-[#111827]"
                      >
                        <h4 className="text-xl font-semibold text-white">
                          {tool.name}
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-gray-300">
                          {tool.description}
                        </p>

                        <p className="mt-4 text-sm leading-7 text-orange-200/90">
                          {tool.note}
                        </p>

                        <Link
                          href={tool.href}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange-300"
                        >
                          {tool.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-orange-300">
                Recommendation principle
              </p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Keep the recommendations honest and useful
              </h2>
              <p className="mt-5 text-gray-300 leading-8">
                Only recommend tools that genuinely fit your content strategy,
                workflow, and audience. This page should feel curated, not crowded.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}