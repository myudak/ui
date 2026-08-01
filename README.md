# Manner UI

A source-owned editorial component system for thoughtful software and coding agents.

[Documentation](https://ui.myudak.com) · [Components](https://ui.myudak.com/components) · [Blocks](https://ui.myudak.com/blocks) · [Design rules](https://ui.myudak.com/design)

Manner combines a shadcn-compatible registry with Base UI primitives, warm editorial design tokens, application blocks, and agent-readable interface rules. You install the source into your project, then own and adapt every line.

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

- Foundations: Button, Field, Select, Switch, Dialog, Command
- Editorial: Surface, Section Heading, Note, Quote, Timeline, Metadata
- AI interfaces: Message, Composer, Reasoning, Tool Call, Sources, Artifact
- Blocks: Login, Sidebar, Settings, Reader, AI Workspace, Leaderboard
- `DESIGN.md` and `MANNER_AGENT.md` for coding-agent guidance
- A generated shadcn registry under `public/r`

## Architecture

Interactive behavior is built on [Base UI](https://base-ui.com/). Distribution follows the [shadcn registry](https://ui.shadcn.com/docs/registry) model: source files are copied into the consumer application rather than hidden behind a package abstraction.

The canonical source lives under:

```text
registry/manner/ui
registry/manner/editorial
registry/manner/ai
registry/manner/blocks
```

`registry.json` declares the catalog. `npm run registry:build` validates it and generates the public registry artifacts.

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
