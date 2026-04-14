import { getAllPosts } from "@/lib/mdx";
import BlogListingClient from "@/components/blog/BlogListingClient";

export default function BlogPage() {
  const posts = getAllPosts();

  const serializedPosts = posts.map((post) => ({
    slug: post.slug,
    frontmatter: {
      title: post.frontmatter?.title || "",
      description: post.frontmatter?.description || "",
      image: post.frontmatter?.image || "/p1.png",
      category: post.frontmatter?.category || "Uncategorized",
      date: post.frontmatter?.date || "",
      tags: post.frontmatter?.tags || [],
      readingTime: post.frontmatter?.readingTime || "",
    },
  }));

  return <BlogListingClient posts={serializedPosts} />;
}