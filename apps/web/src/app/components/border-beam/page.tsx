import CodeBlock from "@/components/CodeBlock"
import BorderBeamDemo from "@/components/border-beam/BorderBeamDemo"

const usageCode = `import { BorderBeam } from "@/components/gotlui/border-beam"

function Card() {
  return (
    <BorderBeam size="md" colorVariant="colorful" theme="dark">
      <div style={{ padding: 16, borderRadius: 16, background: "#1a1a1a" }}>
        Your content here
      </div>
    </BorderBeam>
  )
}`

const props = [
  {
    name: "size",
    type: "'sm' | 'md' | 'line' | 'pulse-outside' | 'pulse-inner'",
    desc: "Preset: sm/md/line travel a beam around the edge; pulse-outside/pulse-inner breathe a glow with no rotation. Demo uses line for the input.",
  },
  {
    name: "colorVariant",
    type: "'colorful' | 'mono' | 'ocean' | 'sunset' | 'forest' | 'candy' | 'ice' | 'gold'",
    desc: "Palette for the beam.",
  },
  {
    name: "theme",
    type: "'dark' | 'light' | 'auto'",
    desc: "Adapts beam colors to the background; auto follows prefers-color-scheme.",
  },
  {
    name: "duration",
    type: "number",
    desc: "Rotation/travel duration in seconds. Default 1.96 (border) / 2.4 (line).",
  },
  {
    name: "active",
    type: "boolean",
    desc: "Whether the animation is running. Default true.",
  },
  {
    name: "borderRadius",
    type: "number",
    desc: "Custom radius in px — auto-detected from the child if omitted.",
  },
  {
    name: "brightness",
    type: "number",
    desc: "Glow brightness multiplier. Default 1.3.",
  },
  {
    name: "glowSize",
    type: "number",
    desc: "Multiplies every glow layer's blur radius. Default 1.",
  },
  {
    name: "strength",
    type: "number",
    desc: "Overall opacity of the beam/glow (0–1), independent of the children.",
  },
]

export default function BorderBeamDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Border Beam
      </h1>
      <p className="mt-3 text-zinc-400">
        An animated border effect — a colorful beam that travels around
        an element&apos;s edge, or a breathing glow that pulses along it.
        Use it on cards, buttons, or a chat input with mic / stop.
      </p>

      {/* Live demo: input + mic → stop */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
        <BorderBeamDemo />
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">
        Installation
      </h2>
      <CodeBlock code="npx gotlui add border-beam" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

      <h2 className="mt-10 mb-4 text-lg font-medium text-white">
        Key props
      </h2>
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
              <tr
                key={p.name}
                className={
                  i !== props.length - 1 ? "border-b border-white/5" : ""
                }
              >
                <td className="px-4 py-3 font-mono text-xs text-white">
                  {p.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                  {p.type}
                </td>
                <td className="px-4 py-3 text-zinc-400">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
