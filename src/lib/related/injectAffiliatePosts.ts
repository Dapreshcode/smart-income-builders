export function injectAffiliatePosts(posts: any[], currentPost: any) {
  const injected: any[] = []; // your affiliate logic

const combined = [
  ...posts.slice(0, 2),
  ...injected,
  ...posts.slice(2),
];

// ✅ REMOVE DUPLICATES
  const unique = Array.from(
    new Map(combined.map((p) => [p.slug, p])).values()
  );

  return unique.map((p) => ({
    ...p,
    url: p.url || `/blog/${p.slug}`, // ✅ GUARANTEE URL
  }));
}