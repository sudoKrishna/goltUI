"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent px-8 py-16"
      >
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Ship faster with gotlUI Pro
        </h2>
        <p className="mx-auto mt-3 max-w-md text-zinc-400">
          A complete UI kit for developers who value speed, polish, and
          control, without wasting weeks on UI.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <motion.a
            href="#get-started"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Get All-Access
          </motion.a>
          <motion.a
            href="/blocks"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30"
          >
            Explore Blocks
          </motion.a>
        </div>

        <div className="mx-auto mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {[
            ["10+", "Full-page templates"],
            ["250+", "Reusable UI components"],
            ["1-click", "Copy, paste, ship"],
          ].map(([stat, label]) => (
            <div key={label}>
              <div className="text-xl font-semibold text-white">{stat}</div>
              <div className="mt-1 text-xs text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
