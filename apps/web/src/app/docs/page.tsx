import Link from "next/link"
import CodeBlock from "@/components/CodeBlock"

export default function DocsIntroPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">Introduction</h1>
      <p className="mt-3 text-zinc-400">
        gotlUI is a copy-paste library of React + Tailwind components and
        blocks. There&apos;s no package to depend on — the CLI copies each
        component&apos;s source directly into your project, so you own the
        code and can edit it freely.
      </p>

      <h2 className="mt-12 mb-3 text-xl font-medium text-white">How it works</h2>
      <p className="text-zinc-400">
        Unlike a traditional npm package, running the CLI doesn&apos;t add a
        dependency to import from — it writes the component&apos;s actual
        source file(s) into <code className="text-zinc-300">components/gotlui/</code>{" "}
        in your project (or <code className="text-zinc-300">src/components/gotlui/</code>{" "}
        if you use a <code className="text-zinc-300">src/</code> layout), and
        installs whatever npm packages that component needs.
      </p>

      <h2 className="mt-12 mb-3 text-xl font-medium text-white">Installation</h2>
      <p className="text-zinc-400">
        Run this inside any Next.js + Tailwind project, swapping the
        component name for the one you want:
      </p>
      <div className="mt-4">
        <CodeBlock code="npx gotlui add input-mic" />
      </div>
      <p className="mt-4 text-zinc-400">
        That&apos;s it — no config file, no init step. Browse the{" "}
        <Link href="/components" className="text-white underline underline-offset-2">
          Components
        </Link>{" "}
        and{" "}
        <Link href="/blocks" className="text-white underline underline-offset-2">
          Blocks
        </Link>{" "}
        pages for the exact install command for each one.
      </p>

      <h2 className="mt-12 mb-3 text-xl font-medium text-white">Components vs. Blocks</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="font-medium text-white">Components</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Reusable, prop-driven pieces meant to be dropped in and
            configured — pass a <code className="text-zinc-300">value</code>,
            an <code className="text-zinc-300">onChange</code>, a{" "}
            <code className="text-zinc-300">src</code>, etc.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="font-medium text-white">Blocks</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Full page sections (heroes, auth forms, logo clouds) with the
            copy and layout hardcoded — meant to be copied and hand-edited,
            not configured through props.
          </p>
        </div>
      </div>

      <h2 className="mt-12 mb-3 text-xl font-medium text-white">Tech stack</h2>
      <ul className="list-inside list-disc space-y-1 text-zinc-400">
        <li>Next.js (App Router) + TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Framer Motion for animation</li>
        <li>No shadcn, no UI framework dependency — plain Tailwind throughout</li>
      </ul>

      <h2 className="mt-12 mb-3 text-xl font-medium text-white">Package managers</h2>
      <p className="text-zinc-400">
        The install commands shown use <code className="text-zinc-300">npx</code>,
        but the CLI detects your project&apos;s lockfile and uses the matching
        manager automatically:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <CodeBlock label="npm" code="npx gotlui add input-mic" />
        <CodeBlock label="pnpm" code="pnpm dlx gotlui add input-mic" />
        <CodeBlock label="yarn" code="yarn dlx gotlui add input-mic" />
        <CodeBlock label="bun" code="bunx gotlui add input-mic" />
      </div>
    </section>
  )
}
