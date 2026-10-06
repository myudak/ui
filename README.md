# Manner UI

A warm, editorial design system on shadcn and Base UI — installed as source, readable by coding agents.

[Documentation](https://ui.myudak.com) · [Components](https://ui.myudak.com/components) · [Blocks](https://ui.myudak.com/blocks) · [Foundations](https://ui.myudak.com/foundations) · [Agent guide](https://ui.myudak.com/agents)

Manner is a shadcn registry. Its primitives start from shadcn's **base-nova** (Base UI) sources and are restyled with warm editorial tokens; editorial, AI, and block patterns are Manner's own. Tokens use shadcn's standard variable names, so components you already have pick up the theme. You install the source into your project, then own and adapt every line.

## Install

Add the public registry namespace:

```bash
pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json
```

Install a component or a complete block:

```bash
pnpm dlx shadcn@latest add @manner/button
pnpm dlx shadcn@latest add @manner/sidebar-01
```

Install the design and agent rules:

```bash
pnpm dlx shadcn@latest add @manner/agent-rules
```

## What is included

- **47 components** — Form, Overlay, Navigation, Display, Editorial, and AI groups
- **6 blocks** — Login, Sidebar, Settings, Reader, AI Workspace, Leaderboard
- **`@manner/manner-theme`** — shadcn-standard tokens plus `brand`, `success`, `warning`, with 0.1 aliases
- `DESIGN.md` and `MANNER_AGENT.md` for coding-agent guidance (`@manner/agent-rules`)
- `AGENTS.md`, `ai.json`, `llms.txt`, and `llms-full.txt` for machine-readable discovery

Upgrading from 0.1? See [CHANGELOG.md](CHANGELOG.md).

## Architecture

Interactive behavior is built on [Base UI](https://base-ui.com/). Distribution follows the [shadcn registry](https://ui.shadcn.com/docs/registry) model: source files are copied into the consumer application rather than hidden behind a package abstraction.

The canonical source lives under:

```text
registry/catalog.json      # names, groups, descriptions — the single source of truth
registry/manner/ui         # primitives (ported from shadcn base-nova)
registry/manner/editorial  # editorial primitives
registry/manner/ai         # AI interface primitives
registry/manner/blocks     # full-page compositions
registry/manner/examples   # one live example per component, used by the docs
```

`npm run prepare:system` generates `registry.json` from the catalog (dependencies are derived from imports, the theme from `app/globals.css`), bundles source for the docs, writes the agent manifests, and runs `shadcn build` into `public/r`.

## Development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run prepare:system
npm run lint
npm run typecheck
node --test tests/registry-contract.test.mjs
```

## Design philosophy

Manner favors reading rhythm, semantic tokens, thin borders, deliberate surfaces, restrained motion, and source that agents can inspect. See [`public/DESIGN.md`](public/DESIGN.md) for the complete rules.

Manner is an independent project and is not affiliated with Anthropic, Claude, shadcn, or Base UI.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a component or block.

## License

MIT © Muchamad Yuda
