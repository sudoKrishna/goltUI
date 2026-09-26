import CodeBlock from "@/components/CodeBlock"
import ThinkingOrbsDemo from "@/components/thinking-orbs/ThinkingOrbsDemo"

const usageCode = `import { ThinkingOrb } from "@/components/gotlui/thinking-orbs"

function Status() {
  return <ThinkingOrb state="searching" size={64} />
}`

const props = [
  {
    name: "state",
    type: "'working' | 'searching' | 'solving' | 'listening' | 'connecting' | 'weaving' | 'composing' | 'breathing' | 'shaping'",
    desc: "Which of the nine tuned animations to show. Default 'working'.",
  },
  {
    name: "size",
    type: "64 | 32 | 20",
    desc: "Tuned size preset in CSS px — 64 (avatar) and 20 (inline) are hand-tuned designs, 32 is interpolated. Default 64.",
  },
  {
    name: "theme",
    type: "'auto' | 'dark' | 'light'",
    desc: "Ink color for the substrate; auto detects from an ancestor's data-theme/.dark class or prefers-color-scheme, live.",
  },
  {
    name: "speed",
    type: "number",
    desc: "Multiplier on the preset's baked speed. Default 1.",
  },
  {
    name: "paused",
    type: "boolean",
    desc: "Freeze on the current frame. Default false.",
  },
  {
    name: "color",
    type: "string",
    desc: "Optional ink tint (#rgb, #rrggbb or rgb()), keeping the depth-shading ramp. Omit for stock grayscale.",
  },
  {
    name: "dots",
    type: "number",
    desc: "Density multiplier for dot/strand/node counts. Default 1.",
  },
  {
    name: "dotSize",
    type: "number",
    desc: "Radius multiplier for every dot. Default 1.",
  },
  {
    name: "gravity",
    type: "boolean | GravityOptions",
    desc: "The orb pulls the pointer in as it nears, warping a raster of the real cursor toward its centre. Off by default; needs a supplied cursor sprite.",
  },
]

export default function ThinkingOrbsDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Thinking Orbs
      </h1>
      <p className="mt-3 text-zinc-400">
        Dotted thought-orb loading indicators for AI &amp; agent UIs — nine
        hand-tuned animated states, rendered on a plain 2D canvas. No WebGL,
        no filters, identical pixels in every browser.
      </p>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
        <ThinkingOrbsDemo />
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">
        Installation
      </h2>
      <CodeBlock code="npx gotlui add thinking-orbs" />

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
