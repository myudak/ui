import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const registry = JSON.parse(await readFile(resolve(root, "public/r/registry.json"), "utf8"));
const agentManifest = JSON.parse(await readFile(resolve(root, "public/ai.json"), "utf8"));
const registryIndex = JSON.parse(await readFile(resolve(root, "public/r/index.json"), "utf8"));

test("publishes the complete Manner registry", async () => {
  const names = new Set(registry.items.map((item) => item.name));
  for (const expected of [
    "manner-theme", "button", "field", "select", "switch", "dialog", "command",
    "surface", "section-heading", "note", "quote", "timeline", "metadata",
    "message", "composer", "reasoning", "tool-call", "sources", "artifact",
    "login-01", "sidebar-01", "settings-01", "reader-01", "ai-workspace-01", "leaderboard-01", "agent-rules",
    "accordion", "badge", "calendar", "dropdown-menu", "empty", "input-group", "kbd", "popover", "sheet", "sidebar", "tabs",
  ]) assert.ok(names.has(expected), `missing registry item: ${expected}`);

  for (const item of registry.items) {
    const individual = JSON.parse(await readFile(resolve(root, `public/r/${item.name}.json`), "utf8"));
    assert.equal(individual.name, item.name);
    assert.equal(individual.type, item.type);
  }
});

test("interactive primitives keep their Base UI implementation", async () => {
  for (const name of ["button", "select", "switch", "dialog"]) {
    const item = JSON.parse(await readFile(resolve(root, `public/r/${name}.json`), "utf8"));
    assert.ok(item.dependencies.some((dependency) => dependency.startsWith("@base-ui/react")), `${name} does not declare Base UI`);
    assert.match(item.files.map((file) => file.content).join("\n"), /@base-ui\/react/);
  }
});

test("agent rules install both design constraints and operating instructions", async () => {
  const item = JSON.parse(await readFile(resolve(root, "public/r/agent-rules.json"), "utf8"));
  assert.deepEqual(item.files.map((file) => file.target).sort(), ["~/DESIGN.md", "~/MANNER_AGENT.md"]);
});

test("publishes agent discovery surfaces from the same catalog", async () => {
  assert.equal(agentManifest.name, "manner");
  assert.equal(agentManifest.registry.itemTemplate, "https://ui.myudak.com/r/{name}.json");
  assert.equal(agentManifest.counts.total, registry.items.length);
  assert.equal(registryIndex.items.length, registry.items.length);
  assert.match(await readFile(resolve(root, "public/llms.txt"), "utf8"), /https:\/\/ui\.myudak\.com\/ai\.json/);
  assert.match(await readFile(resolve(root, "public/llms-full.txt"), "utf8"), /## Visual language/);
  assert.equal(await readFile(resolve(root, "AGENTS.md"), "utf8"), await readFile(resolve(root, "public/AGENTS.md"), "utf8"));
});

const catalog = JSON.parse(await readFile(resolve(root, "registry/catalog.json"), "utf8"))
const installableFiles = registry.items
  .filter((item) => item.type !== "registry:file")
  .flatMap((item) => (item.files ?? []).map((file) => ({ item: item.name, path: file.path })))

test("registry source is self-contained: no site-only classes or 0.1 tokens", async () => {
  const legacyToken = /var\(--(canvas|surface|surface-inset|ink|ink-secondary|accent-soft|border-subtle|focus|danger|serif|sans|mono)\b/
  const siteClass = /className=(["'`{])[^>]*?\bmanner-[a-z]/
  for (const { item, path } of installableFiles) {
    const source = await readFile(resolve(root, path), "utf8")
    assert.doesNotMatch(source, legacyToken, `${item} (${path}) references a 0.1 token`)
    assert.doesNotMatch(source, siteClass, `${item} (${path}) depends on a site-only manner-* class`)
  }
})

test("every catalog component has an example, docs source, and registry item", async () => {
  const names = new Set(registry.items.map((item) => item.name))
  const exampleIndex = await readFile(resolve(root, "registry/manner/examples/index.ts"), "utf8")
  for (const component of catalog.components) {
    assert.ok(names.has(component.name), `${component.name} missing from registry.json`)
    await readFile(resolve(root, component.example), "utf8")
    assert.match(exampleIndex, new RegExp(`"${component.name}":`), `${component.name} missing from examples/index.ts`)
  }
  for (const block of catalog.blocks) assert.ok(names.has(block.name), `${block.name} missing from registry.json`)
})

test("registry dependencies resolve to published items", async () => {
  const names = new Set(registry.items.map((item) => item.name))
  for (const item of registry.items) {
    for (const dependency of item.registryDependencies ?? []) {
      assert.ok(names.has(dependency.replace("@manner/", "")), `${item.name} depends on unknown ${dependency}`)
    }
  }
})

test("theme publishes shadcn-standard tokens and Manner extensions in both modes", async () => {
  const theme = JSON.parse(await readFile(resolve(root, "public/r/manner-theme.json"), "utf8"))
  for (const mode of ["light", "dark"]) {
    for (const token of ["background", "foreground", "primary", "muted", "muted-foreground", "accent", "border", "ring", "destructive", "brand", "success", "warning"]) {
      assert.ok(theme.cssVars[mode][token], `${mode} theme is missing --${token}`)
    }
  }
  assert.equal(theme.cssVars.light.canvas, "var(--background)", "0.1 alias --canvas should map to --background")
})
