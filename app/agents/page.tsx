"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { InstallStrip, SiteFooter } from "@/components/system-chrome";

const prompts = [
  {
    id: "install",
    label: "01 / INSTALL",
    title: "Install Manner in an existing app",
    description: "Use this when an agent is starting with an existing React or Next.js project.",
    code: `Use Manner UI in this project.

Before writing UI:
1. Read https://ui.myudak.com/llms.txt
2. Read https://ui.myudak.com/AGENTS.md
3. Inspect components.json, app/globals.css, and the existing source tree.

Configure and use the Manner registry:
pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json

Install the closest existing components before creating anything new. Keep the
copied source in this application and report which components were reused.`,
  },
  {
    id: "restyle",
    label: "02 / RESTYLE",
    title: "Restyle an existing page",
    description: "Use this when the product behavior is correct but the interface needs Manner’s visual grammar.",
    code: `Restyle this page using Manner UI:
https://ui.myudak.com

Read these first:
- https://ui.myudak.com/DESIGN.md
- https://ui.myudak.com/MANNER_AGENT.md
- https://ui.myudak.com/r/index.json

Preserve the existing product logic and content. Reuse installed Manner source,
use semantic tokens, keep focus and keyboard behavior intact, and intentionally
transform the mobile layout. Check loading, empty, error, disabled, and overflow
states before finishing.`,
  },
  {
    id: "page",
    label: "03 / COMPOSE",
    title: "Build a new page from a block",
    description: "Use this for dashboards, readers, settings, authentication, and AI interfaces.",
    code: `Build this page with Manner UI.

First inspect the block catalog:
https://ui.myudak.com/blocks
https://ui.myudak.com/r/index.json

Choose the closest block and install its source with shadcn. Compose the page
from existing primitives instead of drawing placeholder cards. Keep the block’s
accessibility behavior, adapt the content to this product, and add the states
that the real workflow needs. Explain any intentional design-rule exception.`,
  },
  {
    id: "component",
    label: "04 / EXTEND",
    title: "Add a missing component",
    description: "Use this only after the registry and installed source do not cover the interaction.",
    code: `Add a new Manner-compatible component only if no existing item fits.

Read https://ui.myudak.com/DESIGN.md and search the registry first:
https://ui.myudak.com/r/index.json

Follow the existing source conventions and Base UI semantics. Use semantic
tokens, visible focus, accessible names, keyboard behavior, reduced-motion
support, and light/dark states. Add a real example, source view, installation
metadata, and a test. Update the registry and explain why a new primitive was
necessary.`,
  },
  {
    id: "audit",
    label: "05 / VERIFY",
    title: "Audit a page against Manner",
    description: "Use this as a final pass before shipping a design-system implementation.",
    code: `Audit this interface against Manner UI.

Use:
- https://ui.myudak.com/DESIGN.md
- https://ui.myudak.com/MANNER_AGENT.md
- https://ui.myudak.com/ai.json

Check tokens, typography, hierarchy, surfaces, borders, motion, focus states,
keyboard operation, reduced motion, responsive behavior at 360/390/768/1024/
1440px, long content, and loading/empty/error/disabled states. Fix issues that
are clearly violations, then report the remaining intentional exceptions.`,
  },
];

function PromptCard({ prompt }: { prompt: (typeof prompts)[number] }) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <article className="agent-prompt-card">
      <header>
        <div>
          <span>{prompt.label}</span>
          <h2>{prompt.title}</h2>
          <p>{prompt.description}</p>
        </div>
        <button type="button" onClick={copyPrompt}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </header>
      <CodeBlock code={prompt.code} language="text" filename={`${prompt.id}-prompt.txt`} label="prompt" />
    </article>
  );
}

export default function AgentsPage() {
  return (
    <main className="docs-route agents-route">
      <header className="route-hero agents-hero reveal-in">
        <p className="section-index">AGENTS / MACHINE-READABLE DESIGN</p>
        <h1>Give your agent<br /><i>the whole context.</i></h1>
        <p>Copyable prompts, stable URLs, registry discovery, and explicit design rules so an agent can implement Manner instead of guessing from a screenshot.</p>
        <div className="agents-hero-actions">
          <a className="primary-button" href="/llms-full.txt" download>Download full guide <ExternalLink aria-hidden="true" /></a>
          <a className="text-link" href="/ai.json">Open ai.json <span>↗</span></a>
        </div>
      </header>

      <section className="agent-surface-map reveal-in delay-1" aria-label="Agent-readable resources">
        <div className="agent-surface-intro">
          <p className="section-index">THE HANDOFF SURFACE</p>
          <h2>One URL is useful.<br /><i>A map is dependable.</i></h2>
          <p>Agents can browse the visual pages, fetch plain text, discover every registry item, and install source through the same public namespace.</p>
        </div>
        <div className="agent-resource-grid">
          <a href="/ai.json"><span>JSON / MANIFEST</span><strong>ai.json</strong><small>Capabilities, URLs, tokens, counts, and registry metadata.</small><b>↗</b></a>
          <a href="/llms.txt"><span>TEXT / COMPACT</span><strong>llms.txt</strong><small>A small entry point for models with limited context.</small><b>↗</b></a>
          <a href="/llms-full.txt"><span>TEXT / COMPLETE</span><strong>llms-full.txt</strong><small>Workflow, catalog, install commands, and full design rules.</small><b>↗</b></a>
          <a href="/r/index.json"><span>JSON / CATALOG</span><strong>r/index.json</strong><small>Discover components, blocks, dependencies, and source URLs.</small><b>↗</b></a>
          <a href="/AGENTS.md"><span>MARKDOWN / RULES</span><strong>AGENTS.md</strong><small>Repository-style instructions hosted beside the docs.</small><b>↗</b></a>
          <a href="/design"><span>VISUAL / DESIGN</span><strong>DESIGN.md</strong><small>Readable and raw design rules with a copy button.</small><b>↗</b></a>
        </div>
      </section>

      <section className="agent-prompt-section">
        <header className="route-section-heading">
          <p className="section-index">COPYABLE PROMPTS</p>
          <div><h2>Start with<br /><i>intent.</i></h2><p>These prompts point the agent to the right source before asking it to make a visual decision. They work in Codex, Claude Code, Cursor, and other coding agents with web access.</p></div>
        </header>
        <div className="agent-prompt-list">{prompts.map((prompt) => <PromptCard key={prompt.id} prompt={prompt} />)}</div>
      </section>

      <section className="agent-install-section">
        <div>
          <p className="section-index">THE SHORT VERSION</p>
          <h2>Point, then<br /><i>let it inspect.</i></h2>
          <p>For a capable coding agent, this is usually enough context to begin:</p>
        </div>
        <CodeBlock language="text" label="agent prompt" filename="manner-start.txt" code={`Use Manner UI for this project.

Website: https://ui.myudak.com
Source: https://github.com/myudak/ui
Read: https://ui.myudak.com/llms.txt

Inspect the registry and existing source first. Reuse Manner components and
blocks, follow DESIGN.md, preserve accessibility, and report exceptions.`} />
      </section>
      <InstallStrip target="@manner/agent-rules" />
      <SiteFooter />
    </main>
  );
}
