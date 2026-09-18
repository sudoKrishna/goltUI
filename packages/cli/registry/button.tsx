"use client";

export default function Button() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="rounded-[10px] border border-zinc-800 bg-zinc-900 px-4 py-2 text-white transition-all duration-150 hover:border-zinc-800 hover:bg-zinc-800 active:scale-95 active:bg-zinc-700">
        Button
      </button>
      <button className="rounded-[10px] border border-zinc-800 bg-white px-4 py-2 text-black transition-all duration-150 hover:bg-zinc-200 active:scale-95 active:bg-zinc-300">
        Button
      </button>
    </div>
  );
}
