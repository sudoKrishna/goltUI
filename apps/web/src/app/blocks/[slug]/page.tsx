import Link from "next/link"
import { blockCategories, getBlockCategory, titleFromSlug } from "@/lib/block-categories"

// Pre-render the "coming soon" page for every category that doesn't have a
// real page yet. Categories with a page (header, hero-section, logo-cloud,
// auth) are handled by their own static routes.
export function generateStaticParams() {
  return blockCategories
    .filter((category) => !category.available)
    .map((category) => ({ slug: category.slug }))
}

export const dynamicParams = false

export default async function ComingSoonBlockPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getBlockCategory(slug)
  const name = category?.name ?? titleFromSlug(slug)

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center sm:py-36">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Coming soon
      </span>

      <h1 className="text-4xl font-semibold text-white sm:text-5xl">{name}</h1>

      <p className="mt-5 max-w-xl text-balance text-zinc-400">
        We&apos;re hand-crafting{" "}
        <span className="text-zinc-200">{name.toLowerCase()}</span> blocks with
        the same polish as the rest of gotlUI. It isn&apos;t available yet — check
        back soon.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/blocks/hero-section"
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Browse available blocks
        </Link>
        <Link
          href="/components"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
        >
          Explore components
        </Link>
      </div>

      <div className="mt-16 w-full max-w-md rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 8v4l3 2" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          This block is on the way.
        </p>
      </div>
    </section>
  )
}
