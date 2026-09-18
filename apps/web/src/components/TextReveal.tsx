"use client";

import { easeOut, motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}

export default function TextReveal({
  text,
  className = "",
  filter = true,
  duration = 0.5,
  staggerDelay = 0.2,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <p className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: filter ? "blur(8px)" : "blur(0px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration,
            delay: i * staggerDelay,
            ease: easeOut,
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}
