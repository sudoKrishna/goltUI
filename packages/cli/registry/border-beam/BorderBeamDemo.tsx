"use client";

import { BorderBeam } from "./BorderBeam";

const variants = [
  { size: "sm", label: "sm" },
  { size: "md", label: "md" },
  { size: "line", label: "line" },
  { size: "pulse-outside", label: "pulse-outside" },
  { size: "pulse-inner", label: "pulse-inner" },
] as const;

export default function BorderBeamDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-10">
      {variants.map((v) => (
        <div key={v.size} className="flex flex-col items-center gap-3">
          <BorderBeam size={v.size} colorVariant="colorful" theme="dark">
            <div className="flex h-16 w-32 items-center justify-center rounded-xl bg-zinc-900 text-sm text-zinc-300">
              {v.label}
            </div>
          </BorderBeam>
          <span className="font-mono text-xs text-zinc-500">{v.size}</span>
        </div>
      ))}
    </div>
  );
}
