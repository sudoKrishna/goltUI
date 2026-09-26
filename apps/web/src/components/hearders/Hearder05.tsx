"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
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
  Landing: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
  Chevron: (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

const menus = {
  Components: [
    { title: "UI Elements", desc: "Core UI like buttons, modals.", icon: Icons.UIElements },
    { title: "Animations", desc: "Interactive motion-based UI parts.", icon: Icons.Animations },
    { title: "Layouts", desc: "Adaptive layouts for web apps.", icon: Icons.Layouts },
    { title: "Bento Grids", desc: "Modern, animated grid sections.", icon: Icons.Bento },
  ],
  Templates: [
    { title: "Landing Pages", desc: "Prebuilt pages for launches.", icon: Icons.Landing },
    { title: "Dashboards", desc: "Analytics and admin layouts.", icon: Icons.Dashboard },
    { title: "Auth Screens", desc: "Login and signup flows.", icon: Icons.Auth },
    { title: "Portfolio", desc: "Minimal sites for creators.", icon: Icons.Portfolio },
  ],
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

export default function Header05() {
  const [open, setOpen] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastY.current;
    if (latest > 80 && latest > prev) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
    lastY.current = latest;
  });

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
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -64 : 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl"
          : "border-b border-transparent bg-zinc-950/40 backdrop-blur-md"
      }`}
    >
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
                          className="absolute left-1/2 top-full z-50 mt-2 flex w-[480px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl"
                        >
                          <div className="flex flex-1 flex-col p-2">
                            {menus[label as keyof typeof menus].map((item) => (
                              <motion.div key={item.title} variants={itemVariants}>
                                <Link
                                  href="#"
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
                          <div className="w-36 shrink-0 border-l border-white/10 bg-white/[0.02] p-3">
                            <div className="mb-2 flex h-16 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                              <div className="flex w-3/4 flex-col gap-1">
                                <div className="h-1.5 rounded bg-white/15" />
                                <div className="h-1.5 w-3/4 rounded bg-white/15" />
                                <div className="h-1.5 w-1/2 rounded bg-white/15" />
                              </div>
                            </div>
                            <p className="text-xs font-medium text-zinc-300">
                              {label === "Components" ? "Blocks" : "Starter kits"}
                            </p>
                            <p className="mt-0.5 text-[10px] text-zinc-500">
                              {label === "Components"
                                ? "Full page sections, ready to paste."
                                : "Prebuilt pages to launch fast."}
                            </p>
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
    </motion.header>
  );
}
