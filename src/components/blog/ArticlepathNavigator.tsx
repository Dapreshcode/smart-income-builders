import Link from "next/link"
import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react"

type SequencePost = {
  slug: string
  frontmatter: {
    title?: string
    path?: string
    pathLabel?: string
    pathOrder?: number
    level?: string
  }
}

type Props = {
  current: SequencePost | null
  previous: SequencePost | null
  next: SequencePost | null
}

export default function ArticlePathNavigator({
  current,
  previous,
  next,
}: Props) {
  if (!current?.frontmatter?.path) return null

  return (
    <section className="mt-12 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300">
          <Layers3 className="h-4 w-4" />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300">
            Learning path
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            {current.frontmatter.pathLabel || current.frontmatter.path}
          </h3>
        </div>

        {current.frontmatter.level && (
          <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/60">
            {current.frontmatter.level}
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {previous ? (
          <Link
            href={`/blog/${previous.slug}`}
            className="group rounded-[22px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-orange-300">
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous step
            </p>

            <h4 className="text-lg font-semibold text-white transition group-hover:text-orange-200">
              {previous.frontmatter.title}
            </h4>
          </Link>
        ) : (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">
              Previous step
            </p>
            <h4 className="text-lg font-semibold text-white/50">
              This is the first step in the path
            </h4>
          </div>
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group rounded-[22px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-orange-300">
              Next step
              <ArrowRight className="h-3.5 w-3.5" />
            </p>

            <h4 className="text-lg font-semibold text-white transition group-hover:text-orange-200">
              {next.frontmatter.title}
            </h4>
          </Link>
        ) : (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">
              Next step
            </p>
            <h4 className="text-lg font-semibold text-white/50">
              You’ve reached the current end of this path
            </h4>
          </div>
        )}
      </div>
    </section>
  )
}