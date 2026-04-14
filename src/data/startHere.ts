// src/data/startHere.ts
import {
  Laptop2,
  DollarSign,
  Wrench,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type StartPath = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type FeaturedGuide = {
  title: string;
  category: string;
  description: string;
  href: string;
};

export type RecommendedToolPreview = {
  name: string;
  description: string;
  href: string;
};

export const startHerePaths: StartPath[] = [
  {
    title: "Start a Blog",
    description:
      "Learn the right foundation for building a blog that can grow into a real business.",
    href: "/blog/how-to-start-a-blog",
    icon: Laptop2,
  },
  {
    title: "Make Money Online",
    description:
      "Understand practical monetization methods and how to build income with content.",
    href: "/blog/how-to-monetize-a-blog",
    icon: DollarSign,
  },
  {
    title: "Tools & Resources",
    description:
      "See the tools, platforms, and resources recommended throughout this website.",
    href: "/tools",
    icon: Wrench,
  },
  {
    title: "Grow Traffic",
    description:
      "Learn how SEO, internal linking, and content strategy bring the right readers in.",
    href: "/blog/seo-for-beginners",
    icon: TrendingUp,
  },
];

export const featuredGuides: FeaturedGuide[] = [
  {
    title: "How to Start a Blog in 2026",
    category: "Blogging",
    description:
      "A beginner-friendly guide to setting up your blog the right way from day one.",
    href: "/blog/how-to-start-a-blog",
  },
  {
    title: "How to Monetize a Blog from Day One",
    category: "Monetization",
    description:
      "Learn the monetization paths that fit a modern content website.",
    href: "/blog/how-to-monetize-a-blog",
  },
  {
    title: "SEO Basics for Beginners",
    category: "SEO",
    description:
      "Understand the fundamentals of getting your content discovered through search.",
    href: "/blog/seo-for-beginners",
  },
];

export const recommendedToolsPreview: RecommendedToolPreview[] = [
  {
    name: "Blog Hosting",
    description:
      "Reliable hosting is the first major decision for performance, trust, and growth.",
    href: "/tools",
  },
  {
    name: "Email Platform",
    description:
      "An email list lets you build an audience you own, not just borrowed traffic.",
    href: "/tools",
  },
  {
    name: "Content & AI Tools",
    description:
      "Use the right tools to research, write, and refine content more efficiently.",
    href: "/tools",
  },
];