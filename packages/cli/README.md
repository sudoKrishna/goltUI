# gotlui

**Copy-paste React + Tailwind components, delivered by CLI.**

`gotlui` writes a component's real source into your project, installs the npm
packages it needs, and gets out of the way. There is no runtime dependency to
import from — you own the code.

## Usage

Run it inside any Next.js + Tailwind project:

```bash
npx gotlui add input-mic
```

List everything available:

```bash
npx gotlui
```

That's it — no `init`, no config file.

### What happens

1. The component is looked up in the bundled registry.
2. Its file(s) are copied into:
   - `components/gotlui/…`, or
   - `src/components/gotlui/…` if your project has a `src/` directory.
   Existing files are **skipped**, never overwritten.
3. Any bundled assets are copied into `public/`.
4. The component's dependencies are installed with the package manager detected
   from your lockfile (`bun`, `pnpm`, `yarn`, or `npm`).
5. The exact import to paste is printed.

## Requirements

- Node.js **≥ 20**
- A project using **React**, **Tailwind CSS**, and (for several components) **Framer Motion**

## Available components

Install any of these with `npx gotlui add <name>`.

**Buttons & inputs**
`button` · `button-sizes` · `button-destructive` · `button-spinner` · `input-mic`

**Text & scroll**
`text-reveal` · `text-scroll`

**Heroes**
`hero-section` · `hero-section-two` · `plane-window-hero`

**Logo clouds**
`logo-cloud` · `logo-cloud-two`

**Cursor, sound & loaders**
`mouse-follow` · `voice-glow` · `border-beam` · `thinking-orbs`

**Auth**
`signup-one` · `signup-two` · `signup-three`

**Headers**
`header-01` · `header-02` · `header-03` · `header-04` · `header-05` · `header-06`

## How it works

The CLI is self-contained: it ships its own `registry/` and reads
`registry.json` locally. It never calls a website or an API, so **new
components require a new CLI release**.

Files are resolved relative to your project root, and `src/` is detected
automatically. Assets (such as cursor images) always resolve from the project
root, never under `src/`.

## Attribution

- `mouse-follow` (simple & spring), `text-scroll` — adapted from **Skiper UI** (credit required).
- `plane-window-hero` — adapted from **Aceternity UI**.
- `voice-glow`, `border-beam`, `thinking-orbs` — from **Libraries.dev** (MIT).

## License

[MIT](./LICENSE)
