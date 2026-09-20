import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CodeBlock from "@/components/CodeBlock"
import {
  SimpleMouseFollow,
  SpringMouseFollow,
  VelocityStretchMouseFollow,
  LinkHoverImageCursor,
} from "@/components/mouse/MouseFollow"

const usageCode = `import {
  SimpleMouseFollow,
  SpringMouseFollow,
  VelocityStretchMouseFollow,
  LinkHoverImageCursor,
} from "@/components/gotlui/mouse-follow"

// Native cursor everywhere, except hovering a link/button —
// then this image follows the pointer instead:
<LinkHoverImageCursor src="/cursors/lip-bite.png" size={120} />`

export default function MouseFollowDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Mouse Follow</h1>
          <p className="mt-3 text-zinc-400">
            Four cursor-following effects built on Framer Motion springs — from
            a direct 1:1 tracker to physics-based blobs and a link-hover image swap.
          </p>

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Installation</h2>
          <CodeBlock code="npx gotlui add mouse-follow" />

          <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
          <CodeBlock label="page.tsx" code={usageCode} />

          <h2 className="mt-14 mb-6 text-lg font-medium text-white">All variants</h2>

          <div className="flex flex-col gap-14">
            <div>
              <h3 className="font-mono text-sm text-white">SimpleMouseFollow</h3>
              <p className="mt-1 text-sm text-zinc-400">
                A dot that tracks the pointer directly, no easing.
              </p>
              <div className="mt-4 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
                <SimpleMouseFollow />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-sm text-white">SpringMouseFollow</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Tracks the pointer through a spring, with fade + scale in on hover.
              </p>
              <div className="mt-4 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
                <SpringMouseFollow />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-sm text-white">VelocityStretchMouseFollow</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Stretches and squashes along its direction of travel based on
                real pointer velocity — a liquid blob feel.
              </p>
              <div className="mt-4 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
                <VelocityStretchMouseFollow />
              </div>
            </div>

            <div>
              <h3 className="font-mono text-sm text-white">LinkHoverImageCursor</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Leaves the native cursor alone everywhere — except while
                hovering a link or button, where it hides the cursor and your
                image (or GIF) follows the pointer instead.
              </p>
              <div className="mt-4 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
                <LinkHoverImageCursor src="/cursors/lip-bite.png" />
              </div>
            </div>
          </div>

          <p className="mt-10 text-xs text-zinc-600">
            SimpleMouseFollow and SpringMouseFollow adapted from{" "}
            <a href="https://skiper-ui.com" target="_blank" rel="noreferrer" className="underline">
              Skiper UI
            </a>{" "}
            (Skiper 61) by{" "}
            <a href="https://gxuri.me" target="_blank" rel="noreferrer" className="underline">
              Gurvinder Singh
            </a>
            , used under its free-tier license. VelocityStretchMouseFollow and
            LinkHoverImageCursor are original.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
