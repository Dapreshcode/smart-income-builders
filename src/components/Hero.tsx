"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-20 text-white">
      <div className="absolute inset-0 -z-30">
        <Image
          src="/home-bg.jpg"
          alt="Mountain lake background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 -z-20 bg-[#050816]/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816]/90 via-[#050816]/55 to-transparent" />

      <div className="absolute right-0 top-0 -z-10 h-[320px] w-[320px] rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[260px] w-[260px] rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto flex min-h-[88vh] max-w-7xl items-center px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-300"
            >
              Build smarter online income
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
              className="mt-6 text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Unlock Your
              <span className="block text-orange-400">Online Income</span>
              Potential
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
              className="mt-6 max-w-xl text-base leading-8 text-gray-200 sm:text-lg"
            >
              Learn how to make money online with practical strategies, premium
              guides, and growth systems designed to help you build real income.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/signup"
                className="inline-flex rounded-2xl bg-[#fff7ed] px-6 py-3.5 text-sm font-medium text-[#c2410c] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Get Started
              </Link>

              <Link
                href="/blog"
                className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Explore Articles
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-5 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <span>Practical strategies</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <span>Email marketing systems</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <span>Beginner-friendly guides</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="ml-auto max-w-md rounded-[30px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                  Growth Snapshot
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-2xl font-semibold text-white">50+</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-400">
                      Articles
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-2xl font-semibold text-white">4</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-400">
                      Core Topics
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-2xl font-semibold text-white">Email</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-400">
                      Marketing Focus
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-2xl font-semibold text-white">Action</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-400">
                      Driven Content
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <p className="mt-5 text-sm leading-7 text-gray-300">
                  Premium insights designed to help readers grow income streams,
                  improve marketing, and build digital systems that last.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b0f19] to-transparent" />
    </section>
  )
}

export default Hero