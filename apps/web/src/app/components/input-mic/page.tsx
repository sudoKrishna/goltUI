import InputMic from "@/components/InputMic"
import CodeBlock from "@/components/CodeBlock"

const props = [
  { name: "value", type: "string", desc: "Controlled text value. Omit to let the component manage its own state." },
  { name: "defaultValue", type: "string", desc: "Initial text when uncontrolled." },
  { name: "onChange", type: "(value: string) => void", desc: "Fires whenever the text changes (typing or speech)." },
  { name: "onTranscript", type: "(text: string, isFinal: boolean) => void", desc: "Fires with the live transcript while the mic is on — this is the speech-to-text hook." },
  { name: "onSend", type: "(value: string) => void", desc: "Fires when the send button is pressed, with the current text." },
  { name: "placeholder", type: "string", desc: 'Input placeholder. Defaults to "Type a message...".' },
  { name: "lang", type: "string", desc: 'BCP-47 language tag for speech recognition. Defaults to "en-US".' },
  { name: "className", type: "string", desc: "Extra classes for the outer container." },
]

const usageCode = `import { useState } from "react"
import InputMic from "@/components/gotlui/input-mic"

export default function Chat() {
  const [value, setValue] = useState("")

  return (
    <InputMic
      value={value}
      onChange={setValue}
      onTranscript={(text, isFinal) => {
        if (isFinal) console.log("Final transcript:", text)
      }}
      onSend={(text) => {
        console.log("Sending:", text)
        setValue("")
      }}
    />
  )
}`

export default function InputMicDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">Input Mic</h1>
      <p className="mt-3 text-zinc-400">
        A chat-style text input with a mic button. The waveform reacts to real
        microphone input, and the mic can optionally convert speech to text.
      </p>

      <div className="mt-10 flex min-h-[140px] items-center justify-center rounded-2xl border border-white/10 bg-zinc-950 p-10">
        <InputMic />
      </div>

      <h2 className="mt-14 mb-3 text-lg font-medium text-white">Installation</h2>
      <CodeBlock code="npx gotlui add input-mic" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

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
        Speech-to-text uses the browser&apos;s built-in SpeechRecognition API
        (Chrome/Edge support it; Firefox does not) — on unsupported browsers the
        waveform and typing still work, only <code className="text-zinc-400">onTranscript</code> won&apos;t fire.
      </p>
    </section>
  )
}
