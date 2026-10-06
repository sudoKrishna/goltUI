"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import InputMic from "@/components/InputMic";
import Button from "@/components/Buttons";
import TextReveal from "@/components/TextReveal";
import { BorderBeam } from "@/components/border-beam";
import { ThinkingOrb } from "@/components/thinking-orbs";
import { LiquidGlassCard } from "@/components/liquid-glass";
import TwitterCard from "@/components/TwitterCard";
import FolderCard from "@/components/FolderCard";

const featured = [
  {
    slug: "input-mic",
    name: "Input Mic",
    description: "Chat input with a mic button, live waveform, and speech-to-text.",
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
    preview: (
      <div className="pointer-events-none scale-[0.6]">
        <Button />
      </div>
    ),
  },
  {
    slug: "text-reveal",
    name: "Text Reveal",
    description: "Sequentially fades in text, creating a dynamic reveal.",
    preview: (
      <div className="pointer-events-none scale-90 px-4 text-center text-sm text-white">
        <TextReveal text="Fades in word by word." />
      </div>
    ),
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
  },
  {
    slug: "liquid-glass",
    name: "Liquid Glass",
    description: "Frosted glass surface with an optical displacement filter.",
    preview: (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <span className="absolute -top-6 -left-8 h-24 w-24 rounded-full bg-fuchsia-500/50 blur-2xl" />
        <span className="absolute -right-6 -bottom-8 h-24 w-24 rounded-full bg-sky-500/50 blur-2xl" />
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
    slug: "twitter-card",
    name: "Twitter Card",
    description: "X/Twitter post card with a hover light-fill reveal.",
    preview: (
      <div className="pointer-events-none scale-[0.42]">
        <TwitterCard />
      </div>
    ),
  },
  {
    slug: "folder-card",
    name: "Folder Card",
    description: "An openable folder that fans out document cards on hover.",
    preview: (
      <div className="pointer-events-none scale-[0.5]">
        <FolderCard />
      </div>
    ),
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
            <Link
              href={`/components/${c.slug}`}
              className="group block rounded-2xl border border-[#262626] bg-[#1a1a1a] p-2 pb-0 shadow-[0_18px_40px_-14px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.04)] transition-transform duration-200 hover:-translate-y-1 [font-family:'Instrument_Sans',system-ui,sans-serif]"
            >
              <div className="relative flex h-[240px] items-center justify-center overflow-hidden rounded-lg border border-[#2b2b2b] bg-[#0E0E0E]">
                {c.preview}
              </div>
              <div className="flex h-12 items-center justify-between px-[10px]">
                <span className="text-[17px] font-medium tracking-tight text-[#f2f2f2]">
                  {c.name}
                </span>
                <span className="text-sm text-[#8a8a8a]">{c.slug}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
