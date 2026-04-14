"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type ImageBoxVariant = "default" | "captioned" | "overlay" | "hero"
type ImageBoxSize = "sm" | "md" | "lg" | "xl"

type ImageBoxProps = {
  src: string
  alt: string
  variant?: ImageBoxVariant
  size?: ImageBoxSize
  caption?: string
  eyebrow?: string
  title?: string
  description?: string
  priority?: boolean
  rounded?: "xl" | "2xl" | "3xl"
  className?: string
  imageClassName?: string
  sizes?: string
}

function getHeight(size: ImageBoxSize, variant: ImageBoxVariant) {
  if (variant === "hero") {
    if (size === "sm") return "h-[280px] md:h-[340px]"
    if (size === "md") return "h-[320px] md:h-[400px]"
    if (size === "lg") return "h-[360px] md:h-[460px]"
    return "h-[420px] md:h-[520px]"
  }

  if (size === "sm") return "h-[220px]"
  if (size === "md") return "h-[280px]"
  if (size === "lg") return "h-[340px]"
  return "h-[400px]"
}

function getRounded(rounded: "xl" | "2xl" | "3xl") {
  if (rounded === "xl") return "rounded-2xl"
  if (rounded === "2xl") return "rounded-[28px]"
  return "rounded-[34px]"
}

export default function ImageBox({
  src,
  alt,
  variant = "default",
  size = "lg",
  caption,
  eyebrow,
  title,
  description,
  priority = false,
  rounded = "2xl",
  className = "",
  imageClassName = "",
  sizes = "100vw",
}: ImageBoxProps) {
  const heightClass = getHeight(size, variant)
  const roundedClass = getRounded(rounded)

  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className={`relative ${className}`}
    >
      <div
        className={`group relative overflow-hidden border border-white/10 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl ${roundedClass} ${heightClass}`}
      >
        {/* subtle premium reflection */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%)]" />

        {/* glow accent */}
        <div className="pointer-events-none absolute -bottom-10 -right-10 z-[2] h-28 w-28 rounded-full bg-orange-500/15 blur-3xl" />

        {/* inner soft border */}
        <div className={`pointer-events-none absolute inset-[1px] z-[2] border border-white/5 ${roundedClass}`} />

        {/* image */}
       <Image
  src={src}
  alt={alt}
  fill
  priority={priority}
  sizes={sizes}
  className={`object-cover object-center scale-[1.02] transition duration-700 group-hover:scale-[1.07] ${imageClassName}`}
/>

        {/* overlay logic */}
        {(variant === "overlay" || variant === "hero") && (
          <>
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/92 via-black/42 to-black/8" />
            <div className="absolute bottom-0 left-0 right-0 z-[1] h-[58%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
            <div className="absolute inset-0 z-[1] shadow-[inset_0_-90px_120px_rgba(0,0,0,0.55)]" />

            {(eyebrow || title || description) && (
              <div className="absolute inset-x-0 bottom-0 z-[3] p-5 md:p-6">
                {eyebrow && (
                  <span className="inline-flex rounded-full border border-orange-400/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-orange-300 backdrop-blur-md">
                    {eyebrow}
                  </span>
                )}

                {title && (
                  <h3
                    className={`mt-4 font-semibold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] ${
                      variant === "hero"
                        ? "text-2xl md:text-3xl"
                        : "text-lg md:text-xl"
                    }`}
                  >
                    {title}
                  </h3>
                )}

                {description && (
                  <p className="mt-3 max-w-[92%] text-sm leading-6 text-white/75 md:text-base">
                    {description}
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* default / captioned overlay */}
        {(variant === "default" || variant === "captioned") && (
          <>
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            <div className="absolute inset-0 z-[1] shadow-[inset_0_-50px_90px_rgba(0,0,0,0.18)]" />
          </>
        )}
      </div>

      {/* caption block */}
      {variant === "captioned" && caption && (
        <figcaption className="mt-4 px-1 text-sm leading-6 text-white/55">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}