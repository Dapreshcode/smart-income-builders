  // lib/getPathSequence.ts
  import { PostLike, IncomeSystem } from "@/types/blog"

  type Context = { incomeSystem: string; guide: string }

  export function getPathSequence(
    currentSlug: string,
    posts: PostLike[],
    context: Context,
    incomeSystems: IncomeSystem[]
  ) {
    const currentPost = posts.find((p) => p.slug === currentSlug)
    if (!currentPost) {
      return { current: null, previous: null, next: null, phaseComplete: false, nextGuide: null, guideTitle: null, phaseTitle: null }
    }

    const currentEntry = currentPost.frontmatter.learningPaths?.find(
      (lp) => lp.incomeSystem === context.incomeSystem && lp.guide === context.guide
    )

    if (!currentEntry) {
      // This post isn't part of this particular guide context
      return { current: currentPost, previous: null, next: null, phaseComplete: false, nextGuide: null, guideTitle: null, phaseTitle: null }
    }

    // One combined, ordered sequence for the whole guide (all phases)
    const sequence = posts
      .flatMap((post) =>
        (post.frontmatter.learningPaths ?? [])
          .filter((lp) => lp.incomeSystem === context.incomeSystem && lp.guide === context.guide)
          .map((lp) => ({ slug: post.slug, title: post.frontmatter.title, ...lp }))
      )
      .sort((a, b) => a.phase - b.phase || a.pathOrder - b.pathOrder)

    const index = sequence.findIndex((entry) => entry.slug === currentSlug)
    const previous = index > 0 ? sequence[index - 1] : null
    const next = index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : null

    const phaseComplete = !next || next.phase !== currentEntry.phase

    // If the guide has ended, look up what comes next in the income system
    let nextGuide: { id: string; title: string; entrySlug: string | null } | null = null
    if (phaseComplete && !next) {
      const system = incomeSystems.find((s) => s.id === context.incomeSystem)
      const guides = system?.guides.slice().sort((a, b) => a.order - b.order) ?? []
      const currentIndex = guides.findIndex((g) => g.id === context.guide)
      const upcoming = guides[currentIndex + 1]
      if (upcoming) {
        nextGuide = {
          id: upcoming.id,
          title: upcoming.title,
          entrySlug: upcoming.href
            ? upcoming.href.replace("/blog/", "")
            : posts
                .flatMap((post) =>
                  (post.frontmatter.learningPaths ?? [])
                    .filter((lp) => lp.incomeSystem === context.incomeSystem && lp.guide === upcoming.id)
                    .map((lp) => ({ slug: post.slug, ...lp }))
                )
                .sort((a, b) => a.phase - b.phase || a.pathOrder - b.pathOrder)[0]?.slug ?? null,
        }
      }
    }

    const system = incomeSystems.find((s) => s.id === context.incomeSystem)
    const guide = system?.guides.find((g) => g.id === context.guide)
    const phase = guide?.phases.find((p) => p.number === currentEntry.phase)

    return {
      current: currentPost,
      previous,
      next,
      phaseComplete,
      nextGuide,
      guideTitle: guide?.title ?? null,
      phaseTitle: phase?.title ?? null,
    }
  }