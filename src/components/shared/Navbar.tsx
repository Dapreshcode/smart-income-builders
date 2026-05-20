"use client"

import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useEffect, useState, useCallback, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import UserMenu from "@/components/navigation/UserMenu"
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  LayoutDashboard,
  User,
  Bookmark,
  History,
  Shield,
} from "lucide-react"
import LogoutButton from "@/components/account/LogoutButton"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Resources", href: "/resources" },
  { name: "Saved", href: "/saved" },
]

const accountLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/account/settings",
    label: "Profile Settings",
    icon: User,
  },
  {
    href: "/saved",
    label: "Saved Articles",
    icon: Bookmark,
  },
  {
    href: "/history",
    label: "Reading History",
    icon: History,
  },
  {
    href: "/account/security",
    label: "Security",
    icon: Shield,
  },
]

interface Profile {
  full_name: string | null
  username: string | null
  avatar_url: string | null
  onboarding_completed: boolean
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const fetchInProgress = useRef(false)

  const pathname = usePathname()
  const router = useRouter()

  // Memoize fetch function to avoid recreating
  const fetchUserAndProfile = useCallback(async (retryCount = 0) => {
    // Prevent multiple simultaneous fetches
    if (fetchInProgress.current) {
      console.log("Fetch already in progress, skipping...")
      return
    }

    try {
      fetchInProgress.current = true
      console.log("Starting fetchUserAndProfile...")
      
      const supabase = createClient()
      
      // Try to get session with timeout
      const sessionPromise = supabase.auth.getSession()
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Session fetch timeout")), 5000)
      )
      
      const { data: sessionData, error: sessionError } = await Promise.race([
        sessionPromise,
        timeoutPromise
      ]) as any

      if (sessionError) {
        console.error("Error fetching session:", sessionError)
        if (retryCount < 2) {
          console.log(`Retrying... (${retryCount + 1}/2)`)
          setTimeout(() => fetchUserAndProfile(retryCount + 1), 1000)
          return
        }
        setUser(null)
        setProfile(null)
        setIsLoading(false)
        return
      }

      if (!sessionData?.session) {
        console.log("No active session")
        setUser(null)
        setProfile(null)
        setIsLoading(false)
        return
      }

      // Get user from session
      const { data: { user: userData }, error: userError } = await supabase.auth.getUser()

      if (userError) {
        console.error("Error fetching user:", userError)
        if (retryCount < 2) {
          console.log(`Retrying... (${retryCount + 1}/2)`)
          setTimeout(() => fetchUserAndProfile(retryCount + 1), 1000)
          return
        }
        setUser(null)
        setProfile(null)
        setIsLoading(false)
        return
      }

      console.log("Fetched user:", userData?.email)

      if (!userData) {
        console.log("No user found")
        setUser(null)
        setProfile(null)
        setIsLoading(false)
        return
      }

      setUser(userData)

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(`
          full_name,
          username,
          avatar_url,
          onboarding_completed
        `)
        .eq("id", userData.id)
        .maybeSingle()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
      }

      console.log("Fetched profile:", profileData?.username || "No username")
      setProfile(profileData || null)
      setIsLoading(false)
    } catch (error) {
      console.error("Error in fetchUserAndProfile:", error)
      if (retryCount < 2) {
        console.log(`Retrying after error... (${retryCount + 1}/2)`)
        setTimeout(() => fetchUserAndProfile(retryCount + 1), 1000)
      } else {
        setUser(null)
        setProfile(null)
        setIsLoading(false)
      }
    } finally {
      fetchInProgress.current = false
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Handle theme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    } else {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    const supabase = createClient()

    // Initial fetch
    fetchUserAndProfile()

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email)
        
        if (event === "SIGNED_IN") {
          setIsLoading(true)
          // Small delay to ensure session is properly established
          setTimeout(() => {
            fetchUserAndProfile()
          }, 500)
        } else if (event === "SIGNED_OUT") {
          setUser(null)
          setProfile(null)
          setIsLoading(false)
        } else if (event === "TOKEN_REFRESHED" && session?.user) {
          setUser(session.user)
          // Refresh profile data
          fetchUserAndProfile()
        }
      }
    )

    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      subscription.unsubscribe()
    }
  }, [fetchUserAndProfile])

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

  const goBack = () => router.back()
  const goForward = () => router.forward()

  // Check if user is logged in (has user object)
  const isLoggedIn = !!user
  const isOnDashboard = pathname === "/dashboard"

  console.log("Render state - isLoading:", isLoading, "isLoggedIn:", isLoggedIn)

  // Handle avatar click based on current page
  const handleAvatarClick = () => {
    if (!profile?.onboarding_completed) {
      router.push("/account")
    } else if (!isOnDashboard) {
      router.push("/dashboard")
    }
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="h-16 rounded-2xl bg-[#0b1020]/62 backdrop-blur-xl" />
        </div>
      </motion.header>
    )
  }

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6 lg:px-8"
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-300 ${
            isScrolled ? "scale-[0.99]" : "scale-100"
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 ${
              isScrolled
                ? "bg-[#0b1020]/78 shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
                : "bg-[#0b1020]/62 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            }`}
          >
            {/* Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%)]" />

            {/* Glow */}
            <div className="pointer-events-none absolute -top-10 right-20 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />

            <div
              className={`relative flex items-center justify-between transition-all duration-300 ${
                isScrolled ? "h-16 px-4 md:px-5" : "h-[72px] px-4 md:px-6"
              }`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={goBack}
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-orange-300 sm:flex"
                  aria-label="Go back"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={goForward}
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-orange-300 sm:flex"
                  aria-label="Go forward"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <Link
                  href="/"
                  className="flex min-w-0 items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/20 bg-gradient-to-br from-orange-500/20 to-orange-600/10 text-orange-300 shadow-[0_8px_24px_rgba(249,115,22,0.18)]">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-sm font-semibold text-white md:text-base">
                      Smart Income
                      <span className="text-orange-400"> Builders</span>
                    </p>

                    <p className="hidden text-[11px] uppercase tracking-[0.18em] text-white/38 md:block">
                      Premium Digital Growth Blog
                    </p>
                  </div>
                </Link>
              </div>

              {/* CENTER NAV */}
              <nav className="hidden items-center gap-2 lg:flex">
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

              {/* RIGHT */}
              <div className="flex items-center gap-2">
                {/* THEME */}
                <button
                  onClick={toggleTheme}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-orange-300"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>

                {/* MOBILE MENU BUTTON */}
                <button
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setMobileDropdownOpen(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-orange-300 lg:hidden"
                  aria-label="Menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* DESKTOP AVATAR - Show when user is logged in */}
                {isLoggedIn && (
                  <div className="hidden lg:block">
                    {!profile?.onboarding_completed ? (
                      <button onClick={handleAvatarClick}>
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt={profile?.username || "User"}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10 transition hover:ring-orange-400"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white ring-2 ring-white/10 transition hover:ring-orange-400">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || 
                             profile?.username?.charAt(0)?.toUpperCase() || 
                             user?.email?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}
                      </button>
                    ) : !isOnDashboard ? (
                      <button onClick={handleAvatarClick}>
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt={profile?.username || "User"}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10 transition hover:ring-orange-400"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white ring-2 ring-white/10 transition hover:ring-orange-400">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || 
                             profile?.username?.charAt(0)?.toUpperCase() || 
                             user?.email?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}
                      </button>
                    ) : (
                      <UserMenu
                        fullName={profile?.full_name || null}
                        username={profile?.username || null}
                        avatarUrl={profile?.avatar_url || null}
                      />
                    )}
                  </div>
                )}

                {/* DESKTOP AUTH BUTTONS - Show when NOT logged in */}
                {!isLoggedIn && (
                  <div className="hidden items-center gap-2 lg:flex">
                    <Link
                      href="/login"
                      className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/78 transition hover:bg-white/10 hover:text-white"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/signup"
                      className="inline-flex rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.24)] transition hover:brightness-110"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-[92px] z-40 lg:hidden"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/92 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%)]" />

              <div className="relative max-h-[calc(100vh-120px)] overflow-y-auto p-4">
                {/* NAV LINKS */}
                <div className="space-y-2">
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
                </div>

                {/* MOBILE ACCOUNT - Show when user is logged in */}
                {isLoggedIn && (
                  <div className="mt-4">
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 transition hover:bg-white/10"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt="Avatar"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || 
                             profile?.username?.charAt(0)?.toUpperCase() || 
                             user?.email?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}

                        <div className="min-w-0 text-left">
                          <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
                            Account Area
                          </p>

                          <p className="truncate text-sm text-white">
                            @{profile?.username || user?.email?.split('@')[0] || "username"}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-white/60" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {mobileDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 space-y-1">
                            {!profile?.onboarding_completed && (
                              <Link
                                href="/account"
                                onClick={() => {
                                  setIsOpen(false)
                                  setMobileDropdownOpen(false)
                                }}
                                className="mb-3 block rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4"
                              >
                                <p className="text-sm font-semibold text-orange-300">
                                  Complete onboarding
                                </p>

                                <p className="mt-1 text-xs text-orange-200/70">
                                  Finish setting up your account before accessing dashboard
                                  features.
                                </p>
                              </Link>
                            )}

                            {profile?.onboarding_completed &&
                              accountLinks.map((link) => {
                                const Icon = link.icon
                                const active = pathname === link.href

                                return (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => {
                                      setIsOpen(false)
                                      setMobileDropdownOpen(false)
                                    }}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                      active
                                        ? "bg-orange-500/15 text-orange-300"
                                        : "text-white/75 hover:bg-white/8 hover:text-white"
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                  </Link>
                                )
                              })}

                            <div className="pt-2">
                              <LogoutButton />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* MOBILE AUTH - Show when NOT logged in */}
                {!isLoggedIn && (
                  <div className="mt-4 grid grid-cols-2 gap-3 pt-3">
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
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}