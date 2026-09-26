import Link from "next/link"
import CodeBlock from "@/components/CodeBlock"

const props = [
  { name: "char / Icon", type: "string | Component", desc: "The character or icon component to render for this position." },
  { name: "index", type: "number", desc: "The position of this character/icon in the sequence." },
  { name: "centerIndex", type: "number", desc: "The index treated as the visual center — distance from it drives the transform strength." },
  { name: "scrollYProgress", type: "MotionValue<number>", desc: "Framer Motion's scroll progress (0–1) for the target section, driving all the transforms." },
]

const usageCode = `import TextScrollAnimation from "@/components/gotlui/text-scroll/TextScrollAnimation"

export default function Page() {
  return <TextScrollAnimation />
}`

export default function TextScrollDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">Text Scroll Animation</h1>
      <p className="mt-3 text-zinc-400">
        A dynamic scroll-based text and icon animation with three variants —
        characters and icons move, rotate, and scale based on scroll
        position, with Lenis-powered smooth scroll.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-zinc-950 p-8 text-center">
        <p className="text-sm text-zinc-400">
          This component takes over page scroll (via Lenis), so it can&apos;t
          be embedded inline here — open it as its own page instead.
        </p>
        <Link
          href="/preview/text-scroll"
          target="_blank"
          className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Open live preview
        </Link>
      </div>

      <h2 className="mt-14 mb-3 text-lg font-medium text-white">Installation</h2>
      <CodeBlock code="npx gotlui add text-scroll" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

      <h2 className="mt-10 mb-4 text-lg font-medium text-white">Props (per character/icon)</h2>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-zinc-400">
              <th className="px-4 py-3 font-medium">Prop</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p, i) => (
              <tr key={p.name} className={i !== props.length - 1 ? "border-b border-white/5" : ""}>
                <td className="px-4 py-3 font-mono text-xs text-white">{p.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">{p.type}</td>
                <td className="px-4 py-3 text-zinc-400">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-xs text-zinc-600">
        Adapted from{" "}
        <a href="https://skiper-ui.com" target="_blank" rel="noreferrer" className="underline">
          Skiper UI
        </a>{" "}
        (ScrollAnimation_002) by{" "}
        <a href="https://gxuri.me" target="_blank" rel="noreferrer" className="underline">
          Gurvinder Singh
        </a>
        , used under its free-tier license.
      </p>
    </section>
  )
}
