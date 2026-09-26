"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const groups = [
  {
    title: "Get Started",
    items: [{ slug: "", name: "Introduction", href: "/docs" }],
  },
  {
    title: "Components",
    items: [
      { slug: "input-mic", name: "Input Mic" },
      { slug: "button", name: "Button" },
      { slug: "text-reveal", name: "Text Reveal" },
      { slug: "text-scroll", name: "Text Scroll Animation" },
      { slug: "mouse-follow", name: "Mouse Follow" },
      { slug: "voice-glow", name: "Voice Glow" },
      { slug: "border-beam", name: "Border Beam" },
      { slug: "card", name: "Card", disabled: true },
    ],
  },
]

export default function ComponentsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 flex-shrink-0 overflow-y-auto border-r border-white/10 py-8 pr-4 md:block">
      <Link
        href="/components"
        className={`mb-4 block rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          pathname === "/components" ? "bg-white/10 text-white" : "text-zinc-300 hover:text-white"
        }`}
      >
        All Components
      </Link>

      {groups.map((group) => (
        <div key={group.title} className="mb-6">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {group.title}
          </div>
          <nav className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const href = "href" in item ? item.href : `/components/${item.slug}`
              const isActive = pathname === href

              if ("disabled" in item && item.disabled) {
                return (
                  <span
                    key={item.name}
                    className="rounded-md px-3 py-1.5 text-sm text-zinc-600"
                  >
                    {item.name}
                  </span>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={href}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </aside>
  )
}
