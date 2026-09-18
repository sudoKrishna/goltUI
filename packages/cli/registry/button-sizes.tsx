"use client";

const base =
  "rounded-[10px] border border-zinc-800 bg-zinc-900 text-white transition-all duration-150 hover:border-zinc-800 hover:bg-zinc-800 active:scale-95 active:bg-zinc-700";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className={`${base} px-2.5 py-1 text-xs`}>Extra Small</button>
      <button className={`${base} px-3 py-1.5 text-sm`}>Small</button>
      <button className={`${base} px-4 py-2 text-sm`}>Default</button>
      <button className={`${base} px-6 py-3 text-base`}>Large</button>
    </div>
  );
}
