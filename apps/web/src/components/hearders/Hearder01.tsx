"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";

const Icons = {
  UIElements: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Animations: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Layouts: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  Bento: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  Utilities: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Landing: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Pricing: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Marketing: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Dashboard: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Auth: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Portfolio: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Docs: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Community: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Chevron: (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

const menus = {
  Components: {
    left: [
      { title: "UI Elements", desc: "Core UI like buttons, modals.", icon: Icons.UIElements, href: "#" },
      { title: "Animations", desc: "Interactive motion-based UI parts.", icon: Icons.Animations, href: "#" },
      { title: "Layouts", desc: "Adaptive layouts for web apps.", icon: Icons.Layouts, href: "#" },
    ],
    right: [
      { title: "Bento Grids", desc: "Modern, animated grid sections.", icon: Icons.Bento, href: "#" },
      { title: "Utilities", desc: "Icons, loaders, and small helpers.", icon: Icons.Utilities, href: "#" },
    ],
  },
  Templates: {
    left: [
      { title: "Landing Pages", desc: "Prebuilt pages for launches.", icon: Icons.Landing, href: "#" },
      { title: "Pricing Pages", desc: "Conversion-focused pricing layouts.", icon: Icons.Pricing, href: "#" },
      { title: "Marketing Sections", desc: "Hero, features, and testimonials.", icon: Icons.Marketing, href: "#" },
      { title: "Dashboards", desc: "Analytics and admin layouts.", icon: Icons.Dashboard, href: "#" },
    ],
    right: [
      { title: "Auth Screens", desc: "Login and signup flows.", icon: Icons.Auth, href: "#" },
      { title: "Portfolio", desc: "Minimal sites for creators.", icon: Icons.Portfolio, href: "#" },
      { title: "Coming Soon", desc: "Simple launch placeholders.", icon: Icons.Animations, href: "#" },
    ],
  },
  Resources: {
    left: [
      { title: "Docs", desc: "Guides and setup steps.", icon: Icons.Docs, href: "#" },
      { title: "Integrations", desc: "Use with any tech stack.", icon: Icons.Layouts, href: "#" },
      { title: "Design Tokens", desc: "Colors and spacing system.", icon: Icons.Utilities, href: "#" },
    ],
    right: [
      { title: "Community", desc: "Connect with other devs.", icon: Icons.Community, href: "#" },
      { title: "Support", desc: "Help and issue reports.", icon: Icons.Docs, href: "#" },
    ],
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.03 },
  },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

export default function Header01() {
  const [open, setOpen] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = (key: string) => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(key);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(null), 120);
  };
  const cancel = () => {
    if (timeout.current) clearTimeout(timeout.current);
  };

  return (
    <header className="w-full border-b border-white/10 bg-zinc-950">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            ●
          </span>
          <span className="text-sm font-semibold text-white">gotlUI</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {(["Components", "Templates", "Showcase", "Resources"] as const).map((label) => {
            const hasMenu = label in menus;
            const isOpen = open === label;
            return (
              <div
                key={label}
                className="relative"
                onMouseEnter={() => hasMenu && enter(label)}
                onMouseLeave={leave}
              >
                {hasMenu ? (
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isOpen ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {label}
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      {Icons.Chevron}
                    </motion.span>
                  </button>
                ) : (
                  <Link href="#" className="rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-white">
                    {label}
                  </Link>
                )}

                {hasMenu && (
                  <div onMouseEnter={cancel}>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-1/2 top-full z-50 mt-2 w-[520px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl"
                        >
                          <div className="flex gap-1 p-2">
                            <div className="flex flex-1 flex-col">
                              {menus[label as keyof typeof menus].left.map((item) => (
                                <motion.div key={item.title} variants={itemVariants}>
                                  <Link
                                    href={item.href}
                                    className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5"
                                    onClick={() => setOpen(null)}
                                  >
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-400 group-hover:text-white">
                                      {item.icon}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-zinc-200 group-hover:text-white">{item.title}</p>
                                      <p className="text-xs text-zinc-500">{item.desc}</p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                            <div className="flex flex-1 flex-col">
                              {menus[label as keyof typeof menus].right.map((item) => (
                                <motion.div key={item.title} variants={itemVariants}>
                                  <Link
                                    href={item.href}
                                    className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5"
                                    onClick={() => setOpen(null)}
                                  >
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-400 group-hover:text-white">
                                      {item.icon}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-zinc-200 group-hover:text-white">{item.title}</p>
                                      <p className="text-xs text-zinc-500">{item.desc}</p>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Link
          href="#"
          className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}