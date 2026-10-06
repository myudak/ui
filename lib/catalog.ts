import catalog from "@/registry/catalog.json"

export type CatalogGroup = "Form" | "Overlay" | "Navigation" | "Display" | "Editorial" | "AI"

export type ComponentDoc = {
  name: string
  title: string
  group: CatalogGroup
  description: string
  file: string
  example: string
}

export type BlockDoc = {
  name: string
  title: string
  category: string
  description: string
  file: string
}

export const catalogGroups: CatalogGroup[] = ["Form", "Overlay", "Navigation", "Display", "Editorial", "AI"]

export const groupDescriptions: Record<CatalogGroup, string> = {
  Form: "Inputs and controls built on Base UI with associated labels, descriptions, and errors.",
  Overlay: "Layers that appear above the page — modal, anchored, or swipeable.",
  Navigation: "Ways to move between views, pages, and steps.",
  Display: "Status, structure, and feedback for content.",
  Editorial: "Typographic primitives that give Manner its reading rhythm.",
  AI: "Conversation, tool, and artifact patterns for AI products.",
}

export const componentCatalog = catalog.components as ComponentDoc[]
export const blockCatalog = catalog.blocks as BlockDoc[]

export function getComponent(name: string) {
  return componentCatalog.find((item) => item.name === name)
}

export function getBlock(name: string) {
  return blockCatalog.find((item) => item.name === name)
}

export function componentsInGroup(group: CatalogGroup) {
  return componentCatalog.filter((item) => item.group === group)
}

export function installCommand(name: string, manager: "pnpm" | "npm" | "bun" = "pnpm") {
  const runner = { pnpm: "pnpm dlx", npm: "npx", bun: "bunx --bun" }[manager]
  return `${runner} shadcn@latest add @manner/${name}`
}

export const registrySetup = "pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json"
