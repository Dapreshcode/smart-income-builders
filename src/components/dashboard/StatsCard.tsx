"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  bgColor: string
  link: string
  description: string
  delay: number
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  link,
  description,
  delay,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        href={link}
        className="group block rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-400/15 hover:bg-white/[0.07]"
      >
        <div className="flex items-center justify-between">
          <div className={`rounded-2xl ${bgColor} p-3`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>

          <span className="text-3xl font-bold tracking-tight text-white">
            {value}
          </span>
        </div>

        <p className="mt-4 font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-6 text-gray-400">
          {description}
        </p>
      </Link>
    </motion.div>
  )
}