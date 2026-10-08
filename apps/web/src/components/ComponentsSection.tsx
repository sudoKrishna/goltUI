"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InputMic from "@/components/InputMic";
import Button from "@/components/Buttons";
import TextReveal from "@/components/TextReveal";
import { BorderBeam } from "@/components/border-beam";
import { ThinkingOrb } from "@/components/thinking-orbs";
import LiquidGlassDemo from "@/components/liquid-glass/LiquidGlassDemo";
import TwitterCard from "@/components/TwitterCard";
import FolderCard from "@/components/FolderCard";
import CodeBlock from "@/components/CodeBlock";

type Featured = {
  slug: string;
  name: string;
  description: string;
  preview: ReactNode;
  component: ReactNode;
  code: string;
};

const featured: Featured[] = [
  {
    slug: "input-mic",
    name: "Input Mic",
    description: "Chat input with a mic button, live waveform, and speech-to-text.",
    preview: (
      <div className="scale-90">
        <InputMic />
      </div>
    ),
    component: <InputMic />,
    code: `import InputMic from "@/components/goltui/input-mic"

export default function Page() {
  return <InputMic />
}`,
  },
  {
    slug: "button",
    name: "Button",
    description: "Styled button variants: sizes, light, destructive, and loading states.",
    preview: (
      <div className="scale-[0.6]">
        <Button />
      </div>
    ),
    component: <Button />,
    code: `import Button from "@/components/goltui/button"

export default function Page() {
  return <Button>Click me</Button>
}`,
  },
  {
    slug: "text-reveal",
    name: "Text Reveal",
    description: "Sequentially fades in text, creating a dynamic reveal.",
    preview: (
      <div className="scale-90 px-4 text-center text-sm text-white">
        <TextReveal text="Fades in word by word." />
      </div>
    ),
    component: (
      <div className="text-center text-lg text-white">
        <TextReveal text="Fades in word by word." />
      </div>
    ),
    code: `import TextReveal from "@/components/goltui/text-reveal"

export default function Page() {
  return <TextReveal text="Fades in word by word." />
}`,
  },
  {
    slug: "border-beam",
    name: "Border Beam",
    description: "Animated border effect — a traveling beam around an element's edge.",
    preview: (
      <BorderBeam size="sm" colorVariant="colorful" theme="dark">
        <div className="flex h-10 w-24 items-center justify-center rounded-lg bg-zinc-900 text-xs text-zinc-400">
          border
        </div>
      </BorderBeam>
    ),
    component: (
      <BorderBeam size="md" colorVariant="colorful" theme="dark">
        <div className="flex h-16 w-40 items-center justify-center rounded-xl bg-zinc-900 text-sm text-zinc-400">
          border beam
        </div>
      </BorderBeam>
    ),
    code: `import { BorderBeam } from "@/components/goltui/border-beam"

export default function Page() {
  return (
    <BorderBeam size="md" colorVariant="colorful" theme="dark">
      <div>Content</div>
    </BorderBeam>
  )
}`,
  },
  {
    slug: "thinking-orbs",
    name: "Thinking Orbs",
    description: "Hand-tuned dotted thought-orb loading states for AI UIs.",
    preview: (
      <div className="flex items-center gap-6">
        <ThinkingOrb state="searching" size={64} theme="dark" />
        <ThinkingOrb state="weaving" size={64} theme="dark" />
      </div>
    ),
    component: (
      <div className="flex items-center gap-10">
        <ThinkingOrb state="searching" size={64} theme="dark" />
        <ThinkingOrb state="weaving" size={64} theme="dark" />
      </div>
    ),
    code: `import { ThinkingOrb } from "@/components/goltui/thinking-orbs"

export default function Page() {
  return <ThinkingOrb state="searching" size={64} theme="dark" />
}`,
  },
  {
    slug: "voice-glow",
    name: "Voice Glow",
    description: "Sound-reactive glow that blooms with real mic input.",
    preview: (
      <div className="flex flex-col items-center justify-center gap-1 text-xs text-zinc-500">
        <span className="h-2 w-24 rounded-full bg-gradient-to-r from-pink-500 via-emerald-400 to-sky-400 blur-[2px]" />
        <span className="mt-2">click the mic on its page</span>
      </div>
    ),
    component: (
      <div className="flex flex-col items-center justify-center gap-3 text-sm text-zinc-500">
        <span className="h-3 w-48 rounded-full bg-gradient-to-r from-pink-500 via-emerald-400 to-sky-400 blur-[3px]" />
        <span>a colorful beam that rises with real mic input</span>
      </div>
    ),
    code: `import { VoiceGlow } from "@/components/goltui/voice-glow"

export default function Page() {
  return <VoiceGlow />
}`,
  },
  {
    slug: "liquid-glass",
    name: "Liquid Glass",
    description: "Frosted glass surface with an optical displacement filter.",
    preview: (
      <div className="scale-[0.34]">
        <LiquidGlassDemo />
      </div>
    ),
    component: <LiquidGlassDemo />,
    code: `import { LiquidGlassCard } from "@/components/goltui/liquid-glass"

export default function Page() {
  return (
    <LiquidGlassCard glassSize="lg">
      <h3>Liquid Glass</h3>
    </LiquidGlassCard>
  )
}`,
  },
  {
    slug: "twitter-card",
    name: "Twitter Card",
    description: "X/Twitter post card with a hover light-fill reveal.",
    preview: (
      <div className="scale-[0.42]">
        <TwitterCard />
      </div>
    ),
    component: <TwitterCard />,
    code: `import TwitterCard from "@/components/goltui/twitter-card"

export default function Page() {
  return <TwitterCard />
}`,
  },
  {
    slug: "folder-card",
    name: "Folder Card",
    description: "An openable folder that fans out document cards on hover.",
    preview: (
      <div className="scale-[0.5]">
        <FolderCard />
      </div>
    ),
    component: <FolderCard />,
    code: `import FolderCard from "@/components/goltui/folder-card"

export default function Page() {
  return <FolderCard />
}`,
  },
];

function shuffleArray<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ComponentsSection() {
  const [items, setItems] = useState(featured);
  const [stacked, setStacked] = useState(false);
  const [gridHeight, setGridHeight] = useState<number | undefined>(undefined);
  const [preview, setPreview] = useState<Featured | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Remember the resting height so the page doesn't jump while the cards stack.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const update = () => {
      if (!busy.current) setGridHeight(el.offsetHeight);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lock scroll + allow Escape to close the preview.
  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [preview]);

  const handleShuffle = () => {
    if (busy.current) return;
    busy.current = true;

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    }

    // 1. Stack the cards into a single pile.
    setStacked(true);

    // 2. Then shuffle their positions as they fan back out.
    window.setTimeout(() => {
      setItems((prev) => shuffleArray(prev));
      setStacked(false);
      window.setTimeout(() => {
        busy.current = false;
      }, 1200);
    }, 1000);
  };

  return (
    <section id="components" className="mx-auto max-w-6xl px-6 py-24">
      <audio ref={audioRef} src="/sounds/shuffle.mp3" preload="auto" />
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Components
        </h2>
        <button
          type="button"
          onClick={handleShuffle}
          className="cursor-pointer font-mono text-sm text-zinc-400 transition-colors hover:text-white"
        >
          [ shuffle ]
        </button>
      </div>

      <div
        ref={gridRef}
        style={{ minHeight: gridHeight }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((c, i) => (
          <motion.div
            key={c.slug}
            layout
            transition={{ type: "spring", stiffness: 110, damping: 22, mass: 1.1 }}
            style={stacked ? { zIndex: 10 - i } : undefined}
            className={
              stacked
                ? "col-span-full row-start-1 w-full justify-self-center sm:w-[360px]"
                : undefined
            }
            animate={{
              rotate: stacked ? (i - 3) * 3 : 0,
              scale: stacked ? 0.94 : 1,
            }}
          >
            <div className="group block rounded-2xl border border-[#262626] bg-[#1a1a1a] p-2 pb-0 shadow-[0_18px_40px_-14px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.04)] transition-transform duration-200 hover:-translate-y-1 [font-family:'Instrument_Sans',system-ui,sans-serif]">
              <button
                type="button"
                onClick={() => setPreview(c)}
                className="relative flex h-[240px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[#2b2b2b] bg-[#0E0E0E]"
              >
                <div className="pointer-events-none">{c.preview}</div>
                <span className="pointer-events-none absolute right-2 bottom-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
                  Preview
                </span>
              </button>
              <div className="flex h-12 items-center justify-between px-[10px]">
                <Link
                  href={`/components/${c.slug}`}
                  className="text-[17px] font-medium tracking-tight text-[#f2f2f2] transition-colors hover:text-white"
                >
                  {c.name}
                </Link>
                <span className="text-sm text-[#8a8a8a]">{c.slug}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Split preview: live component slides in from the left, code from the right */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreview(null)}
            />

            <button
              type="button"
              onClick={() => setPreview(null)}
              aria-label="Close preview"
              className="absolute top-5 right-5 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
            >
              ✕
            </button>

            <div className="relative flex h-full flex-col sm:flex-row">
              {/* left: preview */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 240, damping: 30 }}
                className="relative z-10 flex h-1/2 w-full items-center justify-center overflow-hidden border-b border-white/10 bg-[#0E0E0E] p-6 sm:h-full sm:w-1/2 sm:border-r sm:border-b-0 sm:p-10"
              >
                {preview.component}
              </motion.div>

              {/* right: code */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 240, damping: 30 }}
                className="relative z-10 flex h-1/2 w-full flex-col gap-4 overflow-auto border-t border-white/10 bg-black p-6 sm:h-full sm:w-1/2 sm:border-t-0 sm:border-l sm:p-8"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {preview.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    {preview.description}
                  </p>
                </div>
                <CodeBlock code={preview.code} label={`${preview.slug}.tsx`} />
                <Link
                  href={`/components/${preview.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white/30"
                >
                  Open full page <span aria-hidden>›</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
