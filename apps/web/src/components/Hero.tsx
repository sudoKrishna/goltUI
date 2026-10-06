import HeroHeading from "@/components/HeroHeading";
import BrowseCommand from "@/components/BrowseCommand";

export default function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-start px-6 pb-24 pt-28 text-left">
      <a
        href="https://github.com/sudoKrishna/goltUI"
        target="_blank"
        rel="noreferrer"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Now with 40+ animated blocks
      </a>

      <HeroHeading />

      <p className="mt-6 max-w-xl text-balance text-base text-zinc-400 sm:text-lg">
        <span className="text-white">goltUI is a copy-paste library</span> of
        React + Tailwind components, blocks, and templates — built for
        developers who want production-ready UI in minutes, not weeks.
      </p>

      <BrowseCommand />
    </section>
  );
}
