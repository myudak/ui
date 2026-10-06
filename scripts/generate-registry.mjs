// Builds registry.json from registry/catalog.json.
// - registryDependencies and npm dependencies are derived from each file's imports.
// - The manner-theme item is read from app/globals.css so the site and registry never drift.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const read = (path) => readFile(resolve(root, path), "utf8")

const catalog = JSON.parse(await read("registry/catalog.json"))
const pkg = JSON.parse(await read("package.json"))
const versions = { ...pkg.devDependencies, ...pkg.dependencies }
const css = await read("app/globals.css")

function parseVars(selector) {
  const block = css.match(new RegExp(`^${selector.replace(".", "\\.")} \\{([\\s\\S]*?)^\\}`, "m"))
  if (!block) throw new Error(`Missing ${selector} block in app/globals.css`)
  return Object.fromEntries([...block[1].matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]))
}

const light = parseVars(":root")
const dark = parseVars(".dark")
const extraColors = ["brand", "brand-foreground", "brand-soft", "success", "warning"]

const legacyAliases = {
  canvas: "var(--background)",
  surface: "var(--card)",
  "surface-inset": "var(--muted)",
  ink: "var(--foreground)",
  "ink-secondary": "color-mix(in oklch, var(--foreground) 80%, transparent)",
  "accent-soft": "var(--brand-soft)",
  "border-subtle": "var(--border)",
  focus: "var(--ring)",
  danger: "var(--destructive)",
}

const theme = {
  name: "manner-theme",
  type: "registry:theme",
  title: "Manner Theme",
  description:
    "Warm editorial tokens on shadcn's standard variable names, plus brand, success, and warning. Includes 0.1 aliases (canvas, ink, surface…) for one release.",
  dependencies: ["tw-animate-css"],
  cssVars: {
    theme: {
      "font-heading": '"Fraunces Variable", Fraunces, "Iowan Old Style", Georgia, serif',
      ...Object.fromEntries(extraColors.map((name) => [`color-${name}`, `var(--${name})`])),
    },
    light: { ...light, ...legacyAliases },
    dark,
  },
}

const ignoredPackages = new Set(["react", "react-dom"])

function packageName(specifier) {
  const parts = specifier.split("/")
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

async function analyze(path, themed = true) {
  const source = await read(path)
  const registryDependencies = new Set(themed ? ["@manner/manner-theme"] : [])
  const dependencies = new Set()
  for (const [, specifier] of source.matchAll(/from\s+"([^"]+)"/g)) {
    if (specifier === "@/lib/cn") registryDependencies.add("@manner/utils")
    else if (specifier.startsWith("@/registry/manner/")) registryDependencies.add(`@manner/${specifier.split("/").pop()}`)
    else if (!specifier.startsWith(".") && !specifier.startsWith("@/")) {
      const name = packageName(specifier)
      if (ignoredPackages.has(name)) continue
      if (!versions[name]) throw new Error(`${path} imports ${name}, which is not in package.json`)
      dependencies.add(`${name}@${versions[name]}`)
    }
  }
  return {
    ...(dependencies.size ? { dependencies: [...dependencies].sort() } : {}),
    ...(registryDependencies.size ? { registryDependencies: [...registryDependencies].sort() } : {}),
  }
}

const fileType = { ui: "registry:ui", block: "registry:block", hook: "registry:hook" }

async function item({ name, title, description, file }, type, extra = {}) {
  return {
    name,
    type: fileType[type],
    title,
    description,
    ...extra,
    ...(await analyze(file, type !== "hook")),
    files: [{ path: file, type: fileType[type] }],
  }
}

const items = [
  theme,
  {
    name: "utils",
    type: "registry:lib",
    title: "Class Name Utility",
    description: "Merges conditional Tailwind class names safely.",
    dependencies: [`clsx@${versions.clsx}`, `tailwind-merge@${versions["tailwind-merge"]}`],
    files: [{ path: "lib/cn.ts", type: "registry:lib" }],
  },
  await item(
    { name: "use-mobile", title: "useIsMobile", description: "Tracks whether the viewport is below the mobile breakpoint.", file: "registry/manner/hooks/use-mobile.ts" },
    "hook"
  ),
  ...(await Promise.all(catalog.components.map((entry) => item(entry, "ui", { categories: [entry.group.toLowerCase()] })))),
  ...(await Promise.all(catalog.internal.map((entry) => item(entry, "ui")))),
  ...(await Promise.all(catalog.blocks.map((entry) => item(entry, "block", { categories: [entry.category.toLowerCase()] })))),
  {
    name: "agent-rules",
    type: "registry:file",
    title: "Manner Agent Rules",
    description: "Installs DESIGN.md and MANNER_AGENT.md so coding agents follow the Manner visual grammar.",
    files: [
      { path: "public/DESIGN.md", type: "registry:file", target: "~/DESIGN.md" },
      { path: "public/MANNER_AGENT.md", type: "registry:file", target: "~/MANNER_AGENT.md" },
    ],
  },
]

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "manner",
  homepage: "https://ui.myudak.com",
  items,
}

// shadcn build never removes old output; clear it so renamed items do not linger.
await rm(resolve(root, "public/r"), { recursive: true, force: true })
await mkdir(resolve(root, "public/r"), { recursive: true })
await writeFile(resolve(root, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`)
console.log(`registry.json: ${items.length} items`)
