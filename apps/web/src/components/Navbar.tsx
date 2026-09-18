export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-sm font-bold text-black">
            G
          </span>
          gotlUI
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#blocks" className="transition-colors hover:text-white">
            Blocks
          </a>
          <a href="/components" className="transition-colors hover:text-white">
            Components
          </a>
          <a href="#templates" className="transition-colors hover:text-white">
            Templates
          </a>
          <a href="#docs" className="transition-colors hover:text-white">
            Docs
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#github"
            className="hidden rounded-full border border-white/15 px-4 py-1.5 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white sm:block"
          >
            GitHub
          </a>
          <a
            href="#get-started"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}
