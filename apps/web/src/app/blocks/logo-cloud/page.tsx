import LogoCloud from "@/components/logos/LogoCloud"
import LogoCloudTwo from "@/components/logos/LogoCloudTwo"
import BlockPreview from "@/components/BlockPreview"

const code = `import LogoCloud from "@/components/gotlui/logo-cloud"

export default function Page() {
  return <LogoCloud />
}`

const code2 = `import LogoCloudTwo from "@/components/gotlui/logo-cloud-two"

export default function Page() {
  return <LogoCloudTwo />
}`

export default function LogoCloudBlockPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-5xl font-thin text-white">Logo Clouds</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Tailwind CSS logo cloud sections to display logos of your clients,
        partners, or companies using your product to build credibility and
        trust. These logo layouts include multiple styles for showcasing
        brand associations.
      </p>

      <div className="space-y-20">
        <div className="mt-10">
          <BlockPreview install="npx gotlui add logo-cloud" code={code}>
            <LogoCloud />
          </BlockPreview>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white">Logo Cloud 02</h2>
          <div className="mt-6">
            <BlockPreview install="npx gotlui add logo-cloud-two" code={code2}>
              <LogoCloudTwo />
            </BlockPreview>
          </div>
        </div>
      </div>
    </section>
  )
}
