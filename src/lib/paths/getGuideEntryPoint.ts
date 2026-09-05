  import type { Guide, PostLike } from "@/types/blog";

  export function getGuideEntryPoint(
    incomeSystem: string,
    guide: Guide,
    allPosts: PostLike[]
  ): string | null {
    // Manual override always wins
    if (guide.href) return guide.href;

    const matches = allPosts
      .flatMap((post) =>
        (post.frontmatter.learningPaths ?? [])
          .filter(
            (lp) => lp.incomeSystem === incomeSystem && lp.guide === guide.id
          )
          .map((lp) => ({ slug: post.slug, phase: lp.phase, pathOrder: lp.pathOrder }))
      )
      .sort((a, b) => a.phase - b.phase || a.pathOrder - b.pathOrder);

    return matches[0] ? `/blog/${matches[0].slug}` : null;
  }