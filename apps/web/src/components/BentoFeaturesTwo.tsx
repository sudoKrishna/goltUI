"use client";

import { motion } from "framer-motion";

const options = [
  { title: "Start from Scratch", desc: "Design and build everything your way." },
  { title: "Use a Template", desc: "Get a ready-made starter to save time.", active: true },
  { title: "Remix an Existing UI", desc: "Take inspiration and make it your own." },
  { title: "Explore Component Library", desc: "Drop in ready-made components with ease." },
];

function SelectorCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-1 flex items-center justify-between px-2 py-1.5">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M3 5h14M3 10h14M3 15h9" strokeLinecap="round" />
          </svg>
          Use a Template
        </div>
        <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-zinc-500" aria-hidden>
          <path d="M7 8l3-3 3 3M7 12l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {options.map((opt, i) => (
        <motion.div
          key={opt.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          whileHover={{ x: 2 }}
          className={`flex items-start gap-3 rounded-xl px-4 py-3 ${
            opt.active ? "bg-white/[0.06]" : ""
          }`}
        >
          <span
            className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-sm ${
              opt.active ? "bg-amber-400" : "bg-white/20"
            }`}
          />
          <div>
            <div className="text-sm font-medium text-white">{opt.title}</div>
            <div className="text-xs text-zinc-500">{opt.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function BentoFeaturesTwo() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <SelectorCard />
    </section>
  );
}
