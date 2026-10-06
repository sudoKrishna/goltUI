"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import ExpandWord from "@/components/ExpandWord";

const HANDLE_POSITIONS = [
  "left-0 top-0",
  "left-1/2 top-0",
  "left-full top-0",
  "left-0 top-1/2",
  "left-full top-1/2",
  "left-0 top-full",
  "left-1/2 top-full",
  "left-full top-full",
];

function Handles() {
  return (
    <>
      {HANDLE_POSITIONS.map((position) => (
        <span
          key={position}
          className={`absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 border border-blue-500 bg-transparent ${position}`}
        />
      ))}
    </>
  );
}

/** Figma-style box that fades/pops in (dotted, used on "Ship"). */
function PopBox({ show }: { show: boolean }) {
  return (
    <motion.span
      aria-hidden
      initial={false}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -inset-1 z-20 border border-dotted border-zinc-700"
      style={{
        boxShadow: "0 0 0 1px rgba(63,63,70,0.35), 0 0 14px rgba(63,63,70,0.35)",
      }}
    />
  );
}

/** Box that drag-selects from top-left to bottom-right (used on "components"). */
function DrawBox({ show }: { show: boolean }) {
  return (
    <span className="pointer-events-none absolute -inset-1 z-20">
      <motion.span
        aria-hidden
        initial={false}
        animate={
          show
            ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }
            : { opacity: 0, clipPath: "inset(0% 100% 100% 0%)" }
        }
        transition={
          show
            ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.25, ease: "easeIn" }
        }
        className="absolute inset-0 border border-blue-500"
        style={{
          boxShadow:
            "0 0 0 1px rgba(59,130,246,0.35), 0 0 14px rgba(59,130,246,0.45)",
        }}
      />
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.2, delay: show ? 0.45 : 0 }}
        className="absolute inset-0"
      >
        <Handles />
      </motion.span>
    </span>
  );
}

/** "36 px" label + measurement line, on the left of "Ship". */
function SizeLabel({ show }: { show: boolean }) {
  return (
    <span className="pointer-events-none absolute top-1/2 right-full z-20 mr-1 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap">
      <motion.span
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.22, delay: show ? 0.4 : 0 }}
        className="text-[11px] font-medium tracking-wide text-pink-500"
      >
        36 px
      </motion.span>
      <motion.span
        initial={false}
        animate={{ scaleX: show ? 1 : 0, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.28, delay: show ? 0.2 : 0 }}
        className="h-px w-5 origin-left bg-pink-500"
      />
    </span>
  );
}

export default function HeroHeading() {
  const [showSelection, setShowSelection] = useState(false);
  const controls = useAnimationControls();

  // Play once when the page first opens, then keep it visible.
  useEffect(() => {
    const showTimer = setTimeout(() => setShowSelection(true), 900);
    return () => clearTimeout(showTimer);
  }, []);

  // Subtle blur-to-sharp on the whole text when the selection appears.
  useEffect(() => {
    controls.start({
      filter: ["blur(0px)", "blur(1.6px)", "blur(0px)"],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [showSelection, controls]);

  return (
    <motion.h1
      animate={controls}
      className="max-w-3xl text-4xl font-thin leading-tight tracking-tight text-white/80 sm:text-6xl"
    >
      <span className="relative inline-block text-3xl sm:text-5xl">
        <SizeLabel show={showSelection} />
        <PopBox show={showSelection} />
        Ship
      </span>
      ,{" "}
      <span className="inline-block">
        <ExpandWord />
      </span>
      <br />
      <span className="text-3xl sm:text-5xl">with</span>{" "}
      <span className="font-normal italic [font-family:'Cormorant_Garamond',serif]">
        golt{" "}
      </span>
      <span className="relative inline-block font-normal italic [font-family:'Cormorant_Garamond',serif]">
        <DrawBox show={showSelection} />
        components.
      </span>
    </motion.h1>
  );
}
