"use client";

import { motion } from "framer-motion";
import { logos } from "./logos";

export default function LogoMarqueeRow() {
  // Duplicate the track so the loop point is invisible.
  const track = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <motion.div
        className="flex w-max items-center gap-16"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-8 w-28 flex-shrink-0 items-center justify-center"
            title={logo.name}
          >
            <logo.Icon
              size={32}
              color="#ffffff"
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
