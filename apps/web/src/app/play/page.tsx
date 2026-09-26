import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import OrbCatcher from "@/components/game/OrbCatcher"

export const metadata: Metadata = {
  title: "Play — Orb Catcher | gotlUI",
  description:
    "A tiny playable game built entirely with Framer Motion motion values, springs, and AnimatePresence.",
}

export default function PlayPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
              Framer Motion demo
            </span>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Orb Catcher</h1>
            <p className="mx-auto mt-4 max-w-xl text-balance text-zinc-400">
              A playable little game built with springs, motion values, and
              <span className="text-zinc-200"> AnimatePresence</span> — no canvas, just DOM
              and Framer Motion.
            </p>
          </div>

          <OrbCatcher />
        </section>
      </main>
      <Footer />
    </div>
  )
}
