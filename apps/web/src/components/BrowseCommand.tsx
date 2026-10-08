"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const COMMAND = "npx goltui add button";

const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const pop = { type: "spring" as const, stiffness: 220, damping: 20 };

export default function BrowseCommand() {
  const [copied, setCopied] = useState(false);
  const [started, setStarted] = useState(false);

  // Wait for the blue selection box on "components." to land, then reveal:
  // ring -> circle -> line -> command box.
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 1700);
    return () => clearTimeout(timer);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked: ignore */
    }
  };

  return (
    <div className="mt-12 flex w-full flex-wrap items-center gap-3 [font-family:'Instrument_Sans',system-ui,sans-serif] sm:w-fit sm:flex-nowrap sm:gap-0">
      {/* button is always visible; only the dashed ring reveals around it */}
      <div className="relative shrink-0 p-2.5">
        <motion.span
          aria-hidden
          initial={false}
          animate={
            started
              ? { clipPath: "circle(150% at 50% 50%)" }
              : { clipPath: "circle(0% at 50% 50%)" }
          }
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-white/40"
        />
        <Link
          href="/components"
          className="group relative flex h-12 items-center justify-center rounded-full bg-zinc-800 px-6 text-sm font-semibold tracking-tight text-white outline-none transition-colors duration-200 hover:bg-zinc-700 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Browse components
          <span
            aria-hidden
            className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
          >
            ›
          </span>
        </Link>
      </div>

      {/* connector: circle, then line */}
      <div aria-hidden className="mx-3 hidden items-center sm:flex">
        <motion.span
          initial={false}
          animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ ...pop, delay: started ? 0.9 : 0 }}
          className="h-2 w-2 shrink-0 rounded-full border border-white/60"
        />
        <motion.span
          initial={false}
          animate={started ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: started ? 1.35 : 0,
          }}
          className="h-0 w-10 origin-left border-t border-dashed border-white/40"
        />
      </div>

      {/* command box */}
      <motion.div
        initial={false}
        animate={started ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
          delay: started ? 1.8 : 0,
        }}
        className="flex w-full shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#0e0e0e] px-5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.03)] sm:w-auto sm:gap-4"
      >
        <span className="font-mono text-xs text-zinc-600 select-none">$</span>
        <code className="font-mono text-xs whitespace-nowrap text-zinc-400 sm:text-sm">
          {COMMAND}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy command"}
          className="cursor-pointer text-zinc-500 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </motion.div>
    </div>
  );
}
