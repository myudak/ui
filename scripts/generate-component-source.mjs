import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const registry = JSON.parse(await readFile(resolve(root, "registry.json"), "utf8"))
const entries = Object.fromEntries(
  registry.items
    .filter((item) => item.type === "registry:ui" && item.files?.[0]?.path)
    .map((item) => [item.title, item.files[0].path])
)

const componentSource = Object.fromEntries(
  await Promise.all(Object.entries(entries).map(async ([name, path]) => [name, await readFile(resolve(root, path), "utf8")]))
)

const blockEntries = Object.fromEntries(
  registry.items
    .filter((item) => item.type === "registry:block" && item.files?.[0]?.path)
    .map((item) => [item.name, item.files[0].path])
)

const blockSource = Object.fromEntries(
  await Promise.all(Object.entries(blockEntries).map(async ([name, path]) => [name, await readFile(resolve(root, path), "utf8")]))
)

const designSource = await readFile(resolve(root, "public/DESIGN.md"), "utf8")

const output = `export const componentSource: Record<string, string> = ${JSON.stringify(componentSource, null, 2)}\n\nexport const blockSource: Record<string, string> = ${JSON.stringify(blockSource, null, 2)}\n\nexport const designSource = ${JSON.stringify(designSource)}\n`
await writeFile(resolve(root, "app/component-source.generated.ts"), output)
