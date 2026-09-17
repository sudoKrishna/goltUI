"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "What exactly do I get?",
    a: "Lifetime access to every block, component, and template in the library, plus all future additions.",
  },
  {
    q: "Can I use it in commercial projects?",
    a: "Yes. The license covers unlimited personal and commercial projects, including client work.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. It's a one-time payment — no recurring fees, ever.",
  },
  {
    q: "Is it built with TypeScript?",
    a: "Yes, every component ships with full TypeScript types out of the box.",
  },
  {
    q: "Can I customize the components?",
    a: "Since everything is copy-pasted directly into your codebase, you have full control to edit anything.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-base font-medium text-white">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-500"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm leading-relaxed text-zinc-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-zinc-400">
          Everything you need to know about gotlUI.
        </p>
      </div>

      <div>
        {faqs.map((f) => (
          <FAQItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}
