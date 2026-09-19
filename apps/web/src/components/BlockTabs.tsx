"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const categories = [
  { slug: "header", name: "Header" },
  { slug: "hero-section", name: "Hero Section" },
  { slug: "logo-cloud", name: "Logo Cloud" },
  { slug: "feature", name: "Feature" },
  { slug: "pricing", name: "Pricing" },
  { slug: "faq", name: "FAQ" },
  { slug: "testimonial", name: "Testimonial" },
  { slug: "call-to-action", name: "Call to Action" },
  { slug: "footer", name: "Footer" },
  { slug: "stats", name: "Stats" },
  { slug: "contact", name: "Contact" },
  { slug: "auth", name: "Auth" },
]

const availableSlugs = new Set(["hero-section", "logo-cloud"])

export default function BlockTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-6 text-sm">
        {categories.map((c) => {
          const isActive = pathname === `/blocks/${c.slug}`
          const isAvailable = availableSlugs.has(c.slug)

          if (!isAvailable) {
            return (
              <span
                key={c.slug}
                className="flex-shrink-0 whitespace-nowrap border-b-2 border-transparent py-4 text-zinc-600"
              >
                {c.name}
              </span>
            )
          }

          return (
            <Link
              key={c.slug}
              href={`/blocks/${c.slug}`}
              className={`flex-shrink-0 whitespace-nowrap border-b-2 py-4 transition-colors ${
                isActive
                  ? "border-white text-white"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              {c.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
