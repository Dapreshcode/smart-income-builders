import { getPost, getAllPosts } from "@/lib/mdx";
import BlogDetail from "@/components/blog/BlogDetail";
import Script from "next/script";
import { getRelatedPosts } from "@/lib/related/getRelatedPosts";
import { injectAffiliatePosts } from "@/lib/related/injectAffiliatePosts";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import { InlineRelated } from "@/components/related/InlineRelated";
import { getBookmarkState } from "@/app/actions/bookmarks";
import BookmarkButton from "@/components/blog/BookmarkButton";
import { getPathSequence } from "@/lib/paths/getPathSequence";
import ArticlePathNavigator from "@/components/blog/ArticlepathNavigator";
import TrackArticleView from "@/components/blog/TrackArticleView"

// ✅ SEO metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

// ✅ Page component
export default async function BlogPostPage({ params }: any) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const posts = getAllPosts();
  const sequence = getPathSequence(slug, posts);

  const fm = post.frontmatter;

  const currentPost = {
    slug: post.slug,
    title: fm.title,
    category: fm.category,
    tags: fm.tags || [],
    date: fm.date,
    affiliate: fm.affiliate || false,
  };

  // ✅ BOOKMARK STATE
  const isBookmarked = await getBookmarkState(slug);

  // ✅ RELATED ENGINE
  let related = getRelatedPosts(currentPost, posts);
  related = injectAffiliatePosts(related, currentPost);

  return (
    <>
      {/* ✅ JSON-LD */}
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            datePublished: post.frontmatter.date,
            author: {
              "@type": "Person",
              name: post.frontmatter.author || "SmartIncomeBuilders",
            },
          }),
        }}
      />

      {/* ✅ LAYOUT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-start">
          <div className="xl:col-span-9 min-w-0">
              {/* ✅ TRACK ARTICLE VIEW */}
            <TrackArticleView
              slug={slug}
              title={post.frontmatter.title}
              category={post.frontmatter.category}
            />
            <BlogDetail
              post={post}
              bookmarkButton={
                <BookmarkButton
                  postSlug={slug}
                  initiallySaved={isBookmarked}
                />
              }
              pathNavigator={
                <ArticlePathNavigator
                  current={sequence.current}
                  previous={sequence.previous}
                  next={sequence.next}
                />
              }
            />

            <InlineRelated posts={related} />
          </div>

          <div className="xl:col-span-3 min-w-0 self-start sticky top-24">
            <ArticleSidebar
              postSlug={slug}
              category={post.frontmatter.category}
              related={related}
            />
          </div>
        </div>
      </div>
    </>
  );
}