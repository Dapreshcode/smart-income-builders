"use client";

import { useEffect, useState } from "react";
import RelatedPosts from "./RelatedPosts";

export function InlineRelated({ posts }: { posts: any[] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("mid-trigger");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  if (!visible || !posts?.length) return null;

  return <RelatedPosts posts={posts} />;
}