"use client";

/**
 * Demo wrapper around ThinkingOrb ("thinking-orbs"), originally from
 * Libraries.dev (https://libraries.dev/orbs) by Jakub Antalik, MIT
 * licensed. Copied in as-is (it's designed to be dropped into a project
 * directly) — only this demo wrapper is original.
 */

import { ThinkingOrb } from "./ThinkingOrb";
import type { OrbState } from "./types";

const states: OrbState[] = [
  "working",
  "searching",
  "solving",
  "listening",
  "connecting",
  "weaving",
  "composing",
  "breathing",
  "shaping",
];

export default function ThinkingOrbsDemo() {
  return (
    <div className="grid grid-cols-3 gap-8 py-10 sm:grid-cols-5">
      {states.map((state) => (
        <div key={state} className="flex flex-col items-center gap-3">
          <ThinkingOrb state={state} size={64} theme="dark" />
          <span className="font-mono text-xs text-zinc-500">{state}</span>
        </div>
      ))}
    </div>
  );
}
