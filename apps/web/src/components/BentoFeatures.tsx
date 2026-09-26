"use client";

import { motion } from "framer-motion";

const rows = [
  { label: "Creating Your Account", duration: 2.4, delay: 0 },
  { label: "Setting Up Your Profile", duration: 2.8, delay: 0.3 },
];

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      className="h-3 w-3 flex-shrink-0 rounded-full border-2 border-zinc-600 border-t-white"
    />
  );
}

function SetupCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="flex min-h-[220px] flex-col justify-center gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
          >
            <div className="flex items-center gap-2.5">
              <Spinner />
              <span className="text-sm text-zinc-200">{row.label}</span>
            </div>
            <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "100%"] }}
                transition={{
                  repeat: Infinity,
                  duration: row.duration,
                  delay: row.delay,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Swift onboarding</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Quickly set up your account, personalize your space, and begin
          exploring all features with ease.
        </p>
      </div>
    </div>
  );
}

const files = 5;

function ExportReactorCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="relative flex min-h-[220px] flex-col items-center justify-between py-2">
        <div className="relative h-10 w-px bg-gradient-to-b from-transparent to-white/20">
          <motion.span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(52,211,153,0)",
              "0 0 18px rgba(52,211,153,0.35)",
              "0 0 0px rgba(52,211,153,0)",
            ],
          }}
          transition={{
            boxShadow: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
          }}
          className="z-10 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300"
        >
          Export as CSV
        </motion.div>

        <svg
          viewBox="0 0 240 50"
          className="mt-2 h-10 w-full max-w-[240px] text-white/15"
          aria-hidden
        >
          <line x1="120" y1="0" x2="120" y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1="24" y1="14" x2="216" y2="14" stroke="currentColor" strokeWidth="1" />
          {[24, 72, 120, 168, 216].map((x) => (
            <line key={x} x1={x} y1="14" x2={x} y2="44" stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>

        <div className="flex w-full max-w-[240px] justify-between">
          {Array.from({ length: files }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
              className="flex h-9 w-7 items-center justify-center rounded-[3px] border border-white/15 bg-white/[0.05]"
            >
              <svg viewBox="0 0 16 20" width="10" height="12" aria-hidden>
                <path
                  d="M2 1h8l4 4v14H2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-zinc-500"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Export Reactor</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Multiple files send animated streams into a central node that
          refines and emits structured, downloadable output.
        </p>
      </div>
    </div>
  );
}

export default function BentoFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SetupCard />
        <ExportReactorCard />
      </div>
    </section>
  );
}
