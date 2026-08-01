"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { designSource } from "../component-source.generated";
import { BlueprintMark, InstallStrip, SiteFooter } from "@/components/system-chrome";

const designRulesFallback = `# Manner Interface Rules

Manner is a warm, editorial interface system for thoughtful software.
It is independent and is not affiliated with Anthropic or Claude.

## Product feeling

Interfaces should feel literate, calm, curious, competent, warm, and slightly unconventional.
They should never feel corporate-luxury, faux-vintage, overly cute, or generically AI-generated.

## Non-negotiable rules

- Use semantic design tokens. Do not add arbitrary color values inside components.
- Search existing components and blocks before creating a new primitive.
- Use visible surfaces only when grouping requires a container.
- Do not wrap every section, statistic, or list item in a card.
- Use serif typography only for major titles, quotes, selected numbers, and editorial emphasis.
- Use sans-serif typography for controls, forms, tables, and dense reading.
- Use monospace for metadata, code, keyboard hints, timestamps, and system state.
- Use thin borders and tonal contrast before shadows.
- Keep control radii small to medium. Pills are reserved for status, tags, and compact filters.
- Motion must explain state, continuity, hierarchy, or origin.
- Every interaction needs visible keyboard focus and an accessible name.
- Design mobile layouts intentionally. Do not merely shrink desktop grids.
- Respect prefers-reduced-motion.

## Semantic tokens

Use these roles instead of component-specific colors:

- canvas: the page background
- surface: the primary content surface
- surface-raised: temporary elevated UI
- surface-inset: navigation and secondary regions
- ink: primary text
- ink-secondary: supporting text
- ink-muted: metadata and low-priority information
- accent: primary action and editorial emphasis
- accent-soft: selected and quiet accent surfaces
- border-subtle: internal separation
- border: control and container boundaries
- border-strong: high-emphasis separation
- focus: keyboard focus ring
- success, warning, danger, info: semantic state

## Typography

Display: Fraunces Variable, approximately weight 420.
Interface and body: Geist or Inter Variable.
Code and metadata: IBM Plex Mono.

- Keep long-form body measure between 58 and 72 characters.
- Use line-height 1.55–1.75 for prose.
- Never use serif for tiny labels, dense tables, or code-adjacent UI.
- Limit uppercase labels; add tracking when used.

## Shape and elevation

- xs radius: 4px
- sm radius: 6px
- md radius: 10px
- lg radius: 14px
- xl radius: 20px, only for major canvases
- round: status indicators and truly circular controls only

Most content grouping uses no shadow. Menus may use lift-1. Dialogs may use lift-2.
Do not place giant blurred shadows behind normal cards.

## Motion vocabulary

- enter-soft: content enters with short opacity and vertical transition
- exit-soft: reverse of enter-soft
- reveal-line: borders or progress lines expose structure
- shift-active: selection moves between related options
- expand-panel: drawers, sheets, and side panels preserve spatial origin
- swap-content: related content changes without dramatic movement
- press-control: immediate tactile feedback for controls

Micro-interactions: 100–160ms.
Menus and overlays: 140–220ms.
Panels and layout changes: 180–300ms.
Hover translation: normally 1–2px maximum.
Avoid bounce and decorative zoom by default.

## Responsive behavior

Validate at 360, 390, 768, 1024, and 1440 pixels.

- Sidebars become sheets, tabs, or compact selectors based on task frequency.
- Multi-panel AI interfaces show one primary panel at a time on small screens.
- Keep essential actions visible without hover.
- Preserve readable text measure.
- Tables should prioritize columns or transform into meaningful rows.
- Graphs need touch-safe controls and a non-visual alternative.

## Accessibility

Target WCAG 2.2 AA.

- Full keyboard operation
- Visible focus
- Accessible names for icon controls
- Correct field labels, descriptions, and error relationships
- No state communicated by color alone
- Logical DOM and focus order
- Dialog focus trapping and restoration
- Reduced-motion support
- Reflow without loss of function at 400% zoom

## Avoid

- arbitrary colors inside components
- generic gradients and gradient text
- glassmorphism for ordinary surfaces
- giant centered hero followed by three generic cards
- nested card inside card inside card
- every control rendered as a pill
- decorative motion that delays interaction
- low-contrast beige-on-beige text
- fixed-height content that clips user text or localization
- icon-only actions without labels

## Agent workflow

1. Inspect the existing application structure and tokens.
2. Reuse Manner components before creating new primitives.
3. Choose a composition based on the user task, not visual novelty.
4. Implement loading, empty, error, disabled, and overflow states where applicable.
5. Verify keyboard use, visible focus, reduced motion, and mobile transformation.
6. Explain any intentional exception to these rules.
7. Update documentation and tests when component behavior changes.

## Definition of done

A stable component has semantic tokens, light and dark modes, keyboard tests,
accessible state, visible focus, reduced motion, mobile behavior, long-content
coverage, relevant loading/error/empty states, documentation, and real usage in
at least one application composition.`;

const designRules = designSource || designRulesFallback;

const designSections = [
  "Product feeling",
  "Non-negotiable rules",
  "Semantic tokens",
  "Typography",
  "Shape and elevation",
  "Motion vocabulary",
  "Responsive behavior",
  "Accessibility",
  "Avoid",
  "Agent workflow",
  "Definition of done",
];

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function DesignPage() {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"read" | "raw">("read");

  async function copyRules() {
    await navigator.clipboard.writeText(designRules);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="docs-route design-route">
      <header className="route-hero route-hero-blueprint reveal-in">
        <div><p className="section-index">AGENT GUIDE / DESIGN.MD</p><h1>Give your agent<br/><i>the taste constraints.</i></h1><p>Install these rules before asking an agent to build the interface. The registry provides the visual grammar, agent workflow, real component source, and application blocks as one inspectable system.</p><div className="design-actions">
          <button className="primary-button" onClick={copyRules}>{copied ? "Copied DESIGN.md ✓" : "Copy DESIGN.md"}</button>
          <a className="text-link" href="/DESIGN.md" download>Download raw file <span>↓</span></a>
        </div></div><BlueprintMark compact />
      </header>
      <section className="design-reader reveal-in delay-1">
        <aside>
          <p>ON THIS FILE <small>{designSections.length} sections</small></p>
          {designSections.map((item, index) => <a key={item} href={`#${sectionId(item)}`}>{String(index + 1).padStart(2, "0")} · {item.replace(" vocabulary", "")}</a>)}
          <div className="design-quick-actions"><span>QUICK ACTIONS</span><button onClick={copyRules}>□ Copy prompt</button><a href="#agent-workflow">↗ Agent workflow</a></div>
        </aside>
        <article>
          <header>
            <div><span>●</span><strong>DESIGN.md</strong><small>4.8 KB · v0.1</small></div>
            <div><button className={mode === "read" ? "active" : ""} onClick={() => setMode("read")}>Read</button><button className={mode === "raw" ? "active" : ""} onClick={() => setMode("raw")}>Raw</button><button className="design-inline-copy" onClick={copyRules}>{copied ? "Copied ✓" : "Copy file"}</button></div>
          </header>
          {mode === "raw" ? <CodeBlock code={designRules} language="markdown" label="markdown" filename="DESIGN.md" /> : <div className="rendered-design">{designRules.split("\n\n").map((paragraph, index) => paragraph.startsWith("# ") ? null : paragraph.startsWith("## ") ? <h2 id={sectionId(paragraph.slice(3))} key={index}><small>{String(designSections.indexOf(paragraph.slice(3)) + 1).padStart(2,"0")}</small>{paragraph.slice(3)}</h2> : paragraph.startsWith("-") ? <ul key={index}>{paragraph.split("\n").map((line) => <li key={line}>{line.slice(2)}</li>)}</ul> : paragraph.match(/^\d\./) ? <ol key={index}>{paragraph.split("\n").map((line) => <li key={line}>{line.replace(/^\d+\. /, "")}</li>)}</ol> : <p key={index}>{paragraph}</p>)}</div>}
        </article>
        <nav className="design-progress-rail" aria-label="Document progress"><a href="#product-feeling">↑</a><span>01 / {designSections.length}</span>{designSections.map((item, index)=><a key={item} href={`#${sectionId(item)}`} aria-label={item}>{index===0?"●":"○"}</a>)}<a href="#definition-of-done">↓</a></nav>
      </section>
      <section className="agent-install-flow">
        <p className="section-index">HOW AGENTS USE IT</p>
        <div><article><span>01</span><h3>Connect</h3><p>Add the @manner registry namespace to components.json.</p></article><article><span>02</span><h3>Install rules</h3><p>Add agent-rules so DESIGN.md and the workflow live beside the code.</p></article><article><span>03</span><h3>Add source</h3><p>The agent installs components or blocks, then adapts the owned files.</p></article><article><span>04</span><h3>Verify</h3><p>Test focus, states, motion, and responsive transformation.</p></article></div>
        <CodeBlock language="bash" label="terminal" filename="Agent setup" showLineNumbers={false} code={`pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json\npnpm dlx shadcn@latest add @manner/agent-rules\npnpm dlx shadcn@latest add @manner/button\n\n# Agent prompt\nRead DESIGN.md and MANNER_AGENT.md before changing UI. Reuse installed Manner source and report intentional exceptions.`} />
      </section>
      <InstallStrip target="@manner/agent-rules" />
      <SiteFooter />
    </main>
  );
}
