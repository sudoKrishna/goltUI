import CodeBlock from "@/components/CodeBlock";
import TwitterCard from "@/components/TwitterCard";

const usageCode = `import TwitterCard from "@/components/goltui/twitter-card"

export default function Page() {
  return <TwitterCard />
}`;

export default function TwitterCardDocsPage() {
  return (
    <section className="max-w-3xl py-20">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Twitter Card
      </h1>
      <p className="mt-3 text-zinc-400">
        A social post card with a light-fill reveal — hovering (or focusing)
        the button grows a soft circle out of the X logo and inverts the card
        from dark to light. Uses{" "}
        <code className="text-zinc-300">/avatar.png</code> and the Instrument
        Sans webfont.
      </p>

      {/* Live demo */}
      <div className="mt-10 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-black p-10">
        <TwitterCard />
      </div>

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">
        Installation
      </h2>
      <CodeBlock code="npx goltui add twitter-card" />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">Usage</h2>
      <CodeBlock label="page.tsx" code={usageCode} />

      <h2 className="mt-10 mb-3 text-lg font-medium text-white">
        Things to change
      </h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-400">
        <li>
          Replace <code className="text-zinc-300">/avatar.png</code> with the
          real profile image.
        </li>
        <li>
          Update the name, handle, tweet text, timestamp, stats and link to
          your own profile.
        </li>
      </ul>
    </section>
  );
}
