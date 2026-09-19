import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CodeBlock from "@/components/CodeBlock"
import { MagneticMouseFollow } from "@/components/mouse/MouseFollow"

const variants = [
  { name: "SimpleMouseFollow", desc: "A dot that tracks the pointer directly, no easing." },
  { name: "SpringMouseFollow", desc: "Tracks the pointer through a spring, with fade + scale in on hover." },
  { name: "VelocityStretchMouseFollow", desc: "Stretches and squashes along its direction of travel based on real pointer velocity — a liquid blob feel." },
  { name: "MagneticMouseFollow", desc: "A centered dot gets pulled toward the cursor the closer it gets, snapping back when the cursor leaves." },
]

const usageCode = `import { MagneticMouseFollow } from "@/components/gotlui/mouse-follow"

export default function Page() {
  return <MagneticMouseFollow />
}`

export default function MouseFollowDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Mouse Follow</h1>
          <p className="mt-3 text-zinc-400">
            Four cursor-following effects built on Framer Motion springs — from
            a direct 1:1 tracker to physics-based blobs and magnetic pulls.
          </p>

          <div className="mt-10 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
            <MagneticMouseFollow />
          </div>
          <p className="mt-3 text-center text-xs text-zinc-600">
            Move your cursor over the box above — this is the Magnetic Pull variant.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/preview/mouse-follow"
              target="_blank"
              className="inline-block rounded-lg border border-white/15 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30"
            >
              Open full preview (all 4, scroll-snap)
            </Link>
          </div>

          <h2 className="mt-14 mb-3 text-lg font-medium text-white">Installation</h2>
          <CodeBlock code="npx gotlui add mouse-follow" />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
          <CodeBlock label="page.tsx" code={usageCode} />

          <h2 className="mt-10 mb-4 text-lg font-medium text-white">Variants</h2>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-zinc-400">
                  <th className="px-4 py-3 font-medium">Export</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v, i) => (
                  <tr key={v.name} className={i !== variants.length - 1 ? "border-b border-white/5" : ""}>
                    <td className="px-4 py-3 font-mono text-xs text-white">{v.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{v.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-xs text-zinc-600">
            SimpleMouseFollow and SpringMouseFollow adapted from{" "}
            <a href="https://skiper-ui.com" target="_blank" rel="noreferrer" className="underline">
              Skiper UI
            </a>{" "}
            (Skiper 61) by{" "}
            <a href="https://gxuri.me" target="_blank" rel="noreferrer" className="underline">
              Gurvinder Singh
            </a>
            , used under its free-tier license. VelocityStretchMouseFollow and
            MagneticMouseFollow are original.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
