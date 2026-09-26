"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const Icons = {
  Menu: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

const links = [
  { label: "Components", href: "#components" },
  { label: "Templates", href: "#templates" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
  { label: "Showcase", href: "#showcase" },
];

export default function Header06() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
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
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="#"
              className="hidden rounded-full px-3.5 py-1.5 text-sm text-zinc-400 hover:text-white sm:block"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Get started
            </Link>

            <button
              type="button"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 hover:bg-white/5 hover:text-white md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              {Icons.Menu}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-zinc-950 md:hidden"
          >
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                  ●
                </span>
                <span className="text-sm font-semibold text-white">gotlUI</span>
              </Link>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-400 hover:bg-white/5 hover:text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                {Icons.Close}
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
              className="flex flex-col gap-1 p-4"
            >
              {links.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
                  }}
                >
                  <Link
                    href={link.href}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-zinc-200 hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.15 } },
                }}
                className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6"
              >
                <Link
                  href="#"
                  className="rounded-full border border-white/20 px-4 py-2.5 text-center text-sm text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-white px-4 py-2.5 text-center text-sm font-medium text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Get started
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
