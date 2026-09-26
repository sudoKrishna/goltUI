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
  Blocks: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Utilities: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Chevron: (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

const leftItems = [
  { title: "UI Elements", desc: "Buttons, inputs, and modals.", icon: Icons.UIElements },
  { title: "Animations", desc: "Motion-based interactive parts.", icon: Icons.Animations },
  { title: "Layouts", desc: "Adaptive layouts for web apps.", icon: Icons.Layouts },
  { title: "Bento Grids", desc: "Modern, animated grid sections.", icon: Icons.Bento },
  { title: "Blocks", desc: "Full page sections, ready-made.", icon: Icons.Blocks },
  { title: "Utilities", desc: "Icons, loaders, and helpers.", icon: Icons.Utilities },
];

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.025 },
  },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

export default function Header04() {
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
                    className="absolute left-1/2 top-full z-50 mt-2 flex w-[560px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl"
                  >
                    <div className="w-40 shrink-0 border-r border-white/10 bg-white/[0.02] p-4">
                      <p className="text-sm font-medium text-white">Components</p>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                        Composable, primitive-light building blocks.
                      </p>
                      <Link
                        href="#"
                        className="mt-4 inline-block text-xs text-zinc-400 underline-offset-2 hover:text-white hover:underline"
                        onClick={() => setOpen(false)}
                      >
                        Explore all →
                      </Link>
                    </div>

                    <div className="grid flex-1 grid-cols-2 gap-0.5 p-2">
                      {leftItems.map((item) => (
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Link href="#" className="rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-white">
            Resources
          </Link>
          <Link href="#" className="rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-white">
            Pricing
          </Link>
          <Link href="#" className="rounded-md px-3 py-1.5 text-sm text-zinc-400 hover:text-white">
            Showcase
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="#" className="rounded-full px-3.5 py-1.5 text-sm text-zinc-400 hover:text-white">
            Docs
          </Link>
          <Link
            href="#"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}
