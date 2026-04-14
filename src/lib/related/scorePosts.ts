export function scorePosts(posts: any[], currentPost: any) {
  if (!Array.isArray(posts)) return [];

  return posts.map((post) => {
    let score = 0;

    if (post.category === currentPost.category) score += 3;

    if (post.tags && currentPost.tags) {
      const overlap = post.tags.filter((tag: string) =>
        currentPost.tags.includes(tag)
      );
      score += overlap.length * 2;
    }

    return { ...post, score };
  });
}