import Link from "next/link"
import Image from "next/image"

function getPostImage(post: any) {
  return post?.image || post?.frontmatter?.image || "/p1.jpg"
}

function getPostDate(post: any) {
  return post?.date || post?.frontmatter?.date || ""
}

export function SidebarRelated({ posts }: { posts: any[] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null

  return (
    <div className="xl:pt-[320px]">
      <div className="space-y-6">
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Recommended
          </h3>

          <div className="space-y-5">
            {posts.slice(0, 4).map((post, index) => {
              const href = post?.slug ? `/blog/${post.slug}` : "#"

              return (
                <div
                  key={`${post.slug}-${index}`}
                  className={index !== 0 ? "pt-5 border-t border-white/10" : ""}
                >
                  <Link
                    href={href}
                    className="group grid grid-cols-[96px_1fr] gap-4 items-start rounded-2xl p-2 -m-2 transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={getPostImage(post)}
                        alt={post?.title || "Recommended post"}
                        width={120}
                        height={90}
                        className="h-[90px] w-[120px] object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-orange-300/90">
                        {post?.category || post?.frontmatter?.category || "Article"}
                      </p>

                      <h4 className="text-[15px] leading-6 font-medium tracking-[-0.01em] text-gray-100 transition group-hover:text-orange-200">
                        {post?.title || post?.frontmatter?.title}
                      </h4>

                      <p className="mt-3 text-xs uppercase tracking-[0.12em] text-gray-500">
                        {getPostDate(post)}
                      </p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}