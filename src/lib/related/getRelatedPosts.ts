import { getAllPosts } from "@/lib/mdx";
import { scorePosts } from "./scorePosts";

export function getRelatedPosts(currentPost: any, allPosts: any[], limit = 4) {
  const filtered = allPosts.filter(
    (p) => p.slug !== currentPost.slug
  );

  const scored = scorePosts(filtered, currentPost);

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((p) => ({
      ...p,
      url: `/blog/${p.slug}`, // ✅ IMPORTANT
    }));
}