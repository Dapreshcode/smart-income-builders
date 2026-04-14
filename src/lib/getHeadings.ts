export type Heading = {
  slug: string;
  text: string;
  level: number;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");

  const headings: Heading[] = [];
  const slugCount: Record<string, number> = {};

  lines.forEach((line) => {
    const match = /^(##|###)\s+(.*)/.exec(line);

    if (!match) return;

    const level = match[1].length; // 2 or 3
    const text = match[2].trim();

    let baseSlug = slugify(text);

    // ✅ ensure unique slug
    if (slugCount[baseSlug]) {
      baseSlug = `${baseSlug}-${slugCount[baseSlug]++}`;
    } else {
      slugCount[baseSlug] = 1;
    }

    headings.push({
      slug: baseSlug,
      text,
      level,
    });
  });

  return headings;
}