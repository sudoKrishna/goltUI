"use client";

/**
 * "Simple" and "Spring" variants adapted from "Skiper 61" by Skiper UI
 * (https://skiper-ui.com), created by Gurvinder Singh (@gurvinder-singh02,
 * https://gxuri.me). Used under Skiper UI's free-tier license, which
 * requires this attribution. "Velocity Stretch" and "Magnetic Pull" are
 * original additions.
 */

import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import React from "react";

const SPRING = {
  mass: 0.1, // lower mass = snappier motion, higher mass = more sluggish
  damping: 10, // higher damping = settles faster with less bounce
  stiffness: 131, // higher stiffness = pulls back to target position harder/faster
};

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="grid content-start justify-items-center gap-6 text-center">
      <span className="relative max-w-[14ch] text-xs uppercase leading-tight text-zinc-500 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-zinc-600 after:to-transparent after:content-['']">
        {text}
      </span>
    </div>
  );
}

export function SimpleMouseFollow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
      className="mt-20 size-[500px] cursor-none overflow-hidden rounded-[2rem] bg-zinc-900"
    >
      <motion.div style={{ x, y, opacity }} className="size-5 rounded-full bg-[#ccc]" />
    </div>
  );
}

export function SpringMouseFollow() {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        xSpring.set(e.clientX - bounds.left);
        ySpring.set(e.clientY - bounds.top);
      }}
      onPointerEnter={() => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }}
      onPointerLeave={() => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      }}
      className="mt-20 size-[500px] overflow-hidden rounded-[2rem] bg-zinc-900"
    >
      <motion.div
        style={{ x: xSpring, y: ySpring, opacity: opacitySpring, scale: scaleSpring }}
        className="size-10 rounded-full bg-orange-500"
      />
    </div>
  );
}

// Original: the dot stretches and squashes along its direction of travel,
// based on real pointer velocity — feels like a liquid blob being dragged.
export function VelocityStretchMouseFollow() {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const xVelocity = useVelocity(x);
  const yVelocity = useVelocity(y);

  const speed = useTransform([xVelocity, yVelocity], (latest) => {
    const [vx, vy] = latest as number[];
    return Math.min(Math.sqrt(vx * vx + vy * vy) / 600, 1);
  });
  const angle = useTransform([xVelocity, yVelocity], (latest) => {
    const [vx, vy] = latest as number[];
    return (Math.atan2(vy, vx) * 180) / Math.PI;
  });
  const scaleX = useTransform(speed, (s) => 1 + s * 0.9);
  const scaleY = useTransform(speed, (s) => 1 - s * 0.4);

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - bounds.left);
        y.set(e.clientY - bounds.top);
      }}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
      className="mt-20 size-[500px] overflow-hidden rounded-[2rem] bg-zinc-900"
    >
      <motion.div
        style={{ x, y, opacity, rotate: angle, scaleX, scaleY }}
        className="size-8 rounded-full bg-emerald-400"
      />
    </div>
  );
}

// Original: a centered dot gets magnetically pulled toward the cursor the
// closer it gets, snapping back to center once the cursor leaves — the
// classic "magnetic button" effect.
export function MagneticMouseFollow() {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const scale = useSpring(1, SPRING);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - bounds.left - bounds.width / 2;
    const relY = e.clientY - bounds.top - bounds.height / 2;
    const distance = Math.sqrt(relX * relX + relY * relY);
    const radius = 160;
    const pull = Math.max(0, 1 - distance / radius);

    x.set(relX * pull * 0.6);
    y.set(relY * pull * 0.6);
    scale.set(1 + pull * 0.5);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="mt-20 flex size-[500px] items-center justify-center overflow-hidden rounded-[2rem] bg-zinc-900"
    >
      <motion.div style={{ x, y, scale }} className="size-16 rounded-full bg-white" />
    </div>
  );
}

export default function MouseFollowShowcase() {
  return (
    <section className="h-screen w-full snap-y snap-mandatory overflow-y-scroll bg-black">
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <SectionLabel text="Mouse follow simple" />
        <SimpleMouseFollow />
      </div>
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <SectionLabel text="Mouse follow with spring" />
        <SpringMouseFollow />
      </div>
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <SectionLabel text="Velocity stretch" />
        <VelocityStretchMouseFollow />
      </div>
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <SectionLabel text="Magnetic pull" />
        <MagneticMouseFollow />
      </div>
    </section>
  );
}
