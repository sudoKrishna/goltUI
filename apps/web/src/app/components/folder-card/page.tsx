import CodeBlock from "@/components/CodeBlock";
import FolderCard from "@/components/FolderCard";

const usageCode = `import FolderCard from "@/components/goltui/folder-card"

export default function Page() {
  return <FolderCard />
}`;

export default function FolderCardDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Folder Card
      </h1>
      <p className="mt-3 text-zinc-400">
        A folder that pops open on hover (or click). The document cards lift
        first, then the front flap tilts toward you with a spring as the
        cards fan out into a spread.
      </p>

      {/* Live demo */}
      <div className="mt-10 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-black p-10">
        <FolderCard />
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">
        Installation
      </h2>
      <CodeBlock code="npx goltui add folder-card" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">
        Interaction
      </h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-400">
        <li>
          <span className="text-zinc-300">Hover</span> to open, leave to close.
        </li>
        <li>
          <span className="text-zinc-300">Click</span> toggles it (handy on
          touch devices).
        </li>
        <li>
          The three inner cards are skeleton placeholders — swap their bodies
          for your own content.
        </li>
      </ul>
    </section>
  );
}
