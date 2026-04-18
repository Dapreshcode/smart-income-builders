type PostLike = {
  slug: string
  frontmatter: {
    title?: string
    description?: string
    category?: string
    path?: string
    pathLabel?: string
    pathOrder?: number
    level?: string
  }
}

export function getPathSequence(currentSlug: string, posts: PostLike[]) {
  const currentPost = posts.find((post) => post.slug === currentSlug)
  if (!currentPost) {
    return {
      current: null,
      previous: null,
      next: null,
      siblings: [],
    }
  }

  const currentPath = currentPost.frontmatter.path
  const currentOrder = currentPost.frontmatter.pathOrder

  if (!currentPath || typeof currentOrder !== "number") {
    return {
      current: currentPost,
      previous: null,
      next: null,
      siblings: [],
    }
  }

  const siblings = posts
    .filter(
      (post) =>
        post.frontmatter.path === currentPath &&
        typeof post.frontmatter.pathOrder === "number"
    )
    .sort(
      (a, b) =>
        (a.frontmatter.pathOrder ?? 0) - (b.frontmatter.pathOrder ?? 0)
    )

  const currentIndex = siblings.findIndex((post) => post.slug === currentSlug)

  return {
    current: currentPost,
    previous: currentIndex > 0 ? siblings[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null,
    siblings,
  }
}