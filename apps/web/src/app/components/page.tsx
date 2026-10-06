import Link from "next/link"
import InputMic from "@/components/InputMic"
import Button from "@/components/Buttons"
import TextReveal from "@/components/TextReveal"
import { BorderBeam } from "@/components/border-beam"
import { ThinkingOrb } from "@/components/thinking-orbs"
import { LiquidGlassCard } from "@/components/liquid-glass"

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
    slug: "mouse-follow",
    name: "Mouse Follow",
    description: "Four cursor-following effects: direct, spring, velocity-stretch blob, and magnetic pull.",
    available: true,
    preview: (
      <div className="flex flex-col items-center justify-center gap-1 text-xs text-zinc-500">
        <span className="h-8 w-8 rounded-full bg-white" />
        <span className="mt-2">hover to try it on its page</span>
      </div>
    ),
  },
  {
    slug: "voice-glow",
    name: "Voice Glow",
    description: "Sound-reactive glow — a colorful beam that rises and blooms with real mic input.",
    available: true,
    preview: (
      <div className="flex flex-col items-center justify-center gap-1 text-xs text-zinc-500">
        <span className="h-2 w-24 rounded-full bg-gradient-to-r from-pink-500 via-emerald-400 to-sky-400 blur-[2px]" />
        <span className="mt-2">click the mic on its page</span>
      </div>
    ),
  },
  {
    slug: "border-beam",
    name: "Border Beam",
    description: "Animated border effect — a traveling or breathing colorful beam around an element's edge.",
    available: true,
    preview: (
      <BorderBeam size="sm" colorVariant="colorful" theme="dark">
        <div className="flex h-10 w-24 items-center justify-center rounded-lg bg-zinc-900 text-xs text-zinc-400">
          border
        </div>
      </BorderBeam>
    ),
  },
  {
    slug: "thinking-orbs",
    name: "Thinking Orbs",
    description: "Nine hand-tuned dotted thought-orb loading states for AI & agent UIs, on a plain 2D canvas.",
    available: true,
    preview: (
      <div className="flex items-center gap-6">
        <ThinkingOrb state="searching" size={64} theme="dark" />
        <ThinkingOrb state="weaving" size={64} theme="dark" />
      </div>
    ),
  },
  {
    slug: "disintegrate-on-scroll",
    name: "Disintegrate On Scroll",
    description: "Reusable wrapper that dissolves its children into wind-blown particles on scroll, via html2canvas and GSAP.",
    available: true,
    preview: (
      <div className="flex flex-col items-center justify-center gap-1 text-xs text-zinc-500">
        <span className="text-2xl font-bold uppercase tracking-tighter text-[#ff4b26]">Dissolve</span>
        <span>opens as a full-page preview</span>
      </div>
    ),
  },
  {
    slug: "liquid-glass",
    name: "Liquid Glass",
    description: "Frosted glass surface with an optical displacement filter, real inset highlights, and glass buttons.",
    available: true,
    preview: (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <span className="absolute -top-8 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/50 blur-2xl" />
        <span className="absolute -right-8 -bottom-10 h-28 w-28 rounded-full bg-sky-500/50 blur-2xl" />
        <LiquidGlassCard
          glassSize="sm"
          className="relative rounded-2xl px-4 py-2 text-xs text-white"
        >
          Liquid Glass
        </LiquidGlassCard>
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
    <section className="max-w-6xl py-20">
      <div className="mb-12">
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
              className="group block rounded-t-[14px] rounded-b-[6px] border border-[#262626] bg-[#1a1a1a] p-4 pb-0 shadow-[0_18px_40px_-14px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.04)] transition-transform duration-200 hover:-translate-y-1 [font-family:'Instrument_Sans',system-ui,sans-serif]"
            >
              <div className="relative flex h-[335px] items-center justify-center overflow-hidden rounded-[22px] border border-[#2b2b2b] bg-[#161616]">
                {c.preview}
              </div>
              <div className="flex h-16 items-center justify-between px-[10px]">
                <span className="text-[19px] font-medium tracking-tight text-[#f2f2f2]">
                  {c.name}
                </span>
                <span className="text-base text-[#8a8a8a]">{c.slug}</span>
              </div>
            </Link>
          ) : (
            <div
              key={c.slug}
              className="flex flex-col rounded-t-[14px] rounded-b-[6px] border border-[#262626] bg-[#1a1a1a] p-4 pb-0 opacity-50 shadow-[0_18px_40px_-14px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.04)] [font-family:'Instrument_Sans',system-ui,sans-serif]"
            >
              <div className="flex h-[335px] items-center justify-center rounded-[22px] border border-[#2b2b2b] bg-[#161616] text-xs text-zinc-600">
                Coming soon
              </div>
              <div className="flex h-16 items-center justify-between px-[10px]">
                <span className="text-[19px] font-medium tracking-tight text-[#f2f2f2]">
                  {c.name}
                </span>
                <span className="text-base text-[#8a8a8a]">{c.slug}</span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}
