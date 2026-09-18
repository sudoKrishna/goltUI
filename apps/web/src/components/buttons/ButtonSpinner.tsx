"use client";

function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function ButtonSpinner() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        disabled
        className="flex cursor-not-allowed items-center gap-2 rounded-[10px] border border-zinc-800 bg-zinc-900 px-4 py-2 text-white opacity-80 transition-all duration-150"
      >
        <Spinner />
        Downloading
      </button>
      <button
        disabled
        className="flex cursor-not-allowed items-center gap-2 rounded-[10px] border border-zinc-800 bg-white px-4 py-2 text-black opacity-80 transition-all duration-150"
      >
        <Spinner />
        Uploading
      </button>
    </div>
  );
}
