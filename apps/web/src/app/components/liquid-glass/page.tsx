import CodeBlock from "@/components/CodeBlock";
import LiquidGlassDemo from "@/components/liquid-glass/LiquidGlassDemo";

const usageCode = `import { LiquidGlassCard, LiquidGlassButton } from "@/components/goltui/liquid-glass"

function Card() {
  return (
    <LiquidGlassCard glassSize="lg">
      <h3>Liquid Glass</h3>
      <p>Frosted glass surface with an optical filter.</p>
      <LiquidGlassButton>Get started</LiquidGlassButton>
    </LiquidGlassCard>
  )
}`;

const cardProps = [
  {
    name: "glassSize",
    type: "'sm' | 'default' | 'lg'",
    desc: "Padding preset. Default 'default' (p-6).",
  },
  {
    name: "glassEffect",
    type: "boolean",
    desc: "Toggles the SVG displacement filter that bends the light behind the panel. Default true.",
  },
  {
    name: "className",
    type: "string",
    desc: "Extra classes, e.g. to change radius, border or background.",
  },
];

const buttonProps = [
  {
    name: "...props",
    type: "ButtonHTMLAttributes",
    desc: "All native button props (onClick, disabled, aria-*, etc.).",
  },
];

export default function LiquidGlassDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Liquid Glass
      </h1>
      <p className="mt-3 text-zinc-400">
        A frosted, optically-distorted glass surface. The panel uses an SVG
        turbulence + displacement filter to bend the light behind it, layered
        with inset highlights so it reads like real glass. Ships with a glass
        button and a music-player demo.
      </p>

      {/* Live demo */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black">
        <LiquidGlassDemo />
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">
        Installation
      </h2>
      <CodeBlock code="npx goltui add liquid-glass" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

      <h2 className="mt-10 mb-4 text-lg font-medium text-white">
        LiquidGlassCard props
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
            {cardProps.map((p, i) => (
              <tr
                key={p.name}
                className={
                  i !== cardProps.length - 1 ? "border-b border-white/5" : ""
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

      <h2 className="mt-10 mb-4 text-lg font-medium text-white">
        LiquidGlassButton props
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
            {buttonProps.map((p, i) => (
              <tr
                key={p.name}
                className={
                  i !== buttonProps.length - 1 ? "border-b border-white/5" : ""
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
  );
}
