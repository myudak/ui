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
