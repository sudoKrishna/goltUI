"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORD = "expand";

/**
 * Each font has a scale factor so every typeface renders at roughly the same
 * visual size. The scale multiplies the inherited font-size (1em).
 * `lift` nudges a font up/down to line it up with the rest of the heading.
 */
const EXPAND_FONTS: { family: string; scale: number; lift?: string }[] = [
  { family: "var(--font-pixel)", scale: 1.05, lift: "-0.06em" },
  { family: "'Press Start 2P', cursive", scale: 0.56 },
  { family: "'VT323', monospace", scale: 1.15 },
  { family: "'Silkscreen', sans-serif", scale: 0.78 },
  { family: "'Pixelify Sans', sans-serif", scale: 0.95 },
  { family: "'Handjet', sans-serif", scale: 1.05 },
  { family: "'Roboto', sans-serif", scale: 1 },
  { family: "'Montserrat', sans-serif", scale: 1 },
  { family: "'Playfair Display', serif", scale: 1 },
  { family: "'Lora', serif", scale: 1 },
  { family: "'Poppins', sans-serif", scale: 1 },
  { family: "'Oswald', sans-serif", scale: 1.05 },
  { family: "'Lobster', cursive", scale: 1 },
  { family: "'Pacifico', cursive", scale: 1.05 },
  { family: "'Bebas Neue', sans-serif", scale: 1.05 },
  { family: "'Cormorant Garamond', serif", scale: 1.1 },
  { family: "'Space Mono', monospace", scale: 1 },
  { family: "'Fira Code', monospace", scale: 1 },
  { family: "'Anton', sans-serif", scale: 1 },
  { family: "'Caveat', cursive", scale: 1.15 },
  { family: "'Righteous', cursive", scale: 1 },
];

type Letter = { char: string; y: string; delay: number; key: number };

const initialLetters: Letter[] = WORD.split("").map((char, i) => ({
  char,
  y: "0em",
  delay: 0,
  key: i,
}));

export default function ExpandWord() {
  const [index, setIndex] = useState(0);
  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const font = EXPAND_FONTS[index];

  useEffect(() => {
    const audio = new Audio("/sounds/click.mp3");
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleClick = () => {
    setIndex((current) => (current + 1) % EXPAND_FONTS.length);

    // Give every letter a random up/down offset and random timing. Random
    // values are created here (event handler) so server and client renders
    // stay in sync.
    setLetters((current) =>
      current.map((letter) => {
        const magnitude = 0.3 + Math.random() * 0.7;
        const sign = Math.random() < 0.5 ? -1 : 1;
        return {
          ...letter,
          y: `${sign * magnitude}em`,
          delay: Math.random() * 0.14,
          key: letter.key + 1,
        };
      }),
    );

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Shuffle the word expand"
      className="inline-flex cursor-pointer select-none items-center align-bottom transition-transform active:scale-95"
    >
      <span
        style={{
          fontFamily: font.family,
          fontSize: `${font.scale}em`,
          lineHeight: 1,
          position: "relative",
          top: font.lift ?? 0,
          display: "inline-block",
        }}
      >
        {letters.map((letter) => (
          <motion.span
            key={`${index}-${letter.key}`}
            initial={{ y: letter.y, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
              mass: 0.9,
              delay: letter.delay,
            }}
            className="inline-block bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent"
          >
            {letter.char}
          </motion.span>
        ))}
      </span>
    </button>
  );
}
