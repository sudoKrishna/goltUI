export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent px-8 py-16">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Ship faster with gotlUI
        </h2>
        <p className="mx-auto mt-3 max-w-md text-zinc-400">
          A complete UI kit for developers who value speed, polish, and
          control — without wasting weeks on design.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#get-started"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Get All-Access
          </a>
          <a
            href="#blocks"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30"
          >
            Explore Blocks
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {[
            ["10+", "Full-page templates"],
            ["40+", "Reusable UI blocks"],
            ["1-click", "Copy, paste, ship"],
          ].map(([stat, label]) => (
            <div key={label}>
              <div className="text-xl font-semibold text-white">{stat}</div>
              <div className="mt-1 text-xs text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
