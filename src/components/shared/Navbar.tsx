"use client"


import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Resources", href: "/resources" }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
const pathname = usePathname()

  useEffect(() => {
   
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    } else {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)

    if (nextDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const goBack = () => window.history.back()
  const goForward = () => window.history.forward()

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 pt-4"
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-300 ${
            isScrolled ? "scale-[0.99]" : "scale-100"
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 ${
              isScrolled
                ? "bg-[#0b1020]/78 backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,0.38)]"
                : "bg-[#0b1020]/62 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.24)]"
            }`}
          >
            {/* premium reflection */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%)]" />

            {/* orange glow */}
            <div className="pointer-events-none absolute -top-10 right-20 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />

            <div
              className={`relative flex items-center justify-between transition-all duration-300 ${
                isScrolled ? "h-16 px-4 md:px-5" : "h-[72px] px-4 md:px-6"
              }`}
            >
              {/* left */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={goBack}
                  className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-orange-300"
                  aria-label="Go back"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={goForward}
                  className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-orange-300"
                  aria-label="Go forward"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <Link href="/" className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/20 bg-gradient-to-br from-orange-500/20 to-orange-600/10 text-orange-300 shadow-[0_8px_24px_rgba(249,115,22,0.18)]">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white md:text-base">
                      Smart Income
                      <span className="text-orange-400"> Builders</span>
                    </p>
                    <p className="hidden text-[11px] uppercase tracking-[0.18em] text-white/38 md:block">
                      Premium Digital Growth Blog
                    </p>
                  </div>
                </Link>
              </div>

              {/* center nav */}
              <nav className="hidden lg:flex items-center gap-2">
                {navLinks.map((link) => {
                  const active = pathname === link.href

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-white/10 text-orange-300"
                          : "text-white/72 hover:bg-white/6 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </nav>

              {/* right */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-orange-300"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>

                <Link
                  href="/login"
                  className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.24)] transition hover:brightness-110"
                >
                  Sign Up
                </Link>

                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 lg:hidden"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[92px] z-40 lg:hidden"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/92 backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%)]" />

              <div className="relative space-y-2 p-4">
                {navLinks.map((link) => {
                  const active = pathname === link.href

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-white/10 text-orange-300"
                          : "text-white/75 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}

                <div className="mt-3 grid grid-cols-2 gap-3 pt-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.24)]"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}