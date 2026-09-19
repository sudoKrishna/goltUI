import HeroSection from "@/components/HeroSection"
import HeroSectionTwo from "@/components/HeroSectionTwo"
import BlockPreview from "@/components/BlockPreview"

const code = `import HeroSection from "@/components/gotlui/hero-section"

export default function Page() {
  return <HeroSection />
}`

const code2 = `import HeroSectionTwo from "@/components/gotlui/hero-section-two"

export default function Page() {
  return <HeroSectionTwo />
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
      </div>
    </section>
  )
}
