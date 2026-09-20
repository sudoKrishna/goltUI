import SignupOne from "@/components/auth/SignupOne"
import SignupTwo from "@/components/auth/SignupTwo"
import SignupThree from "@/components/auth/SignupThree"
import BlockPreview from "@/components/BlockPreview"

const code1 = `import SignupOne from "@/components/gotlui/signup-one/SignupOne"

export default function Page() {
  return <SignupOne />
}`

const code2 = `import SignupTwo from "@/components/gotlui/signup-two/SignupTwo"

export default function Page() {
  return <SignupTwo />
}`

const code3 = `import SignupThree from "@/components/gotlui/signup-three/SignupThree"

export default function Page() {
  return <SignupThree />
}`

export default function AuthBlockPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-5xl font-bold text-white">Auth</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Signup and login layouts for your app — split-screen with an image,
        a centered card, and a minimal form with social sign-in.
      </p>

      <div className="space-y-20">
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white">Signup 01 — Split screen</h2>
          <div className="mt-6">
            <BlockPreview install="npx gotlui add signup-one" code={code1}>
              <SignupOne />
            </BlockPreview>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white">Signup 02 — Centered card</h2>
          <div className="mt-6">
            <BlockPreview install="npx gotlui add signup-two" code={code2}>
              <SignupTwo />
            </BlockPreview>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white">Signup 03 — Minimal with social</h2>
          <div className="mt-6">
            <BlockPreview install="npx gotlui add signup-three" code={code3}>
              <SignupThree />
            </BlockPreview>
          </div>
        </div>
      </div>
    </section>
  )
}
