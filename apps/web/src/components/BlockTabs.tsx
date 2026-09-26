"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { blockCategories } from "@/lib/block-categories"

export default function BlockTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-6 py-3 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {blockCategories.map((c) => {
          const href = `/blocks/${c.slug}`
          const isActive = pathname === href
          const isAvailable = c.available === true

          return (
            <Link
              key={c.slug}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : isAvailable
                    ? "text-zinc-400 hover:bg-white/5 hover:text-white"
                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              }`}
            >
              {c.name}
              {!isAvailable && (
                <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                  Soon
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
