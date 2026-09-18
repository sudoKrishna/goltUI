import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import TextReveal from "@/components/TextReveal"
import CodeBlock from "@/components/CodeBlock"

const props = [
  { name: "text", type: "string", default: "-", desc: "The text content to reveal with the animation." },
  { name: "className", type: "string", default: "-", desc: "Optional Tailwind CSS classes to style the wrapper element." },
  { name: "filter", type: "boolean", default: "true", desc: "Applies a blur effect that transitions during the reveal animation." },
  { name: "duration", type: "number", default: "0.5", desc: "Animation duration (in seconds) for each word." },
  { name: "staggerDelay", type: "number", default: "0.2", desc: "Delay between each word's animation start time." },
]

const usageCode = `import TextReveal from "@/components/gotlui/text-reveal"

export default function Example() {
  return (
    <TextReveal
      text="This sentence reveals itself one word at a time with a blur effect."
      staggerDelay={0.2}
      className="mx-auto max-w-3xl text-lg font-semibold"
    />
  )
}`

export default function TextRevealDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Text Reveal</h1>
          <p className="mt-3 text-zinc-400">
            A stylish effect that sequentially fades in text on page load, creating a dynamic reveal.
          </p>

          <div className="mt-10 flex min-h-[140px] items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 p-10 text-center">
            <TextReveal
              text="ForgeUI is a beautifully designed component library built with Tailwind CSS and Motion."
              className="justify-center text-lg font-semibold text-white"
            />
          </div>

          <h2 className="mt-14 mb-3 text-lg font-medium text-white">Installation</h2>
          <CodeBlock code="npx gotlui add text-reveal" />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
          <CodeBlock label="page.tsx" code={usageCode} />

          <h2 className="mt-10 mb-4 text-lg font-medium text-white">Props</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-zinc-400">
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map((p, i) => (
                  <tr key={p.name} className={i !== props.length - 1 ? "border-b border-white/5" : ""}>
                    <td className="px-4 py-3 font-mono text-xs text-white">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-400">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">{p.default}</td>
                    <td className="px-4 py-3 text-zinc-400">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
