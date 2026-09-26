"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqSections = [
  {
    category: "General",
    faqs: [
      {
        q: "What exactly do I get with gotlUI Pro?",
        a: "Lifetime access to every block, animated component, and full-page template in the library, plus everything added afterward.",
      },
      {
        q: "Who should use gotlUI Pro?",
        a: "Developers and small teams who want production-ready UI without spending weeks designing and animating it from scratch.",
      },
      {
        q: "How is gotlUI Pro different from free UI libraries?",
        a: "The free registry covers core components; Pro adds full templates, richer motion, and priority updates on top of it.",
      },
      {
        q: "How much development time can this save?",
        a: "Most teams cut initial UI build time down from weeks to a few days by copying finished, animated blocks instead of building from zero.",
      },
      {
        q: "Do I get future updates?",
        a: "Yes — every new block, component, and template we ship is included automatically at no extra cost.",
      },
      {
        q: "Will new components be added over time?",
        a: "Regularly. The registry keeps growing, and Pro members get new additions as soon as they're published.",
      },
    ],
  },
  {
    category: "Licensing",
    faqs: [
      {
        q: "Can I use gotlUI Pro in commercial projects?",
        a: "Yes. Your one-time payment covers unlimited personal and commercial projects.",
      },
      {
        q: "Can agencies and freelancers use it for client work?",
        a: "Yes, you can use every block and template across as many client projects as you like.",
      },
      {
        q: "Can I resell or redistribute the components?",
        a: "No — the license covers building products with the components, not repackaging or reselling the source files themselves.",
      },
      {
        q: "Is there a refund policy?",
        a: "Yes, reach out within 14 days of purchase if it isn't the right fit and we'll refund you, no questions asked.",
      },
    ],
  },
  {
    category: "Technical",
    faqs: [
      {
        q: "Is gotlUI Pro TypeScript friendly?",
        a: "Every component ships with full TypeScript types out of the box.",
      },
      {
        q: "Will animations hurt performance?",
        a: "No — animations are CSS/canvas driven and built with performance budgets in mind, so they stay smooth even on lower-end devices.",
      },
      {
        q: "Does it work with Next.js and Vite?",
        a: "Yes, every component is plain React and Tailwind, so it drops into a Next.js or Vite project without changes.",
      },
      {
        q: "Do components work with shadcn/ui?",
        a: "Yes — components follow the same registry conventions as shadcn/ui, so they install and compose the same way.",
      },
    ],
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
    <section id="faq" className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_1fr]">
        <div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-zinc-400">
            Common questions about gotlUI Pro, from licensing and updates to
            how it fits your workflow.
          </p>
        </div>

        <div>
          {faqSections.map((section) => (
            <div key={section.category} className="mb-2">
              <div className="mb-1 mt-4 text-xs font-medium uppercase tracking-wide text-zinc-500 first:mt-0">
                {section.category}
              </div>
              {section.faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
