<div align="center">

# gotlUI

**Copy-paste React + Tailwind components and blocks. Own the source, ship faster.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

[`Components`](#component-catalog) · [`CLI`](#cli) · [`Website`](#repository-structure) · [`Deploy`](#deployment)

</div>

---

gotlUI is a **copy-paste UI library**. There is no runtime package to depend on —
the CLI writes each component's real source into your project, installs whatever
npm packages it needs, and leaves you to edit the code freely.

The repo is a Turborepo monorepo with two publishable pieces:

| Artifact | Package | Ships to | Purpose |
| --- | --- | --- | --- |
| **Website** | `apps/web` | Vercel | Docs, component gallery, blocks, live previews |
| **CLI** | `packages/cli` (`gotlui`) | npm | `npx gotlui add <component>` |

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [CLI](#cli)
- [Component Catalog](#component-catalog)
- [Adding a Component](#adding-a-component)
- [Deployment](#deployment)
- [Attribution](#attribution)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **You own the code** — components are copied as source into `components/gotlui/`, not installed as an opaque dependency.
- **Zero-config CLI** — no `init`, no config file. It detects your package manager and whether you use a `src/` layout.
- **25 production-ready components & blocks** — buttons, inputs, heroes, logo clouds, auth layouts, headers, loaders, cursor and sound effects.
- **Motion-first** — built with [Framer Motion](https://www.framer.com/motion/) springs, layout and exit animations.
- **Accessible & responsive** — keyboard-friendly, mobile-ready, dark theme by default.
- **Strictly typed** — TypeScript throughout, Tailwind CSS v4, React 19, Next.js 16.
- **Automatic dependency install** — the CLI runs `bun add` / `pnpm add` / `yarn add` / `npm install` for you.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 13 |
| Smooth scroll | Lenis |
| Icons | `@icons-pack/react-simple-icons` |
| Language | TypeScript (strict) |
| Monorepo | Turborepo + Bun workspaces |
| CLI runtime | Node.js (ESM, zero runtime deps) |

---

## Repository Structure

```
gotlUI/
├── apps/
│   └── web/                    # Next.js site (docs, gallery, blocks, /play game)
│       └── src/
│           ├── app/            # App Router routes
│           │   ├── components/ # Component gallery + per-component docs
│           │   ├── blocks/     # Block pages (+ [slug] "coming soon" fallback)
│           │   ├── docs/       # Introduction & guides
│           │   ├── play/       # Playable Framer Motion game
│           │   └── preview/    # Full-page component previews
│           ├── components/     # The actual component source
│           └── lib/            # Shared data (e.g. block categories)
└── packages/
    └── cli/                    # Published npm package: `gotlui`
        ├── bin/gotlui.js       # CLI entry point
        └── registry/           # Component source + registry.json (what the CLI copies)
```

> **Note:** `packages/cli/registry/` mirrors component source from `apps/web`.
> When you add a component, add it to both (see [Adding a Component](#adding-a-component)).

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20 (this repo is developed on Node 22)
- **Bun** ≥ 1.3 — the package manager of record (`bun.lock`)

  <sub>npm, pnpm, and yarn work too, but Bun is what the lockfile and CI assume.</sub>

### Install & run

```bash
git clone https://github.com/sudoKrishna/goltUI.git
cd goltUI
bun install
bun run dev          # starts apps/web at http://localhost:3000
```

### Root scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Run all workspaces in dev (Turborepo) |
| `bun run build` | Production build of every workspace |
| `bun run lint` | Lint every workspace |

### Working on just the site

```bash
cd apps/web
bun dev        # http://localhost:3000
bun build      # next build
bun start      # serve the production build
```

---

## CLI

The `gotlui` CLI copies component source straight into your project.

```bash
# install a component (run in your own Next.js + Tailwind project)
npx gotlui add input-mic

# see everything available
npx gotlui
```

**What it does, in order:**

1. Looks up the component in the bundled registry.
2. Copies its file(s) into `components/gotlui/…` — or `src/components/gotlui/…` if your project has a `src/` directory. Existing files are skipped, never overwritten.
3. Copies any bundled assets into `public/`.
4. Installs the component's npm dependencies using the package manager it detects from your lockfile.
5. Prints the exact import to paste.

No init step. No config. No package added to your `dependencies`.

> The CLI is self-contained — it ships its own registry and never calls the
> website or an API. Publishing new components means publishing a new CLI version.

---

## Component Catalog

Install any of these with `npx gotlui add <name>`.

<details open>
<summary><strong>Buttons &amp; inputs</strong></summary>

| Name | Description |
| --- | --- |
| `button` | Base button, dark and light variants. |
| `button-sizes` | Extra Small, Small, Default, Large. |
| `button-destructive` | Destructive variant. |
| `button-spinner` | Loading buttons with a spinner. |
| `input-mic` | Chat input with a mic button, live waveform, optional speech-to-text. |

</details>

<details open>
<summary><strong>Text &amp; scroll</strong></summary>

| Name | Description |
| --- | --- |
| `text-reveal` | Sequentially fades in text word-by-word with optional blur. |
| `text-scroll` | Scroll-driven text and icon animation (3 variants) with Lenis. |

</details>

<details open>
<summary><strong>Heroes</strong></summary>

| Name | Description |
| --- | --- |
| `hero-section` | Cursor-reactive grid background with a gradient headline. |
| `hero-section-two` | Animated glowing gradient blob background. |
| `plane-window-hero` | Full-viewport airplane-window intro with liquid-glass optics. |

</details>

<details open>
<summary><strong>Logo clouds</strong></summary>

| Name | Description |
| --- | --- |
| `logo-cloud` | 8-logo grid that drops in row by row. |
| `logo-cloud-two` | Heading, subtext, marquee, and a CTA button. |

</details>

<details open>
<summary><strong>Cursor, sound &amp; loaders</strong></summary>

| Name | Description |
| --- | --- |
| `mouse-follow` | Four cursor-following effects: direct, spring, velocity blob, image swap. |
| `voice-glow` | Sound-reactive beam that blooms with real microphone input. |
| `border-beam` | Traveling or breathing colorful beam around an element's edge. |
| `thinking-orbs` | Nine dotted thought-orb loading states for AI & agent UIs. |

</details>

<details open>
<summary><strong>Auth</strong></summary>

| Name | Description |
| --- | --- |
| `signup-one` | Split-screen signup with an image side. |
| `signup-two` | Centered card signup. |
| `signup-three` | Minimal centered layout with Apple/Google sign-in. |

</details>

<details open>
<summary><strong>Headers</strong></summary>

| Name | Description |
| --- | --- |
| `header-01` | Two-column mega menu dropdown. |
| `header-02` | Grid dropdown with promo panels. |
| `header-03` | Compact single-column dropdown. |
| `header-04` | Sidebar-label dropdown. |
| `header-05` | Hides on scroll down, shows on scroll up, with a preview panel. |
| `header-06` | Simple links with a full-screen mobile menu. |

</details>

---

## Adding a Component

1. **Build it** in `apps/web/src/components/<name>` and add a docs page under
   `apps/web/src/app/components/<slug>`.
2. **Copy the source** into `packages/cli/registry/<slug>/`.
3. **Register it** in `packages/cli/registry/registry.json`:

   ```json
   {
     "my-component": {
       "description": "One-line description shown by the CLI.",
       "dependencies": ["framer-motion"],
       "files": [
         { "source": "my-component/index.ts", "target": "components/gotlui/my-component/index.ts" }
       ]
     }
   }
   ```

   - `files[]` — `source` is relative to `packages/cli/registry/`; `target` is relative to the consumer's project (`src/` is added automatically when present).
   - `assets[]` — optional; always resolved from the consumer's project root.
   - `import` — optional override for the printed import when the slug doesn't map cleanly:

     ```json
     "import": { "name": "{ MyComponent }", "path": "@/components/gotlui/my-component" }
     ```

4. **Test it** against a scratch project before publishing:

   ```bash
   mkdir /tmp/gotlui-test && cd /tmp/gotlui-test && echo '{}' > package.json && mkdir src
   node /path/to/gotlUI/packages/cli/bin/gotlui.js add my-component
   ```

---

## Deployment

The two artifacts deploy independently.

### Website → Vercel

1. Import the repository into Vercel.
2. Set **Root Directory** to `apps/web`.
3. Framework preset **Next.js** (auto-detected). Bun is used from `packageManager`/`bun.lock`.
4. No environment variables are required.
5. Deploy.

From the CLI instead:

```bash
cd apps/web
npx vercel --prod
```

### CLI → npm

```bash
cd packages/cli
npm login
npm publish --access public   # package name: gotlui
```

Then users can run `npx gotlui add <component>`.

---

## Attribution

Some components are adapted from open-source work and carry their own credit
requirements. Please preserve these credits:

- **Skiper UI** — `mouse-follow` (simple & spring variants), `text-scroll` (credit required).
- **Aceternity UI** — `plane-window-hero` (WebGL cloud shader substituted with a canvas drift).
- **Libraries.dev** (MIT) — `voice-glow`, `border-beam`, `thinking-orbs`.

---

## Contributing

1. Fork the repo and create a branch: `git checkout -b feat/my-component`.
2. Follow [Adding a Component](#adding-a-component).
3. Make sure it is clean before opening a PR:

   ```bash
   bun run lint
   bun run build
   ```

4. Open a pull request describing the component and any dependencies it adds.

---

## License

[MIT](./LICENSE) © gotlUI
