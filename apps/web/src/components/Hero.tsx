export default function Hero() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-6 pb-24 pt-28 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,119,198,0.25),transparent)]"
      />

      <a
        href="https://github.com/sudoKrishna/goltUI"
        target="_blank"
        rel="noreferrer"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Now with 40+ animated blocks
      </a>

      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
        Ship beautiful UI
        <br />
        <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          without designing it
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-balance text-base text-zinc-400 sm:text-lg">
        gotlUI is a copy-paste library of React + Tailwind components, blocks,
        and templates — built for developers who want production-ready UI in
        minutes, not weeks.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href="/blocks"
          className="rounded-md border border-zinc-700 bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Browse Blocks
        </a>
        <a
          href="/docs"
          className="rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-zinc-500"
        >
          Read the Docs
        </a>
      </div>

      <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-left">
        {[
          ["40+", "UI Blocks"],
          ["100%", "Copy & Paste"],
          ["MIT", "Licensed"],
        ].map(([stat, label]) => (
          <div key={label}>
            <div className="text-2xl font-semibold text-white">{stat}</div>
            <div className="text-sm text-zinc-500">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
