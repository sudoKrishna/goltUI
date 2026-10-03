import Link from "next/link"
import CodeBlock from "@/components/CodeBlock"

const usageCode = `import DisintegrateOnScroll from "@/components/goltui/disintegrate-on-scroll"

export default function Hero() {
  return (
    <DisintegrateOnScroll
      options={{
        pinDistance: 1400,
        particleGap: 2,
        windDistance: 680,
      }}
    >
      <YourEntireHero />
    </DisintegrateOnScroll>
  )
}`

const options = [
  { name: "pinDistance", type: "number", def: "1300", desc: "Scroll distance used by the pinned effect." },
  { name: "particleGap", type: "number", def: "2", desc: "Sampling density; lower = more particles, higher = better performance." },
  { name: "windDistance", type: "number", def: "620", desc: "How far the dust travels horizontally." },
  { name: "turbulence", type: "number", def: "80", desc: "Amount of wind wobble." },
  { name: "lift", type: "number", def: "75", desc: "Upward movement as particles leave." },
  { name: "particleSize", type: "number", def: "1", desc: "Particle size multiplier." },
  { name: "stagger", type: "number", def: "0.16", desc: "Per-particle start delay range." },
  { name: "contentFade", type: "number", def: "0.16", desc: "How quickly the original DOM fades away (and the dust fades in)." },
  { name: "color", type: "string", def: '""', desc: "Particle color override. By default pixels keep the source color." },
  { name: "reducedMotion", type: "boolean", def: "false", desc: "Disable particle animation for accessibility." },
]

export default function DisintegrateOnScrollDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Disintegrate On Scroll
      </h1>
      <p className="mt-3 text-zinc-400">
        A reusable component that captures its children and turns the entire
        rendered UI into wind-blown particles while scrolling. Drop in any
        hero — headings, buttons, images, cards, SVGs — and it dissolves into
        dust.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-950 p-8 text-center">
        <p className="text-sm text-zinc-400">
          This component pins the page and takes over scroll, so it can&apos;t
          be embedded inline here — open it as its own page instead.
        </p>
        <Link
          href="/preview/disintegrate-on-scroll"
          target="_blank"
          className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Open live preview
        </Link>
      </div>

      <h2 className="mt-14 mb-3 text-lg font-medium text-white">
        Installation
      </h2>
      <CodeBlock code="npx goltui add disintegrate-on-scroll" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

      <h2 className="mt-10 mb-4 text-lg font-medium text-white">Options</h2>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-zinc-400">
              <th className="px-4 py-3 font-medium">Option</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Default</th>
              <th className="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {options.map((o, i) => (
              <tr key={o.name} className={i !== options.length - 1 ? "border-b border-white/5" : ""}>
                <td className="px-4 py-3 font-mono text-xs text-white">{o.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">{o.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-500">{o.def}</td>
                <td className="px-4 py-3 text-zinc-400">{o.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 mb-3 text-lg font-medium text-white">
        How it works
      </h2>
      <ul className="flex flex-col gap-3 text-sm text-zinc-400">
        <li>
          <span className="text-white">Capture.</span> The rendered children
          are screenshotted with html2canvas after fonts settle.
        </li>
        <li>
          <span className="text-white">Map.</span> Each sampled pixel is
          offset by <code className="text-zinc-500">contentRect − sectionRect</code>{" "}
          so particles start exactly on top of the rendered children.
        </li>
        <li>
          <span className="text-white">Overlap.</span> Particles stay put on
          top of the rendered children while the DOM fades, so the text turns
          into a dotted copy of itself in place.
        </li>
        <li>
          <span className="text-white">Dissolve.</span> Once the handoff is
          done, the pinned GSAP ScrollTrigger releases the dust — it drifts on
          the wind and fades, while the original DOM stays in the tree for
          accessibility and reduced-motion users.
        </li>
      </ul>

      <p className="mt-8 text-xs text-zinc-600">
        Requires <code className="text-zinc-500">gsap</code> and{" "}
        <code className="text-zinc-500">html2canvas</code>. Ships with its own{" "}
        <code className="text-zinc-500">disintegrate-on-scroll.css</code>.
      </p>
    </section>
  )
}
