import registry from "@/registry.json"

type RegistryItem = {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
}

const items = registry.items as RegistryItem[]

export function getRegistryItem(name: string) {
  return items.find((item) => item.name === name)
}

/** Named exports of a source file, for the generated import snippet. */
export function exportsOf(source: string) {
  const block = source.match(/export \{([^}]+)\}/)
  const names = block
    ? block[1].split(",").map((name) => name.trim()).filter((name) => name && !name.startsWith("type "))
    : [...source.matchAll(/export (?:function|const) (\w+)/g)].map((match) => match[1])
  return names.filter((name) => /^[A-Z]/.test(name))
}
