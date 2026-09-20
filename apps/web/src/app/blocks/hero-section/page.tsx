import Link from "next/link"
import HeroSection from "@/components/HeroSection"
import HeroSectionTwo from "@/components/HeroSectionTwo"
import PlaneWindowHero from "@/components/plane-window/PlaneWindowHero"
import BlockPreview from "@/components/BlockPreview"

const code = `import HeroSection from "@/components/gotlui/hero-section"

export default function Page() {
  return <HeroSection />
}`

const code2 = `import HeroSectionTwo from "@/components/gotlui/hero-section-two"

export default function Page() {
  return <HeroSectionTwo />
}`

const code3 = `import PlaneWindowHero from "@/components/gotlui/plane-window/PlaneWindowHero"

// The window is pinned and zooms in as you scroll past it — by the
// time you've scrolled through, it's zoomed past the viewport edges
// and whatever comes next in your page is revealed underneath.
export default function Page() {
  return <PlaneWindowHero />
}`

export default function HeroSectionBlockPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-5xl font-bold text-white">Hero Sections</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Tailwind CSS hero sections to present your main message, product
        visuals, and primary call-to-action at the top of your website. These
        hero layouts are designed to capture attention and clearly
        communicate value.
      </p>
      <div className="space-y-20">
      <div className="mt-10">
        <BlockPreview install="npx gotlui add hero-section" code={code}>
          <HeroSection />
        </BlockPreview>
      </div>

      <div className="mt-10">
        <BlockPreview install="npx gotlui add hero-section-two" code={code2}>
          <HeroSectionTwo />
        </BlockPreview>
      </div>

      <div className="mt-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Hero Section 03 — Plane window intro</h2>
            <p className="mt-2 text-sm text-zinc-400">
              A full-viewport flight-window intro that&apos;s pinned and zooms in
              as you scroll past it, revealing whatever comes next in your
              page. The zoom needs real viewport height to feel right — view
              it full screen for the actual effect.
            </p>
            <p className="mt-2 text-xs text-zinc-600">Inspired by Aceternity design.</p>
          </div>
          <Link
            href="/preview/plane-window-hero"
            target="_blank"
            className="flex-shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            View full screen
          </Link>
        </div>
        <div className="mt-6">
          <BlockPreview install="npx gotlui add plane-window-hero" code={code3}>
            <div className="h-[700px] overflow-y-auto">
              <PlaneWindowHero />
            </div>
          </BlockPreview>
        </div>
      </div>
      </div>
    </section>
  )
}
