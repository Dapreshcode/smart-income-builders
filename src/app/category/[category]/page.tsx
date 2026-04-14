import { getAllPosts } from "@/lib/mdx";
import BlogCategoryClient from "@/components/blog/BlogCategoryClient";

export default async function CategoryPage({ params }: any) {
  const { category } = await params;

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

  const allCategories = Array.from(
    new Set(
      serializedPosts
        .map((post) => post.frontmatter.category)
        .filter(Boolean)
    )
  );

  return (
    <BlogCategoryClient
      posts={serializedPosts}
      currentCategorySlug={category}
      categories={allCategories}
    />
  );
}