"use client";

export default function ButtonDestructive() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className="rounded-[10px] border border-transparent bg-[#5A2728] px-4 py-2 text-[#FF6467] transition-all duration-150 hover:bg-[#6b2f30] active:scale-95 active:bg-[#4a2021]">
        Destructive
      </button>
    </div>
  );
}
