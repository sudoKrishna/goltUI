export type BlockCategory = {
  slug: string
  name: string
  /** Whether a real page exists at /blocks/<slug>. */
  available?: boolean
}

export const blockCategories: BlockCategory[] = [
  { slug: "header", name: "Header", available: true },
  { slug: "hero-section", name: "Hero Section", available: true },
  { slug: "logo-cloud", name: "Logo Cloud", available: true },
  { slug: "auth", name: "Auth", available: true },
  { slug: "feature", name: "Feature" },
  { slug: "pricing", name: "Pricing" },
  { slug: "faq", name: "FAQ" },
  { slug: "testimonial", name: "Testimonial" },
  { slug: "call-to-action", name: "Call to Action" },
  { slug: "footer", name: "Footer" },
  { slug: "stats", name: "Stats" },
  { slug: "contact", name: "Contact" },
]

export function getBlockCategory(slug: string) {
  return blockCategories.find((category) => category.slug === slug)
}

export function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
