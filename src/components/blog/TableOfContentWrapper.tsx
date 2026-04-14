"use client";

import { useEffect, useState } from "react";
import TableOfContents from "./Toc";
import MobileToc from "./MobileToc";

type Heading = {
  slug: string;
  text: string;
  level: number;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function TableOfContentsWrapper({
  mobileOnly = false,
  desktopOnly = false,
}: {
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    let frame = 0;

    const collectHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll("article h2, article h3")
      ) as HTMLElement[];

      if (!elements.length) {
        frame = window.requestAnimationFrame(collectHeadings);
        return;
      }

      const slugCount: Record<string, number> = {};

      const mapped = elements.map((el) => {
        const text = el.innerText.trim();
        let slug = slugify(text) || "heading";

        if (slugCount[slug]) {
          slug = `${slug}-${slugCount[slug]++}`;
        } else {
          slugCount[slug] = 1;
        }

        el.id = slug;
        el.classList.add("scroll-mt-24");

        return {
          slug,
          text,
          level: el.tagName === "H2" ? 2 : 3,
        };
      });

      setHeadings(mapped);
    };

    collectHeadings();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!headings.length) return null;

  if (mobileOnly) return <MobileToc headings={headings} />;
  if (desktopOnly) return <TableOfContents headings={headings} />;

  return (
    <>
      <div className="lg:hidden">
        <MobileToc headings={headings} />
      </div>
      <div className="hidden lg:block">
        <TableOfContents headings={headings} />
      </div>
    </>
  );
}