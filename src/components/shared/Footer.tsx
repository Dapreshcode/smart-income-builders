"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Pyramid, Palette, Phone, MessageCircleMore } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative px-4 md:px-6 lg:px-8 pt-20 pb-10 overflow-hidden">
      
      {/* 🔥 OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

      <div className="relative max-w-7xl mx-auto">

        {/* 🔥 MAIN FOOTER GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* 🔥 BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-white">
              SmartIncome<span className="text-orange-500">.</span>
            </h2>

            <p className="mt-4 text-white/60 text-sm leading-6">
              Helping creators, bloggers, and digital builders grow sustainable
              income streams online.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-3 mt-6">
              <SocialIcon href="#" icon={<Pyramid />} />
              <SocialIcon href="#" icon={<Palette />} />
              <SocialIcon href="#" icon={<Phone />} />
              <SocialIcon href="#" icon={<MessageCircleMore />} />
            </div>
          </motion.div>

          {/* 🔥 QUICK LINKS */}
          <FooterColumn
            title="Explore"
            links={[
              { label: "Blog", href: "/blog" },
              { label: "Categories", href: "/category" },
              { label: "Tools", href: "/tools" },
              { label: "Resources", href: "/resources" },
            ]}
          />

          {/* 🔥 COMPANY */}
          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ]}
          />

          {/* 🔥 MINI NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">
              Stay Updated
            </h3>

            <p className="mt-4 text-white/60 text-sm">
              Get weekly insights on building income online.
            </p>

            <form className="mt-5 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange-500/50"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition">
                Join
              </button>
            </form>
          </motion.div>
        </div>

        {/* 🔥 DIVIDER */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 🔥 BOTTOM BAR */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SmartIncome. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* 🔥 FOOTER COLUMN */
function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-white font-semibold text-sm uppercase tracking-widest">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className="text-white/60 text-sm hover:text-orange-400 transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* 🔥 SOCIAL ICON */
function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-orange-500/50 transition"
    >
      <span className="text-white/60 group-hover:text-orange-400 transition">
        {icon}
      </span>
    </a>
  )
}