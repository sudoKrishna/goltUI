import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ButtonDefault from "@/components/buttons/ButtonDefault"
import ButtonSizes from "@/components/buttons/ButtonSizes"
import ButtonDestructive from "@/components/buttons/ButtonDestructive"
import ButtonSpinner from "@/components/buttons/ButtonSpinner"
import CodeBlock from "@/components/CodeBlock"

const sections = [
  {
    title: "Button",
    desc: "The base button, dark and light variants.",
    install: "npx gotlui add button",
    preview: <ButtonDefault />,
  },
  {
    title: "Sizes",
    desc: "Extra Small, Small, Default, and Large.",
    install: "npx gotlui add button-sizes",
    preview: <ButtonSizes />,
  },
  {
    title: "Destructive",
    desc: "For delete/destructive actions.",
    install: "npx gotlui add button-destructive",
    preview: <ButtonDestructive />,
  },
  {
    title: "Spinner",
    desc: "Disabled loading state with a spinning icon.",
    install: "npx gotlui add button-spinner",
    preview: <ButtonSpinner />,
  },
]

export default function ButtonDocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Button</h1>
          <p className="mt-3 text-zinc-400">
            Styled button variants — each one is its own install, so you only
            pull in what you need.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {sections.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h2 className="text-lg font-medium text-white">{s.title}</h2>
                <p className="mt-1 text-sm text-zinc-500">{s.desc}</p>

                <div className="mt-5 flex min-h-[100px] items-center justify-center rounded-xl border border-white/10 bg-zinc-950 p-8">
                  {s.preview}
                </div>

                <div className="mt-4">
                  <CodeBlock code={s.install} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
