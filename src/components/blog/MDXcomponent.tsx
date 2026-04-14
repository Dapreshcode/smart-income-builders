import { AffiliateBox } from "@/components/mdx/AffiliateBox";
import { EmailCapture } from "@/components/mdx/EmailCapture";
import { CTA } from "@/components/mdx/Cta";

const MDXComponents = {
 h2: (props: any) => (
  <h2
    className="text-2xl md:text-3xl font-bold mt-14 mb-5 text-white tracking-tight"
    {...props}
  />
),

h3: (props: any) => (
  <h3
    className="text-xl md:text-2xl font-semibold mt-10 mb-4 text-white tracking-tight"
    {...props}
  />
),

p: (props: any) => (
  <p
    className="leading-8 text-[17px] text-gray-100/95 mb-6"
    {...props}
  />
),

  ul: (props: any) => (
    <ul
      className="list-disc pl-6 mb-6 space-y-2 text-gray-100/95"
      {...props}
    />
  ),

  ol: (props: any) => (
    <ol
      className="list-decimal pl-6 mb-6 space-y-2 text-gray-100/95"
      {...props}
    />
  ),

  li: (props: any) => (
    <li className="leading-8 text-[17px]" {...props} />
  ),

  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-orange-500/80 bg-white/5 rounded-r-xl px-5 py-4 my-8 text-gray-100 italic"
      {...props}
    />
  ),

  a: (props: any) => (
    <a
      className="text-orange-400 underline underline-offset-4 hover:text-orange-300 transition"
      {...props}
    />
  ),

  CTA,
  AffiliateBox,
  EmailCapture,
};

export { MDXComponents };