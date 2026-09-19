import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import InputMic from "@/components/InputMic"
import Button from "@/components/Buttons"
import TextReveal from "@/components/TextReveal"

const components = [
  {
    slug: "input-mic",
    name: "Input Mic",
    description: "Chat input with a mic button, live waveform, and optional speech-to-text.",
    available: true,
    preview: (
      <div className="pointer-events-none scale-90">
        <InputMic />
      </div>
    ),
  },
  {
    slug: "button",
    name: "Button",
    description: "Styled button variants: sizes, light, destructive, and loading states.",
    available: true,
    preview: (
      <div className="pointer-events-none scale-[0.6]">
        <Button />
      </div>
    ),
  },
  {
    slug: "text-reveal",
    name: "Text Reveal",
    description: "A stylish effect that sequentially fades in text, creating a dynamic reveal.",
    available: true,
    preview: (
      <div className="pointer-events-none scale-90 px-4 text-center text-sm text-white">
        <TextReveal text="Fades in word by word." />
      </div>
    ),
  },
  {
    slug: "text-scroll",
    name: "Text Scroll Animation",
    description: "Scroll-driven text and icon animation with 3 variants, powered by Lenis.",
    available: true,
    preview: (
      <div className="flex flex-col items-center justify-center gap-1 text-xs text-zinc-500">
        <span className="text-2xl font-bold uppercase tracking-tighter text-white">Scroll</span>
        <span>opens as a full-page preview</span>
      </div>
    ),
  },
  {
    slug: "card",
    name: "Card",
    description: "Content card with hover motion.",
    available: false,
    preview: null,
  },
]

export default function ComponentsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Components</h1>
            <p className="mt-3 text-zinc-400">
              Copy-paste React components, built with Tailwind and Framer Motion.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) =>
              c.available ? (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="mb-6 flex h-32 items-center justify-center overflow-hidden rounded-lg bg-zinc-950">
                    {c.preview}
                  </div>
                  <h3 className="font-medium text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{c.description}</p>
                </Link>
              ) : (
                <div
                  key={c.slug}
                  className="flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 opacity-50"
                >
                  <div className="mb-6 flex h-32 items-center justify-center rounded-lg bg-zinc-950 text-xs text-zinc-600">
                    Coming soon
                  </div>
                  <h3 className="font-medium text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{c.description}</p>
                </div>
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
