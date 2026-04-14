import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "./MDXcomponent";
import TableOfContentsWrapper from "./TableOfContentWrapper";
import ArticleReactionBar from "./ArticleReactionBar";

type BlogDetailProps = {
  post: any;
  bookmarkButton?: React.ReactNode;
};

export default function BlogDetail({ post, bookmarkButton }: BlogDetailProps) {
  const category = post.frontmatter.category || "Article";
  const title = post.frontmatter.title || "Untitled Post";
  const date = post.frontmatter.date || "";
  const image = post.frontmatter.image || "/p1.jpg";

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen">
      {/* HERO */}
      <section className="relative py-20 px-6 overflow-hidden mb-15">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0b0f19] to-[#020617]" />
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-orange-500/20 blur-3xl rounded-full" />

        <div className="relative max-w-5xl mx-auto">
          <span className="bg-orange-500/90 px-4 py-1.5 rounded-full text-xs tracking-wide uppercase">
            {category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-6 leading-tight text-white">
            {title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span>{date}</span>
              <span>•</span>
              <span>7 min read</span>
            </div>

            {bookmarkButton}
          </div>

          <div className="mt-6">
            <Link
              href="/start-here"
              className="inline-flex items-center rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 transition hover:bg-orange-500/15 hover:text-orange-200"
            >
              New here? Start with the full roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="lg:hidden mb-6">
          <TableOfContentsWrapper mobileOnly />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 lg:sticky lg:top-24 self-start h-fit">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <TableOfContentsWrapper desktopOnly />
            </div>
          </aside>

          <article className="lg:col-span-9 xl:col-span-9 min-w-0">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={650}
              className="rounded-[28px] shadow-[0_18px_50px_rgba(0,0,0,0.35)] w-full h-auto mb-8 border border-white/10"
            />

            <div className="mb-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300 mb-3">
                Quick direction
              </p>

              <h2 className="text-2xl sm:text-[1.75rem] font-semibold leading-tight text-white mb-3">
                Want the bigger picture, the tools, or just this guide?
              </h2>

              <p className="text-sm sm:text-[15px] leading-7 text-gray-300 mb-5 max-w-2xl">
                If you are completely new, start with the roadmap. If you want
                the tools and resources behind this blog, explore the tools
                page. Otherwise, continue reading this guide and use the related
                posts below to go deeper.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/start-here"
                  className="inline-flex items-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 hover:-translate-y-0.5"
                >
                  Go to Start Here
                </Link>

                <Link
                  href="/tools"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Explore Tools
                </Link>
              </div>
            </div>

            <div
              className="prose prose-invert max-w-none
              !text-gray-100
              prose-p:!text-gray-100
              prose-li:!text-gray-100
              prose-strong:!text-white
              prose-headings:!text-white
              prose-h2:!text-white
              prose-h3:!text-white
              prose-a:!text-orange-400
              prose-p:leading-8
              prose-li:leading-8"
            >
              <MDXRemote source={post.content} components={MDXComponents} />
            </div>

            <ArticleReactionBar slug={post.slug} title={post.frontmatter.title} />

            <div className="mt-12 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#111827]/90 to-[#0b1220]/90 p-6 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300 mb-3">
                Choose your next step
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Keep moving forward
              </h3>

              <p className="text-gray-300 leading-7 mb-6 max-w-2xl">
                Whether you want a beginner roadmap, the tools behind this blog,
                or more articles like this one, here is the best next move.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/start-here"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 hover:-translate-y-1"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-orange-300 mb-2">
                    For beginners
                  </p>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-200 transition">
                    Start Here
                  </h4>
                  <p className="text-sm leading-6 text-gray-300">
                    Follow the full roadmap if you want a structured
                    step-by-step path.
                  </p>
                </Link>

                <Link
                  href="/tools"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 hover:-translate-y-1"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-orange-300 mb-2">
                    For action takers
                  </p>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-200 transition">
                    Tools & Resources
                  </h4>
                  <p className="text-sm leading-6 text-gray-300">
                    Explore the tools, platforms, and resources recommended
                    throughout the blog.
                  </p>
                </Link>

                <Link
                  href="/blog"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 hover:-translate-y-1"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-orange-300 mb-2">
                    For more reading
                  </p>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-200 transition">
                    Read More Articles
                  </h4>
                  <p className="text-sm leading-6 text-gray-300">
                    Continue with more guides, strategies, and related content.
                  </p>
                </Link>
              </div>
            </div>

            <div id="mid-trigger" className="h-px w-full mt-12" />
          </article>
        </div>
      </div>
    </div>
  );
}