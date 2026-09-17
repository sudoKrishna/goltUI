"use client";

import { motion } from "framer-motion";

const checklist = [
  { label: "Installing dependencies", delay: 0 },
  { label: "Configuring Tailwind", delay: 0.9 },
  { label: "Ready to build", delay: 1.8 },
];

function SetupCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="flex min-h-[220px] flex-col justify-center gap-3">
        {checklist.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: item.delay, duration: 0.5 }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay + 0.2, type: "spring", stiffness: 300 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-black"
            >
              ✓
            </motion.span>
            <span className="text-sm text-zinc-200">{item.label}</span>
          </motion.div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Zero-config setup</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Drop a block into your project and it works — no extra config,
          no dependency hunting.
        </p>
      </div>
    </div>
  );
}

const nodes = ["Button", "Card", "Modal", "Toast", "Input"];

function SyncCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="relative flex min-h-[220px] flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="z-10 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300"
        >
          Live Preview
        </motion.div>

        <div className="mt-6 flex gap-3">
          {nodes.map((node, i) => (
            <motion.div
              key={node}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-[10px] text-zinc-400"
            >
              {node}
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Live component preview</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          See every block rendered exactly as it will look before you copy
          a single line of code.
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
        <SyncCard />
      </div>
    </section>
  );
}
