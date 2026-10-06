"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Stage = "closed" | "peek" | "open";

const Bar = ({
  w,
  h = 6,
  className = "",
}: {
  w: number | string;
  h?: number;
  className?: string;
}) => (
  <div
    className={`shrink-0 rounded-[3px] bg-white/[.11] ${className}`}
    style={{ width: w, height: h }}
  />
);

/* back -> front (left card is at the back).
   y values are measured from the card's resting spot inside the folder. */
const cards = [
  {
    closed: { x: -3, y: 34 },
    peek: { x: -4, y: 22, rotate: 2.4 },
    open: { x: -78, y: -66, rotate: -5.5 },
    body: (
      <>
        <Bar w={34} h={7} />
        <Bar w="70%" className="mt-2" />
        <Bar w="100%" h={30} className="mt-2" />
        <Bar w="85%" className="mt-2" />
        <div className="mt-2 flex gap-1.5">
          <Bar w={14} h={14} />
          <Bar w={14} h={14} />
          <Bar w={14} h={14} />
        </div>
      </>
    ),
  },
  {
    closed: { x: 0, y: 38 },
    peek: { x: 0, y: 28, rotate: 1.6 },
    open: { x: 0, y: -72, rotate: -1.5 },
    body: (
      <>
        <Bar w={30} h={9} className="rounded-md" />
        <Bar w="55%" className="mt-2" />
        <Bar w="100%" className="mt-3" />
        <Bar w={26} className="mt-2" />
        <Bar w={46} h={11} className="mt-2 rounded-md" />
        <Bar w="85%" h={14} className="mt-2 rounded-md" />
      </>
    ),
  },
  {
    closed: { x: 3, y: 42 },
    peek: { x: 4, y: 34, rotate: 0.8 },
    open: { x: 78, y: -62, rotate: 7 },
    body: (
      <>
        <div className="flex gap-2">
          <Bar w={26} h={26} className="rounded-md" />
          <div className="min-w-0 flex-1">
            <Bar w={42} h={8} className="rounded-md" />
            <Bar w="90%" className="mt-1.5" />
          </div>
        </div>
        <Bar w="100%" className="mt-2.5" />
        <Bar w="60%" className="mt-1.5" />
        <div className="mt-2 flex gap-2">
          <Bar w={34} h={32} className="rounded-md" />
          <div className="min-w-0 flex-1">
            <Bar w={52} h={10} className="rounded-md" />
            <Bar w={28} className="mt-1.5" />
          </div>
        </div>
      </>
    ),
  },
];

export default function FolderCard() {
  const gid = useId();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);

  const stage: Stage = opened ? "open" : hovered ? "peek" : "closed";
  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 230, damping: 22, mass: 0.9 };

  const cardTarget = (i: number) => {
    const c = cards[i];
    if (stage === "open") return { ...c.open, scale: 1 };
    if (stage === "peek") return { ...c.peek, scale: 0.92 };
    return { ...c.closed, rotate: 0, scale: 0.9 };
  };

  const flap =
    stage === "open"
      ? { rotateX: -34, y: 8 }
      : stage === "peek"
        ? { rotateX: -16, y: 3 }
        : { rotateX: -7, y: 0 };

  return (
    <div className="w-[380px] max-w-full [font-family:'Instrument_Sans',system-ui,sans-serif]">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={opened}
        aria-label="Folder"
        className="relative h-[400px] cursor-pointer select-none overflow-hidden rounded-[28px] bg-[#f2f2f2] outline-none focus-visible:ring-2 focus-visible:ring-black/50"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          setOpened(false);
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => {
          setHovered(false);
          setOpened(false);
        }}
        onClick={() => setOpened((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpened((v) => !v);
          }
          if (e.key === "Escape") setOpened(false);
        }}
      >
        {/* folder, scaled down so the open fan stays inside the panel */}
        <div className="absolute left-1/2 top-[55%] h-[150px] w-[220px] -translate-x-1/2 -translate-y-1/2 scale-[0.8]">
          {/* floor shadow */}
          <motion.div
            aria-hidden
            className="absolute -bottom-4 left-1/2 h-7 w-[190px] -translate-x-1/2 rounded-full bg-black blur-xl"
            animate={{
              opacity: stage === "open" ? 0.34 : stage === "peek" ? 0.3 : 0.24,
              scaleX: stage === "open" ? 1.2 : 1,
              y: stage === "open" ? 6 : 0,
            }}
            transition={spring}
          />

          {/* back panel + tab */}
          <svg
            viewBox="0 0 220 150"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id={`${gid}-b`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#272727" />
                <stop offset="1" stopColor="#0e0e0e" />
              </linearGradient>
            </defs>
            <path
              d="M14 0H68Q78 0 85 6L91 12Q95 16 104 16H204Q220 16 220 32V136Q220 150 206 150H14Q0 150 0 136V14Q0 0 14 0Z"
              fill={`url(#${gid}-b)`}
            />
            <path
              d="M14 .5H68Q78 .5 85 6.5"
              fill="none"
              stroke="#fff"
              strokeOpacity=".07"
            />
          </svg>

          {/* cards */}
          <div className="absolute bottom-[44px] left-1/2 -ml-[75px] h-[118px] w-[150px]">
            {cards.map((c, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={cardTarget(i)}
                transition={{
                  ...spring,
                  delay: reduce
                    ? 0
                    : stage === "open"
                      ? i * 0.05
                      : stage === "closed"
                        ? (2 - i) * 0.03
                        : i * 0.025,
                }}
                className="absolute inset-0 overflow-hidden rounded-[10px] border border-white/[.07] bg-gradient-to-br from-[#282828] to-[#161616] p-2.5 shadow-[0_8px_18px_-6px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.06)]"
                style={{ zIndex: i + 1, transformOrigin: "50% 100%" }}
              >
                {c.body}
              </motion.div>
            ))}
          </div>

          {/* front flap */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 h-[104px]"
            style={{ perspective: 520 }}
          >
            <motion.div
              className="relative h-full w-full rounded-[16px] bg-gradient-to-b from-[#232323] via-[#161616] to-[#0b0b0b] shadow-[0_18px_30px_-12px_rgba(0,0,0,.65)]"
              style={{ transformOrigin: "50% 100%" }}
              initial={false}
              animate={flap}
              transition={spring}
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-[16px]"
                style={{
                  background:
                    "radial-gradient(40% 55% at 24% 60%, rgba(255,255,255,.07), transparent 70%), radial-gradient(35% 45% at 62% 35%, rgba(255,255,255,.045), transparent 70%)",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span
                aria-hidden
                className="absolute -left-[7px] inset-y-0 w-[40px] rounded-l-[18px] bg-gradient-to-r from-white/55 via-white/20 to-transparent opacity-80 blur-[4px] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
              />
              <span
                aria-hidden
                className="absolute -right-[7px] inset-y-0 w-[40px] rounded-r-[18px] bg-gradient-to-l from-white/55 via-white/20 to-transparent opacity-80 blur-[4px] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-8 rounded-b-[16px] bg-gradient-to-t from-black/50 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <p className="mt-3 pl-1 text-[15px] text-[#222]">Folder</p>
    </div>
  );
}
