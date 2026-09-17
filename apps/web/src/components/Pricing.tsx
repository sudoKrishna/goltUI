const perks = [
  "10 full Next.js + Tailwind templates",
  "250+ UI blocks & animated components",
  "Lifetime access, one-time payment",
  "Free updates — new blocks added monthly",
  "Production-ready animations with Framer Motion",
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Simple, one-time pricing
          </h2>
          <p className="mt-3 max-w-md text-zinc-400">
            Pay once, use it forever — on unlimited personal and commercial
            projects.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex items-baseline gap-3">
            <span className="text-lg text-zinc-500 line-through">$99</span>
            <span className="text-4xl font-semibold text-white">$49</span>
            <span className="text-sm text-zinc-500">one-time</span>
          </div>

          <ul className="mt-6 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 text-emerald-400">✓</span>
                {perk}
              </li>
            ))}
          </ul>

          <a
            href="#get-started"
            className="mt-8 block w-full rounded-full bg-white py-3 text-center text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Get All-Access
          </a>

          <p className="mt-4 text-center text-xs text-zinc-500">
            Instant access · No subscription · Lifetime updates
          </p>
        </div>
      </div>
    </section>
  );
}
