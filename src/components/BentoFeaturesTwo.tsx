"use client";

import { motion } from "framer-motion";

const options = [
  { title: "Start from Scratch", desc: "Design and build everything your way.", active: true },
  { title: "Use a Template", desc: "Get a ready-made starter to save time." },
  { title: "Remix an Existing UI", desc: "Take inspiration and make it your own." },
  { title: "Explore Component Library", desc: "Drop in ready-made components with ease." },
];

function SelectorCard() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      {options.map((opt, i) => (
        <motion.div
          key={opt.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
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

const notifications = [
  { title: "Deploy Complete", sub: "Build finished in 12s", time: "2m ago" },
  { title: "New Star", sub: "@devjane starred your repo", time: "1h ago" },
];

function NotifyCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="relative flex min-h-[160px] flex-col items-center justify-center gap-3">
        {notifications.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.25, duration: 0.4 }}
            className="flex w-full max-w-xs items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
          >
            <div>
              <div className="text-sm font-medium text-white">{n.title}</div>
              <div className="text-xs text-zinc-500">{n.sub}</div>
            </div>
            <span className="text-xs text-zinc-600">{n.time}</span>
          </motion.div>
        ))}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-zinc-300"
        >
          Mark all as read
        </motion.button>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Real-time notifications</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          A notification block that surfaces the right updates the moment
          they happen.
        </p>
      </div>
    </div>
  );
}

export default function BentoFeaturesTwo() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SelectorCard />
        <NotifyCard />
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="#components"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Explore All Components
          <span aria-hidden>›</span>
        </a>
      </div>
    </section>
  );
}
