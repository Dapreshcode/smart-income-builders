import { Rocket, TrendingUp, Users, DollarSign, Zap } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { getGuideEntryPoint } from "@/lib/paths/getGuideEntryPoint";
import type { IncomeSystem } from "@/types/blog";

// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH for every income system, its guides, and phases.
// Adding a new income system = add one object here. Nothing else to touch.
// ---------------------------------------------------------------------------
export const incomeSystems: IncomeSystem[] = [
  {
    id: "blogging",
    title: "Blogging",
    description:
      "A practical system for building, growing, and monetizing a blog as an online income stream.",
    category: "online-income-systems",
    guides: [
      {
        id: "start-here",
        title: "Start Here",
        description:
          "Understand blogging, choose your direction, and build the foundation for your blog.",
        order: 1,
        phases: [
          { number: 1, title: "Understanding Blogging", description: "" },
          { number: 2, title: "Choose Your Direction", description: "" },
          { number: 3, title: "Build Your Blog", description: "" },
          { number: 4, title: "Build Your Content System", description: "" },
        ],
      },
      {
        id: "grow-traffic",
        title: "Grow Traffic",
        description: "Learn how to attract relevant visitors through search, distribution, and social.",
        order: 2,
        phases: [
          { number: 1, title: "Traffic Foundations", description: "" },
          { number: 2, title: "Search Traffic", description: "" },
          { number: 3, title: "Content Distribution", description: "" },
        ],
      },
      {
        id: "build-your-audience",
        title: "Build Your Audience",
        description: "Turn visitors into an audience you can reach, nurture, and own.",
        order: 3,
        phases: [
          { number: 1, title: "Capture Your Audience", description: "" },
          { number: 2, title: "Nurture Your Audience", description: "" },
        ],
      },
      {
        id: "monetize",
        title: "Monetize",
        description: "Turn your content, traffic, and audience into legitimate revenue.",
        order: 4,
        phases: [
          { number: 1, title: "Choose Your Monetization Model", description: "" },
          { number: 2, title: "Implement Monetization", description: "" },
        ],
      },
      {
        id: "grow-and-scale",
        title: "Grow & Scale",
        description: "Use systems, automation, AI, and analytics to grow more efficiently.",
        order: 5,
        phases: [
          { number: 1, title: "Improve Your Systems", description: "" },
          { number: 2, title: "Automate & Scale", description: "" },
        ],
      },
    ],
  },
  // Add "freelancing", "affiliate-marketing", etc. here later —
  // startHerePaths below picks them up automatically.
];

// ---------------------------------------------------------------------------
// Icon lookup — kept separate from the plain-data `incomeSystems` array so
// that array stays serializable/portable. Keyed by guide id.
// ---------------------------------------------------------------------------
const guideIconMap: Record<string, React.ElementType> = {
  "start-here": Rocket,
  "grow-traffic": TrendingUp,
  "build-your-audience": Users,
  monetize: DollarSign,
  "grow-and-scale": Zap,
};

// ---------------------------------------------------------------------------
// startHerePaths — COMPUTED, not hardcoded.
// One card per guide, across every income system, with href resolved via
// getGuideEntryPoint (manual guide.href override, else first article by
// phase/pathOrder from real MDX frontmatter). Guides with no articles yet
// and no manual href are filtered out rather than linking to "#".
// ---------------------------------------------------------------------------
const allPosts = getAllPosts();

// data/IncomeSystems.ts — replace the final .filter(...) line with:

export const startHerePaths = incomeSystems
  .flatMap((system) =>
    system.guides
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((guide) => {
        const href = getGuideEntryPoint(system.id, guide, allPosts);
        return {
          title: guide.title,
          description: guide.description,
          level: guide.phases[0]?.title,
          href,
          icon: guideIconMap[guide.id] ?? Rocket,
          incomeSystem: system.id,
          guideId: guide.id,
        };
      })
  )
  .filter(
    (item): item is typeof item & { href: string } => item.href !== null
  );

// ---------------------------------------------------------------------------
// featuredGuides — curated picks, not tied to the learning-path system.
// Keep these manual; they're editorial choices, not structural navigation.
// ---------------------------------------------------------------------------
export const featuredGuides = [
  {
    title: "How to Start a Blog",
    description: "The complete beginner walkthrough for launching your first blog.",
    category: "Online Income Systems",
    level: "Beginner",
    href: "/blog/how-to-start-a-blog",
  },
  {
    title: "SEO Basics for New Bloggers",
    description: "The core search fundamentals every new blog needs.",
    category: "Growth Guides",
    level: "Beginner",
    href: "/blog/seo-basics-for-new-bloggers",
  },
  {
    title: "How to Build an Email List",
    description: "Turn readers into an audience you actually own.",
    category: "Audience & Marketing",
    level: "Intermediate",
    href: "/blog/how-to-build-an-email-list",
  },
];

// ---------------------------------------------------------------------------
// recommendedToolsPreview — also manual/editorial.
// ---------------------------------------------------------------------------
export const recommendedToolsPreview = [
  {
    name: "Hosting & Platform",
    description: "The hosting and CMS setup this site runs on.",
    href: "/tools#hosting",
  },
  {
    name: "Email & List Building",
    description: "What's used to capture and nurture the audience here.",
    href: "/tools#email",
  },
  {
    name: "SEO & Content",
    description: "Research and optimization tools used for content strategy.",
    href: "/tools#seo",
  },
];