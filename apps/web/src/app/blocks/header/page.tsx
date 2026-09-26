import Hearder01 from "@/components/hearders/Hearder01"
import Hearder02 from "@/components/hearders/Hearder02"
import Hearder03 from "@/components/hearders/Hearder03"
import Hearder04 from "@/components/hearders/Hearder04"
import Hearder05 from "@/components/hearders/Hearder05"
import Hearder06 from "@/components/hearders/Hearder06"
import BlockPreview from "@/components/BlockPreview"

const headers = [
  {
    title: "Header 01 — Two-column mega menu",
    install: "npx gotlui add header-01",
    code: `import Header01 from "@/components/gotlui/header-01"

export default function Page() {
  return <Header01 />
}`,
    Comp: Hearder01,
  },
  {
    title: "Header 02 — Grid dropdown with promo panels",
    install: "npx gotlui add header-02",
    code: `import Header02 from "@/components/gotlui/header-02"

export default function Page() {
  return <Header02 />
}`,
    Comp: Hearder02,
  },
  {
    title: "Header 03 — Compact single-column dropdown",
    install: "npx gotlui add header-03",
    code: `import Header03 from "@/components/gotlui/header-03"

export default function Page() {
  return <Header03 />
}`,
    Comp: Hearder03,
  },
  {
    title: "Header 04 — Sidebar-label dropdown",
    install: "npx gotlui add header-04",
    code: `import Header04 from "@/components/gotlui/header-04"

export default function Page() {
  return <Header04 />
}`,
    Comp: Hearder04,
  },
  {
    title: "Header 05 — Hide-on-scroll with preview panel",
    install: "npx gotlui add header-05",
    code: `import Header05 from "@/components/gotlui/header-05"

export default function Page() {
  return <Header05 />
}`,
    Comp: Hearder05,
  },
  {
    title: "Header 06 — Simple links, mobile menu",
    install: "npx gotlui add header-06",
    code: `import Header06 from "@/components/gotlui/header-06"

export default function Page() {
  return <Header06 />
}`,
    Comp: Hearder06,
  },
]

export default function HeaderBlockPage() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16">
      <h1 className="text-5xl font-bold text-white">Headers</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Tailwind CSS site headers with dropdown navigation, mega menus, and
        mobile menus — six layouts to start from.
      </p>

      <div className="mt-10 space-y-16">
        {headers.map((h) => (
          <div key={h.title}>
            <h2 className="text-2xl font-semibold text-white">{h.title}</h2>
            <div className="mt-6">
              <BlockPreview install={h.install} code={h.code}>
                <div className="min-h-[600px] bg-black">
                  <h.Comp />
                  <div className="flex h-[400px] items-center justify-center text-sm text-zinc-700">
                    Page content goes here
                  </div>
                </div>
              </BlockPreview>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
