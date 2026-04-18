"use client"

import { motion } from "framer-motion"
import { ArrowRight, BadgeCheck, Sparkles, Layers3 } from "lucide-react"
import Link from "next/link"
import ImageBox from "@/components/shared/ImageBox"

export default function AboutSection() {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <ImageBox
              src="/p2.jpg"
              alt="Digital growth workspace"
              variant="overlay"
              size="xl"
              eyebrow="About This Platform"
              title="A smarter place to learn digital growth"
              description="Built for readers who want practical, high-signal content on income, marketing, and digital systems."
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-300">
              Why this blog exists
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-white md:text-4xl">
              Premium guidance for building online income with clarity
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/68 md:text-base">
              This blog is built to simplify digital growth. Instead of vague
              motivation and recycled advice, it focuses on practical systems,
              clear breakdowns, and high-quality articles that help readers take
              useful action.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <BadgeCheck className="h-5 w-5 text-orange-400" />
                <h3 className="mt-3 text-sm font-semibold text-white">
                  Actionable Content
                </h3>
                <p className="mt-2 text-xs leading-6 text-white/52">
                  Clear articles you can apply without guesswork.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <Layers3 className="h-5 w-5 text-orange-400" />
                <h3 className="mt-3 text-sm font-semibold text-white">
                  Structured Learning
                </h3>
                <p className="mt-2 text-xs leading-6 text-white/52">
                  Topics organized to help readers grow step by step.
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                <Sparkles className="h-5 w-5 text-orange-400" />
                <h3 className="mt-3 text-sm font-semibold text-white">
                  Premium Experience
                </h3>
                <p className="mt-2 text-xs leading-6 text-white/52">
                  A modern reading experience designed to feel intentional.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-orange-500/10 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-orange-300"
              >
                Explore the blog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}