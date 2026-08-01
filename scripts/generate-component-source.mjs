import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const entries = {
  Button: "registry/manner/ui/button.tsx",
  Field: "registry/manner/ui/field.tsx",
  Select: "registry/manner/ui/select.tsx",
  Switch: "registry/manner/ui/switch.tsx",
  Dialog: "registry/manner/ui/dialog.tsx",
  Command: "registry/manner/ui/command.tsx",
  Surface: "registry/manner/editorial/surface.tsx",
  "Section heading": "registry/manner/editorial/section-heading.tsx",
  Note: "registry/manner/editorial/note.tsx",
  Quote: "registry/manner/editorial/quote.tsx",
  Timeline: "registry/manner/editorial/timeline.tsx",
  Metadata: "registry/manner/editorial/metadata.tsx",
  Message: "registry/manner/ai/message.tsx",
  Composer: "registry/manner/ai/composer.tsx",
  Reasoning: "registry/manner/ai/reasoning.tsx",
  "Tool call": "registry/manner/ai/tool-call.tsx",
  Sources: "registry/manner/ai/sources.tsx",
  Artifact: "registry/manner/ai/artifact.tsx"
}

const componentSource = Object.fromEntries(
  await Promise.all(Object.entries(entries).map(async ([name, path]) => [name, await readFile(resolve(root, path), "utf8")]))
)

const blockEntries = {
  "login-01": "registry/manner/blocks/login-01.tsx",
  "sidebar-01": "registry/manner/blocks/sidebar-01.tsx",
  "settings-01": "registry/manner/blocks/settings-01.tsx",
  "reader-01": "registry/manner/blocks/reader-01.tsx",
  "ai-workspace-01": "registry/manner/blocks/ai-workspace-01.tsx",
  "leaderboard-01": "registry/manner/blocks/leaderboard-01.tsx"
}

const blockSource = Object.fromEntries(
  await Promise.all(Object.entries(blockEntries).map(async ([name, path]) => [name, await readFile(resolve(root, path), "utf8")]))
)

const designSource = await readFile(resolve(root, "public/DESIGN.md"), "utf8")

const output = `export const componentSource: Record<string, string> = ${JSON.stringify(componentSource, null, 2)}\n\nexport const blockSource: Record<string, string> = ${JSON.stringify(blockSource, null, 2)}\n\nexport const designSource = ${JSON.stringify(designSource)}\n`
await writeFile(resolve(root, "app/component-source.generated.ts"), output)
