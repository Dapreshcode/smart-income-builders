import { getAllPosts } from "@/lib/mdx";
import FeaturedPostsClient from "./FeaturedPostClient";

export default function FeaturedPosts() {
  const posts = getAllPosts(); // ✅ server-only

  return <FeaturedPostsClient posts={posts} />;
}