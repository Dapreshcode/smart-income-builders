import Link from "next/link";

export function SidebarRelated({ posts }: { posts: any[] }) {
  if (!Array.isArray(posts)) return null;

  return (
    <aside className="hidden xl:block col-span-3">
      <div className="space-y-6">

        {/* 🔥 Recommended */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Recommended
          </h3>

          <div className="space-y-3">
            {posts.map((post, index) => {
              const href = post?.slug ? `/blog/${post.slug}` : "#";

              return (
                <Link
                  key={`${post.slug}-${index}`}
                  href={href}
                  className="flex gap-3 p-3 rounded-xl hover:bg-white/10 transition"
                >
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">
                      {post.category}
                    </p>

                    <p className="text-sm text-white font-medium line-clamp-2">
                      {post.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}