"use client";

import Link from "next/link";
import Image from "next/image";

function getPostImage(post: any) {
  return post?.image || post?.frontmatter?.image || "/p3.jpg";
}

function getPostTitle(post: any) {
  return post?.title || post?.frontmatter?.title || "Untitled Post";
}

function getPostCategory(post: any) {
  return post?.category || post?.frontmatter?.category || "Article";
}

function getPostReadingTime(post: any) {
  return post?.readingTime || post?.frontmatter?.readingTime || "5";
}

export default function RelatedPosts({ posts }: { posts: any[] }) {
  if (!posts?.length) return null;

  return (
    <section className="mt-16">
      <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
        <h3 className="text-xl font-semibold text-white mb-6">
          More to explore
        </h3>

        <div className="space-y-6">
          {posts.slice(0, 3).map((post, index) => (
            <Link
              key={post.slug || index}
              href={`/blog/${post.slug}`}
             className={`group flex gap-4  p-2 -m-2 transition-all duration-300 hover:bg-white/[0.04] ${
  index !== 0 ? "pt-6 border-t border-white/10" : ""
}`}
            >
              <div className="relative rounded-2xl w-[120px] h-[90px] shrink-0 overflow-hidden border border-white/10">
                <Image
                  src={getPostImage(post)}
                  alt={getPostTitle(post)}
                  fill
                   sizes="120px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] uppercase tracking-[0.14em] text-orange-300 mb-1">
                  {getPostCategory(post)}
                </p>

                <h4 className="text-[15px] font-medium leading-6 text-gray-100 group-hover:text-orange-200 transition">
                  {getPostTitle(post)}
                </h4>

                <p className="mt-2 text-xs text-gray-500">
                  {getPostReadingTime(post)} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}