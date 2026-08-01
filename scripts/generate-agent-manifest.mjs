import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")

const readJson = async (relativePath) => JSON.parse(await readFile(resolve(root, relativePath), "utf8"))
const registry = await readJson("registry.json")
const design = await readFile(resolve(root, "public/DESIGN.md"), "utf8")
const agent = await readFile(resolve(root, "AGENTS.md"), "utf8")

const items = registry.items.map((item) => ({
  name: item.name,
  type: item.type,
  title: item.title,
  description: item.description,
  dependencies: item.dependencies ?? [],
  registryDependencies: item.registryDependencies ?? [],
  files: (item.files ?? []).map((file) => ({
    path: file.path,
    type: file.type,
    ...(file.target ? { target: file.target } : {}),
  })),
  install: `pnpm dlx shadcn@latest add @manner/${item.name}`,
  source: `https://github.com/myudak/ui/tree/main/${item.files?.[0]?.path ?? ""}`,
  registry: `https://ui.myudak.com/r/${item.name}.json`,
}))

const components = items.filter((item) => item.type === "registry:ui")
const blocks = items.filter((item) => item.type === "registry:block")
const files = items.filter((item) => item.type === "registry:file")

const aiManifest = {
  schemaVersion: "1.0",
  name: "manner",
  title: "Manner UI",
  version: "0.1.0",
  description: "A source-owned editorial React design system following shadcn registry conventions.",
  website: "https://ui.myudak.com",
  repository: "https://github.com/myudak/ui",
  license: "MIT",
  architecture: {
    distribution: "copy-source",
    registryFormat: "shadcn",
    primitiveLayer: "Base UI",
    styling: "Tailwind CSS 4 with semantic CSS variables",
  },
  docs: {
    design: "https://ui.myudak.com/design",
    foundations: "https://ui.myudak.com/foundations",
    components: "https://ui.myudak.com/components",
    blocks: "https://ui.myudak.com/blocks",
    agents: "https://ui.myudak.com/agents",
    compactGuide: "https://ui.myudak.com/llms.txt",
    fullGuide: "https://ui.myudak.com/llms-full.txt",
  },
  agentFiles: {
    repositoryInstructions: "https://github.com/myudak/ui/blob/main/AGENTS.md",
    hostedInstructions: "https://ui.myudak.com/AGENTS.md",
    designRules: "https://ui.myudak.com/DESIGN.md",
    workflowRules: "https://ui.myudak.com/MANNER_AGENT.md",
  },
  registry: {
    namespace: "@manner",
    itemTemplate: "https://ui.myudak.com/r/{name}.json",
    index: "https://ui.myudak.com/r/index.json",
    catalog: "https://ui.myudak.com/r/registry.json",
    setup: "pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json",
    rules: "pnpm dlx shadcn@latest add @manner/agent-rules",
  },
  conventions: {
    displayFont: "Fraunces Variable, approximately weight 420",
    interfaceFont: "Geist or Inter Variable",
    codeFont: "IBM Plex Mono or an equivalent monospace",
    tokens: ["canvas", "surface", "surface-raised", "surface-inset", "ink", "ink-secondary", "ink-muted", "accent", "accent-soft", "border-subtle", "border", "border-strong", "focus", "success", "warning", "danger", "info"],
    motion: ["enter-soft", "exit-soft", "reveal-line", "shift-active", "expand-panel", "swap-content", "press-control"],
    accessibility: ["keyboard operation", "visible focus", "accessible names", "reduced motion", "WCAG 2.2 AA target"],
  },
  counts: { components: components.length, blocks: blocks.length, files: files.length, total: items.length },
  items,
}

const compactIndex = {
  schemaVersion: "1.0",
  name: "manner",
  homepage: "https://ui.myudak.com",
  source: "https://github.com/myudak/ui",
  generatedFrom: "registry.json",
  items,
}

const componentLines = (group, entries) => [
  `### ${group}`,
  ...entries.map((item) => `- **${item.name}** — ${item.description} · \`pnpm dlx shadcn@latest add @manner/${item.name}\``),
  "",
]

const fullGuide = `# Manner UI — full agent guide

Manner is a source-owned editorial React design system. It follows shadcn registry conventions: source is installed into the consumer project and remains editable there. Interactive primitives use Base UI where behavior needs a robust accessibility foundation.

Canonical references:

- Website: https://ui.myudak.com
- Repository: https://github.com/myudak/ui
- Machine manifest: https://ui.myudak.com/ai.json
- Registry index: https://ui.myudak.com/r/index.json
- Design rules: https://ui.myudak.com/DESIGN.md
- Agent workflow: https://ui.myudak.com/MANNER_AGENT.md

## Recommended workflow

1. Read this guide and \`AGENTS.md\` before changing interface code.
2. Inspect the consumer project's structure, \`components.json\`, and existing tokens.
3. Search installed Manner source and the registry index before creating a primitive.
4. Install the closest component or block through the shadcn CLI.
5. Adapt the copied source to the product task while preserving semantics and focus behavior.
6. Implement loading, empty, error, disabled, overflow, mobile, and reduced-motion states where relevant.
7. Run the consumer project's lint, typecheck, tests, and visual checks.
8. Report reused items, changed source, and intentional exceptions to the design rules.

## Installation

\`\`\`bash
pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json
pnpm dlx shadcn@latest add @manner/button
pnpm dlx shadcn@latest add @manner/sidebar-01
pnpm dlx shadcn@latest add @manner/agent-rules
\`\`\`

## Catalog

${componentLines("UI components", components).join("\n")}${componentLines("Blocks", blocks).join("\n")}${componentLines("Agent files", files).join("\n")}
## Visual language

${design}

## Source and registry rules

- Use semantic CSS variables rather than component-specific color literals.
- Prefer existing Manner components and composition blocks over new primitives.
- Keep source imports explicit and local after installation.
- Do not claim Manner is affiliated with Anthropic, Claude, shadcn, or Base UI.
- If a component must diverge, document why and keep its accessibility behavior intact.
`

await writeFile(resolve(root, "public/ai.json"), `${JSON.stringify(aiManifest, null, 2)}\n`)
await writeFile(resolve(root, "public/r/index.json"), `${JSON.stringify(compactIndex, null, 2)}\n`)
await writeFile(resolve(root, "public/AGENTS.md"), agent)
await writeFile(resolve(root, "public/llms.txt"), `# Manner UI\n\n> A source-owned editorial React design system following shadcn registry conventions.\n\n## Start here\n\n- Manifest: https://ui.myudak.com/ai.json\n- Full guide: https://ui.myudak.com/llms-full.txt\n- Design rules: https://ui.myudak.com/DESIGN.md\n- Agent workflow: https://ui.myudak.com/MANNER_AGENT.md\n- Repository: https://github.com/myudak/ui\n\n## Discover\n\n- Components: https://ui.myudak.com/components\n- Blocks: https://ui.myudak.com/blocks\n- Registry index: https://ui.myudak.com/r/index.json\n- Registry item: https://ui.myudak.com/r/{name}.json\n\n## Install\n\n\`\`\`bash\npnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json\npnpm dlx shadcn@latest add @manner/button\npnpm dlx shadcn@latest add @manner/agent-rules\n\`\`\`\n\nManner copies source into the consumer project. Reuse existing items, preserve Base UI semantics, use semantic tokens, and verify keyboard, responsive, and reduced-motion behavior.\n`)
await writeFile(resolve(root, "public/llms-full.txt"), fullGuide)
