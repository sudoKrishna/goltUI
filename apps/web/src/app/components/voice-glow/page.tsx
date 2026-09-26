import CodeBlock from "@/components/CodeBlock"
import VoiceGlowDemo from "@/components/voice-glow/VoiceGlowDemo"

const usageCode = `import { VoiceBeam, useMicrophone } from "@/components/gotlui/voice-glow"

function Chat() {
  const mic = useMicrophone()

  return (
    <>
      <button onClick={mic.start}>Start mic</button>

      <VoiceBeam
        stream={mic.stream}
        type="default"          // 'default' | 'pill' | 'mobile'
        colorVariant="colorful" // colorful | mono | ocean | sunset | forest | candy | ice | gold
        theme="dark"            // dark | light | auto
        processing={false}      // true -> traveling beam while "thinking"
      >
        <div style={{ padding: 16, borderRadius: 16, background: "#1a1a1a" }}>
          Your chat input here
        </div>
      </VoiceBeam>
    </>
  )
}`

const props = [
  { name: "stream", type: "MediaStream | null", desc: "Audio to react to — get one from useMicrophone() or any getUserMedia source." },
  { name: "level", type: "number | (() => number)", desc: "Manual 0–1 drive when no stream is given." },
  { name: "type", type: "'default' | 'pill' | 'mobile'", desc: "Host preset that retunes the glow's geometry." },
  { name: "colorVariant", type: "'colorful' | 'mono' | 'ocean' | 'sunset' | 'forest' | 'candy' | 'ice' | 'gold'", desc: "Palette for the beam." },
  { name: "theme", type: "'dark' | 'light' | 'auto'", desc: "Adapts beam colors to the background." },
  { name: "processing", type: "boolean", desc: "Switches to a traveling beam, for a \"thinking\" state." },
  { name: "sensitivity", type: "number", desc: "Input gain on the analysed audio. Default 3.1." },
  { name: "reach", type: "number", desc: "How tall the glow grows at full level. Default 1.2." },
  { name: "active", type: "boolean", desc: "Turns the effect on/off, fading it out when false." },
]

export default function VoiceGlowDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">Voice Glow</h1>
      <p className="mt-3 text-zinc-400">
        A sound-reactive glow — a centered, colorful beam along the bottom
        edge of any element that rises and blooms with real microphone
        input. Click the mic below and speak.
      </p>

      <div className="mt-10 flex min-h-[200px] items-center justify-center rounded-2xl border border-white/10 bg-zinc-950">
        <VoiceGlowDemo />
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Installation</h2>
      <CodeBlock code="npx gotlui add voice-glow" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

      <h2 className="mt-10 mb-4 text-lg font-medium text-white">Key props</h2>
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
        Originally from{" "}
        <a href="https://libraries.dev/voice" target="_blank" rel="noreferrer" className="underline">
          Libraries.dev
        </a>{" "}
        by Jakub Antalik, MIT licensed. It has 50+ props for fine-tuning
        geometry, color, and motion — see the source for the full list.
      </p>
    </section>
  )
}
