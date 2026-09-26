const columns = [
  {
    title: "Explore",
    links: [
      { label: "Blocks", href: "/blocks" },
      { label: "Components", href: "/components" },
      { label: "Templates", href: null },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Changelog", href: null },
      {
        label: "Support",
        href: "https://github.com/sudoKrishna/goltUI/issues",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: null },
      { label: "Privacy Policy", href: null },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 sm:grid-cols-4">
        <div>
          <a href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-sm font-bold text-black">
              G
            </span>
            gotlUI
          </a>
          <p className="mt-3 max-w-[200px] text-sm text-zinc-500">
            Copy-paste UI blocks for React and Tailwind CSS.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-medium text-white">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-sm text-zinc-700">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-sm text-zinc-600">
        © {new Date().getFullYear()} gotlUI. All rights reserved.
      </div>
    </footer>
  );
}
