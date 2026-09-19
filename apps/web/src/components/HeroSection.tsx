"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

const GRID_COLUMNS = "repeat(auto-fill, minmax(90px, 1fr))";
const GRID_ROWS = "repeat(auto-fill, minmax(90px, 1fr))";
const CELL_COUNT = 260;

function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  const spotlightMask = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  const cells = Array.from({ length: CELL_COUNT });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute -inset-x-10 inset-y-0"
    >
      {/* faint base grid, always visible */}
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: GRID_COLUMNS, gridTemplateRows: GRID_ROWS }}
      >
        {cells.map((_, i) => (
          <div key={i} className="border border-white/5" />
        ))}
      </div>

      {/* brighter grid, only revealed near the cursor via a mask */}
      <motion.div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: GRID_COLUMNS,
          gridTemplateRows: GRID_ROWS,
          WebkitMaskImage: spotlightMask,
          maskImage: spotlightMask,
        }}
      >
        {cells.map((_, i) => (
          <div key={i} className="border border-white/25 bg-white/[0.04]" />
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden bg-black px-6">
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="bg-gradient-to-br from-white to-zinc-600 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-6xl">
          Build UI that&apos;s ready for production.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
          A unified library to design, animate, and ship interfaces without
          stitching together fragmented components.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90">
            Get Started
          </button>
          <button className="rounded-lg border border-white/15 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30">
            View Docs
          </button>
        </div>
      </div>
    </section>
  );
}
