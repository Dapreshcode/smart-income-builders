import Link from "next/link"
import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react"

type SequencePost = { slug: string; title?: string }

type Props = {
  current: { slug: string; title?: string } | null
  previous: SequencePost | null
  next: SequencePost | null
  guideTitle: string | null
  phaseTitle: string | null
  phaseComplete: boolean
  nextGuide: { id: string; title: string; entrySlug: string | null } | null
  incomeSystem: string
  guide: string
  level?: string
}

export default function ArticlePathNavigator({
  current,
  previous,
  next,
  guideTitle,
  phaseTitle,
  phaseComplete,
  nextGuide,
  incomeSystem,
  guide,
  level,
}: Props) {
  if (!current || !guideTitle) return null

  const withContext = (slug: string, guideId: string = guide) =>
    `/blog/${slug}?system=${incomeSystem}&guide=${guideId}`

  return (
    <section className="mt-12 rounded-[28px] border border-white/10 bg-linear-to-br from-white/10 to-white/[0.03] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300">
          <Layers3 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300">{guideTitle}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{phaseTitle}</h3>
        </div>
        {level && (
          <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/60">
            {level}
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {previous ? (
          <Link href={withContext(previous.slug)} className="group rounded-[22px] border border-white/10 bg-orange-500/10 p-5 transition hover:-translate-y-1 hover:bg-white/10">
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-orange-300">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous step
            </p>
            <h4 className="text-lg font-semibold text-white transition group-hover:text-orange-200">{previous.title}</h4>
          </Link>
        ) : (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">Previous step</p>
            <h4 className="text-lg font-semibold text-white/50">This is the first step in the guide</h4>
          </div>
        )}

        {next ? (
          <Link href={withContext(next.slug)} className="group rounded-[22px] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10">
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-orange-300">
              Next step <ArrowRight className="h-3.5 w-3.5" />
            </p>
            <h4 className="text-lg font-semibold text-white transition group-hover:text-orange-200">{next.title}</h4>
          </Link>
        ) : nextGuide?.entrySlug ? (
          <Link href={withContext(nextGuide.entrySlug, nextGuide.id)} className="group rounded-[22px] border border-orange-400/30 bg-orange-500/10 p-5 transition hover:-translate-y-1 hover:bg-orange-500/20">
            <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-orange-300">
              Phase complete <ArrowRight className="h-3.5 w-3.5" />
            </p>
            <h4 className="text-lg font-semibold text-white">Continue to {nextGuide.title}</h4>
          </Link>
        ) : (
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/45">Next step</p>
            <h4 className="text-lg font-semibold text-white/50">You've completed this system</h4>
          </div>
        )}
      </div>
    </section>
  )
}