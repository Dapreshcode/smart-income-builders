// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { LearningPathEntry } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title?: string;
  description?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  image?: string;
  learningPaths?: LearningPathEntry[];
  level?: string;
  country?: string;
  language?: string;
  featured?: boolean;
  affiliate?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

// ---------------------------------------------------------------------------
// Recursively walk content/blog (and any subfolders, any depth) and return
// the full filesystem path of every .mdx file found. Folder names are
// purely organizational — they never affect the slug or any content field.
// ---------------------------------------------------------------------------
function getAllMdxFilePaths(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getAllMdxFilePaths(fullPath); // recurse into subfolders
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      return [fullPath];
    }

    return [];
  });
}

// ✅ GET SINGLE POST
export async function getPost(slug: string): Promise<Post | null> {
  const allPaths = getAllMdxFilePaths(postsDirectory);

  // Slug is always just the filename, regardless of which subfolder it's in
  const match = allPaths.find(
    (filePath) => path.basename(filePath, ".mdx") === slug
  );

  if (!match) return null;

  const fileContents = fs.readFileSync(match, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

// ✅ GET ALL POSTS
export function getAllPosts(): Post[] {
  const allPaths = getAllMdxFilePaths(postsDirectory);

  const seenSlugs = new Set<string>();

  return allPaths.map((filePath) => {
    const slug = path.basename(filePath, ".mdx");

    // Guard against two files in different folders sharing a filename —
    // this WOULD silently collide since slugs are flat by design.
    if (seenSlugs.has(slug)) {
      console.warn(
        `⚠️ Duplicate MDX slug "${slug}" found at ${filePath}. Slugs must be unique across all subfolders.`
      );
    }
    seenSlugs.add(slug);

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
    };
  });
}

// ✅ MDX OPTIONS (unchanged)
export const mdxOptions = {
  remarkPlugins: [],
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
};