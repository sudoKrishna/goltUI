"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  DesignTokens: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  Integrations: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
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

const componentItems = [
  { title: "UI Elements", desc: "Core UI like buttons, modals.", icon: Icons.UIElements },
  { title: "Animations", desc: "Interactive motion-based UI parts.", icon: Icons.Animations },
  { title: "Layouts", desc: "Adaptive layouts for web apps.", icon: Icons.Layouts },
  { title: "Bento Grids", desc: "Modern, animated grid sections.", icon: Icons.Bento },
  { title: "Utilities", desc: "Icons, loaders, and small helpers.", icon: Icons.Utilities },
  { title: "Design Tokens", desc: "Colors and spacing system.", icon: Icons.DesignTokens },
  { title: "Integrations", desc: "Use with any tech stack.", icon: Icons.Integrations },
  { title: "Community", desc: "Connect with other devs.", icon: Icons.Community },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.025 },
  },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

export default function Header02() {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 120);
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
          <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
            <button
              type="button"
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors ${
                open ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Components
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                {Icons.Chevron}
              </motion.span>
            </button>

            <div onMouseEnter={cancel}>
              <AnimatePresence>
                {open && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-1/2 top-full z-50 mt-2 w-[640px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl"
                  >
                    <div className="grid grid-cols-3 gap-1 p-3">
                      {componentItems.map((item) => (
                        <motion.div key={item.title} variants={itemVariants}>
                          <Link
                            href="#"
                            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5"
                            onClick={() => setOpen(false)}
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
                    <div className="flex gap-4 border-t border-white/10 px-4 py-3">
                      <div className="flex flex-1 flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-3">
                        <div className="flex w-full flex-col gap-1.5">
                          <div className="h-2 w-full rounded bg-white/10" />
                          <div className="h-2 w-3/4 rounded bg-white/10" />
                          <div className="h-2 w-1/2 rounded bg-white/10" />
                        </div>
                        <p className="text-xs font-medium text-zinc-300">Blocks</p>
                        <p className="text-[10px] text-zinc-500">Full page sections, copy-paste ready.</p>
                      </div>
                      <div className="flex flex-1 flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-3">
                        <div className="grid w-full grid-cols-2 gap-1.5">
                          <div className="aspect-video rounded bg-white/10" />
                          <div className="aspect-video rounded bg-white/10" />
                        </div>
                        <p className="text-xs font-medium text-zinc-300">Showcase</p>
                        <p className="text-[10px] text-zinc-500">Real products built with gotlUI.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Link href="#" className="rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-white">
            Templates
          </Link>
          <Link href="#" className="rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-white">
            Docs
          </Link>
          <Link href="#" className="rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-white">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="#" className="rounded-full px-3.5 py-1.5 text-sm text-zinc-400 hover:text-white">
            Sign in
          </Link>
          <Link
            href="#"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
