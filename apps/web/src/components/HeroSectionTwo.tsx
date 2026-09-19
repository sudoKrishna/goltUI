"use client";

import { motion } from "framer-motion";

export default function HeroSectionTwo() {
  return (
    <div className="relative min-h-[800px] w-full overflow-hidden bg-black">
      <motion.div
        className="
          absolute
          left-1/2
          bottom-[-35%]
          h-[70vh]
          w-[120vw]
          -translate-x-1/2
          rounded-[50%]
          bg-blue-600
          blur-[120px]
        "
        animate={{
          y: [0, -80, 0],
          opacity: [0.55, 0.9, 0.55],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_bottom,transparent_0%,black_65%,black_100%)]
        "
      />
      <div className="relative z-10 flex min-h-[800px] flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-[13px] border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-zinc-300">
          Built for Production Systems
        </span>

        <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
          Flowcore runs
          <br />
          data pipelines
          <br />
          in production
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          A data platform built to run, orchestrate, and monitor pipelines
          reliably, so teams ship systems without operational chaos.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90">
            Get Started
          </button>
          <button className="rounded-lg border border-white/15 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30">
            View Flow
          </button>
        </div>
      </div>
    </div>
  );
}