"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah L.",
    role: "Beginner Blogger",
    image: "/t1.jpg",
    text: "This platform completely changed how I approach making money online. The strategies are simple, practical, and actually work.",
  },
  {
    name: "Mark T.",
    role: "Affiliate Marketer",
    image: "/t2.jpg",
    text: "I doubled my income in 6 months just by applying what I learned here. No fluff, just real actionable insights.",
  },
  {
    name: "Jessica W.",
    role: "Content Creator",
    image: "/t3.jpg",
    text: "The resources and tools shared here are next level. It feels like having a mentor guiding you step by step.",
  },
]

export default function HomeTestimonials() {
  return (
    <section className="relative px-4 md:px-6 lg:px-8 py-20 mt-10 overflow-hidden">
      
      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0  backdrop-blur-[2px]" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* 🔥 SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-orange-400/80">
            Success Stories
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
            Real Results from Real People
          </h2>

          <p className="mt-4 text-white/70 text-sm md:text-base">
            See how others are building income streams and transforming their financial future.
          </p>
        </motion.div>

        {/* 🔥 TESTIMONIAL GRID */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className="relative group"
            >
              {/* 🔥 GLASS CARD */}
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden">

                {/* light reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

                {/* glow accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />

                {/* quote icon */}
                <Quote className="text-orange-500/40 w-8 h-8 mb-4" />

                {/* text */}
                <p className="text-white/80 text-sm leading-6">
                  “{item.text}”
                </p>

                {/* user */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-white font-semibold text-sm">
                      {item.name}
                    </p>
                    <p className="text-white/50 text-xs">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}