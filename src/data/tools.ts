import { Globe, Mail, Sparkles, Palette } from "lucide-react"

export const toolCategories = [
  {
    title: "Blogging & Website Tools",
    icon: Globe,
    order: 1,
    tools: [
      {
        name: "Hosting Platform",
        description:
          "The foundation for speed, uptime, trust, and performance.",
        note: "Use this for launching and running your blog reliably.",
        cta: "See hosting options",
        href: "#",
      },
      {
        name: "Content Management Setup",
        description:
          "Your publishing system should be easy to manage and scalable.",
        note: "This affects how fast you can publish and maintain content.",
        cta: "Learn more",
        href: "#",
      },
    ],
  },
  {
    title: "Email Marketing",
    icon: Mail,
    order: 2,
    tools: [
      {
        name: "Email Platform",
        description:
          "Build an audience you own and stay in touch beyond search traffic.",
        note: "Great for newsletters, lead magnets, and reader retention.",
        cta: "Explore email tools",
        href: "#",
      },
    ],
  },
  {
    title: "Content & AI Tools",
    icon: Sparkles,
    order: 3,
    tools: [
      {
        name: "Research & Writing Tools",
        description:
          "Helpful for idea generation, outlining, and improving productivity.",
        note: "Best used to support your thinking, not replace originality.",
        cta: "Explore content tools",
        href: "#",
      },
    ],
  },
  {
    title: "Design & Creation",
    icon: Palette,
    order: 4,
    tools: [
      {
        name: "Design Tools",
        description:
          "Useful for blog graphics, thumbnails, layouts, and visual assets.",
        note: "Strong visuals improve clarity and engagement.",
        cta: "See design tools",
        href: "#",
      },
    ],
  },
]