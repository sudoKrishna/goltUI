import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import VoiceBeam from "@/components/VoiceBeam"
import CodeBlock from "@/components/CodeBlock"

const props = [
  { name: "children", type: "React.ReactNode", desc: "Child element to wrap with the voice effect" },
  { name: "type", type: '"default" | "pill" | "mobile"', desc: "Geometry preset for a ~350px chat input, a ~150x44 recording pill or the bottom of a phone screen" },
  { name: "stream", type: "MediaStream | null", desc: "MediaStream to react to (wins over level)" },
  { name: "level", type: "number | (() => number)", desc: "0-1 number or getter function for manual level control" },
  { name: "processing", type: "boolean", desc: "When true, gathers the glow into a beam that travels its range while work is in progress" },
  { name: "colorVariant", type: '"colorful" | "mono" | "ocean" | "sunset" | "forest" | "candy" | "ice" | "gold"', desc: "Color preset variant" },
  { name: "colors", type: "string[]", desc: "Up to 7 lobe colours for the glow effect" },
  { name: "bandColors", type: "{ core?: string, above?: string, mid?: string, below?: string }", desc: "Band colors for different parts of the effect" },
  { name: "sensitivity", type: "number", desc: "Input chain: gain for microphone sensitivity (default: 1)" },
  { name: "threshold", type: "number", desc: "Input chain: gate threshold (0-1, default: 0.05)" },
  { name: "attack", type: "number", desc: "Input chain: envelope attack time in seconds (default: 0.05)" },
  { name: "release", type: "number", desc: "Input chain: envelope release time in seconds (default: 0.2)" },
  { name: "reach", type: "number", desc: "Shape: how far the glow reaches (default: 1)" },
  { name: "spread", type: "number", desc: "Shape: horizontal spread of the glow (default: 1)" },
  { name: "flow", type: "number", desc: "Shape: flow speed of the animation (default: 1)" },
  { name: "bend", type: "number", desc: "Shape: bend/curve amount (default: 0)" },
  { name: "idle", type: "number", desc: "Shape: idle animation intensity (default: 0.3)" },
  { name: "theme", type: '"dark" | "light" | "auto"', desc: "Theme for color adaptation" },
  { name: "strength", type: "number", desc: "Effect opacity (0-1, default: 1)" },
  { name: "active", type: "boolean", desc: "Whether the effect is active (default: true)" },
  { name: "paused", type: "boolean", desc: "Whether the animation is paused (default: false)" },
  { name: "scale", type: "number", desc: "Scale multiplier for the effect (default: 1)" },
  { name: "className", type: "string", desc: "Additional CSS classes" },
  { name: "style", type: "React.CSSProperties", desc: "Additional inline styles" },
]

const installationCode = `npx gotlui add voice-beam`

const basicUsageCode = `import { VoiceBeam, useMicrophone } from '@components/gotlui/voice-beam';

const mic = useMicrophone();

<VoiceBeam stream={mic.stream}>
  <ChatInput />
</VoiceBeam>

<button onClick={mic.state === 'live' ? mic.stop : mic.start}>
  {mic.state === 'live' ? 'Stop' : 'Listen'}
</button>`

const processingUsageCode = `import { VoiceBeam, useMicrophone } from '@components/gotlui/voice-beam';

const mic = useMicrophone();
const [thinking, setThinking] = useState(false);

<VoiceBeam stream={mic.stream} processing={thinking}>
  <ChatInput />
</VoiceBeam>

<button onClick={mic.state === 'live' ? mic.stop : mic.start}>
  {mic.state === 'live' ? 'Stop' : 'Listen'}
</button>`

const manualLevelCode = `import { VoiceBeam } from '@components/gotlui/voice-beam';

// Without a microphone, drive it yourself (0-1, a number or a per-frame getter):
<VoiceBeam level={() => meter.current}>
  <Card />
</VoiceBeam>`

const colorVariantsCode = `import { VoiceBeam, useMicrophone } from '@components/gotlui/voice-beam';

const mic = useMicrophone();

// Different color variants
<VoiceBeam stream={mic.stream} colorVariant="ocean">
  <ChatInput />
</VoiceBeam>

<VoiceBeam stream={mic.stream} colorVariant="sunset">
  <ChatInput />
</VoiceBeam>

<VoiceBeam stream={mic.stream} colorVariant="forest">
  <ChatInput />
</VoiceBeam>`

const customColorsCode = `import { VoiceBeam, useMicrophone } from '@components/gotlui/voice-beam';

const mic = useMicrophone();

// Custom colors
<VoiceBeam 
  stream={mic.stream} 
  colors={['#ff0080', '#ff8c00', '#40e0d0', '#ee82ee']}
>
  <ChatInput />
</VoiceBeam>`

export default function VoiceBeamDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Voice Beam</h1>
          <p className="mt-3 text-zinc-400">
            Wraps a child element and overlays a sound-reactive glow along its bottom edge: 
            a centered, colorful beam that rises and blooms with the voice. Auto-detects the 
            child&apos;s border radius, ships zero runtime dependencies and needs React 18 or newer.
          </p>
          <p className="mt-3 text-zinc-400">
            The microphone needs a secure context (https or localhost) and mic.start() called 
            from a user gesture.
          </p>

          <div className="mt-10 flex min-h-[140px] items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 p-10">
            <div className="relative">
              <VoiceBeam>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-80 rounded-full bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-400 outline-none"
                />
              </VoiceBeam>
            </div>
          </div>

          <h2 className="mt-14 mb-3 text-lg font-medium text-white">Installation</h2>
          <CodeBlock code={installationCode} />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Basic Usage</h2>
          <CodeBlock label="page.tsx" code={basicUsageCode} />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">With Processing State</h2>
          <CodeBlock label="page.tsx" code={processingUsageCode} />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Manual Level Control</h2>
          <CodeBlock label="page.tsx" code={manualLevelCode} />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Color Variants</h2>
          <CodeBlock label="page.tsx" code={colorVariantsCode} />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Custom Colors</h2>
          <CodeBlock label="page.tsx" code={customColorsCode} />

          <h2 className="mt-10 mb-4 text-lg font-medium text-white">Props</h2>
          <div className="overflow-hidden rounded-xl border border-white/10">
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

          <p className="mt-6 text-xs text-zinc-600">
            Inspired by the <a href="https://libraries.dev/voice.html" className="text-zinc-400 underline">voice-glow</a> library.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
