"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { topLogos, bottomLogos } from "./logos";

const topGroupA = topLogos.slice(0, 4);
const topGroupB = topLogos.slice(4, 8);
const bottomGroupA = bottomLogos.slice(0, 4);
const bottomGroupB = bottomLogos.slice(4, 8);

// Both rows enter from above the first time they appear.
const enterFromAbove = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

// After that, each row's swap moves in its own direction — top row
// pushes downward (new comes from above, old exits below), bottom row
// pushes upward (new comes from below, old exits above) — like two
// conveyor belts moving opposite ways.
const topCycle = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { y: 40, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

const bottomCycle = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { y: -40, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

function LogoRow({
  rowLogos,
  rowKey,
  hasEnteredRef,
  cycleVariant,
}: {
  rowLogos: typeof topGroupA;
  rowKey: string;
  hasEnteredRef: React.MutableRefObject<boolean>;
  cycleVariant: typeof topCycle;
}) {
  return (
    <div className="relative h-16">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={rowKey}
          variants={hasEnteredRef.current ? cycleVariant : enterFromAbove}
          initial="hidden"
          animate="visible"
          exit="exit"
          onAnimationComplete={() => {
            hasEnteredRef.current = true;
          }}
          className="absolute inset-0 grid grid-cols-4 gap-x-16"
        >
          {rowLogos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center" title={logo.name}>
              <logo.Icon size={40} color="#ffffff" />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const SWAP_INTERVAL = 7000;
const ROW_OFFSET = 1000;

export default function LogoCloud() {
  const [topSwapped, setTopSwapped] = useState(false);
  const [bottomSwapped, setBottomSwapped] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const topEntered = useRef(false);
  const bottomEntered = useRef(false);

  // Top row enters first, then the bottom row shortly after.
  useEffect(() => {
    const t = setTimeout(() => setShowBottom(true), 700);
    return () => clearTimeout(t);
  }, []);

  // Each row rotates through its own pool independently, on its own clock.
  useEffect(() => {
    const id = setInterval(() => setTopSwapped((s) => !s), SWAP_INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setBottomSwapped((s) => !s);
      id = setInterval(() => setBottomSwapped((s) => !s), SWAP_INTERVAL);
    }, ROW_OFFSET);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, []);

  const topRow = topSwapped ? topGroupB : topGroupA;
  const bottomRow = bottomSwapped ? bottomGroupB : bottomGroupA;

  return (
    <div className="w-full bg-black py-16 text-center">
      <h2 className="text-3xl font-bold text-white">Trusted by Industry Leaders</h2>
      <p className="mx-auto mt-3 max-w-xl text-zinc-400">
        Our platform powers the most ambitious companies in the world.
      </p>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-y-14">
        <LogoRow
          rowLogos={topRow}
          rowKey={topSwapped ? "top-B" : "top-A"}
          hasEnteredRef={topEntered}
          cycleVariant={topCycle}
        />
        {showBottom && (
          <LogoRow
            rowLogos={bottomRow}
            rowKey={bottomSwapped ? "bottom-B" : "bottom-A"}
            hasEnteredRef={bottomEntered}
            cycleVariant={bottomCycle}
          />
        )}
      </div>
    </div>
  );
}
