import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const postsDirectory = path.join(process.cwd(), "content/blog");

// ✅ GET SINGLE POST
export async function getPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  // ❗ Safety check (prevents crash)
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content, // ✅ REQUIRED for MDX rendering
  };
}

// ✅ GET ALL POSTS (FIXED)
export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx")) // ✅ ensure only mdx files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(postsDirectory, file);

      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data,
        content, // ✅ 🔥 THIS FIXES YOUR ENTIRE ISSUE
      };
    });
}

// ✅ MDX OPTIONS (unchanged)
export const mdxOptions = {
  remarkPlugins: [],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
  ],
};