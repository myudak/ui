"use client";

import { useState } from "react";
import { Mark } from "./site-header";
import { componentSource } from "./component-source.generated";
import { CodeBlock } from "@/components/code-block";
import { Artifact } from "@/registry/manner/ai/artifact";
import { Composer } from "@/registry/manner/ai/composer";
import { Message } from "@/registry/manner/ai/message";
import { Reasoning } from "@/registry/manner/ai/reasoning";
import { Sources } from "@/registry/manner/ai/sources";
import { ToolCall } from "@/registry/manner/ai/tool-call";
import { Metadata } from "@/registry/manner/editorial/metadata";
import { Note } from "@/registry/manner/editorial/note";
import { Quote } from "@/registry/manner/editorial/quote";
import { SectionHeading } from "@/registry/manner/editorial/section-heading";
import { Surface } from "@/registry/manner/editorial/surface";
import { Timeline } from "@/registry/manner/editorial/timeline";
import { Button } from "@/registry/manner/ui/button";
import { Command } from "@/registry/manner/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/registry/manner/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/registry/manner/ui/field";
import { Input } from "@/registry/manner/ui/input";
import { Textarea } from "@/registry/manner/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/manner/ui/select";
import { Switch } from "@/registry/manner/ui/switch";

function Icon({ name }: { name: "copy" | "sun" | "moon" | "menu" | "arrow" | "check" }) {
  const paths = {
    copy: <><rect x="8" y="8" width="10" height="10" rx="1"/><path d="M6 14H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1"/></>,
    sun: <><circle cx="11" cy="11" r="3.5"/><path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.6 4.6 6 6M16 16l1.4 1.4M17.4 4.6 16 6M6 16l-1.4 1.4"/></>,
    moon: <path d="M18 14.7A7.6 7.6 0 0 1 7.3 4 7.7 7.7 0 1 0 18 14.7Z"/>,
    menu: <path d="M3 6h16M3 11h16M3 16h16"/>,
    arrow: <path d="m7 4 7 7-7 7M14 11H2"/>,
    check: <path d="m4 11 4 4L18 5"/>,
  };
  return <svg viewBox="0 0 22 22" aria-hidden="true" className="icon">{paths[name]}</svg>;
}

const componentSets = {
  Foundations: ["Button", "Field", "Select", "Switch", "Dialog", "Command"],
  Editorial: ["Surface", "Section heading", "Note", "Quote", "Timeline", "Metadata"],
  "AI interfaces": ["Message", "Composer", "Reasoning", "Tool call", "Sources", "Artifact"],
};

const componentRegistryNames: Record<string, string> = {
  Button: "button", Field: "field", Select: "select", Switch: "switch", Dialog: "dialog", Command: "command",
  Surface: "surface", "Section heading": "section-heading", Note: "note", Quote: "quote", Timeline: "timeline", Metadata: "metadata",
  Message: "message", Composer: "composer", Reasoning: "reasoning", "Tool call": "tool-call", Sources: "sources", Artifact: "artifact",
};

const componentMeta: Record<string, { description: string; code: string }> = {
  Button: { description: "A semantic action with restrained, purposeful variants.", code: `<Button variant="primary">Save changes</Button>\n<Button variant="outline">Preview</Button>\n<Button variant="ghost">Cancel</Button>` },
  Field: { description: "Labels, descriptions, and errors that stay correctly associated.", code: `<Field>\n  <FieldLabel>Project name</FieldLabel>\n  <Input defaultValue="Margin notes" />\n  <FieldDescription>Shown to collaborators.</FieldDescription>\n</Field>` },
  Select: { description: "A compact choice control with clear focus and selected state.", code: `<Select defaultValue="editorial">\n  <SelectTrigger aria-label="Style preset" />\n  <SelectContent>\n    <SelectItem value="editorial">Editorial warm</SelectItem>\n  </SelectContent>\n</Select>` },
  Switch: { description: "A binary setting with visible text, state, and keyboard focus.", code: `<Field orientation="horizontal">\n  <FieldLabel>Reduced motion</FieldLabel>\n  <Switch defaultChecked />\n</Field>` },
  Dialog: { description: "A focused temporary layer with an explicit decision path.", code: `<Dialog>\n  <DialogTrigger render={<Button />}>Edit profile</DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Edit profile</DialogTitle>\n    <DialogDescription>Update how others see you.</DialogDescription>\n  </DialogContent>\n</Dialog>` },
  Command: { description: "Fast keyboard-first navigation across product actions.", code: `<Command>\n  <CommandInput placeholder="Type a command…" />\n  <CommandList>\n    <CommandItem>Open component</CommandItem>\n    <CommandItem>Copy install command</CommandItem>\n  </CommandList>\n</Command>` },
  Surface: { description: "Semantic visual grouping without turning every section into a card.", code: `<Surface tone="inset">\n  <SurfaceHeader>Release readiness</SurfaceHeader>\n  <SurfaceContent>Three checks remaining.</SurfaceContent>\n</Surface>` },
  "Section heading": { description: "Editorial hierarchy for the beginning of a meaningful section.", code: `<SectionHeading\n  eyebrow="Foundations"\n  title="Structure before decoration."\n  description="Every visual decision should explain the content."\n/>` },
  Note: { description: "A restrained aside for useful context that should not interrupt the flow.", code: `<Note title="Design with the content">\n  Use a surface only when the grouping truly needs one.\n</Note>` },
  Quote: { description: "A quotation with strong reading rhythm and unambiguous attribution.", code: `<Quote cite="Design principle 05">\n  Restraint is a feature.\n</Quote>` },
  Timeline: { description: "A compact history for decisions, releases, and project progress.", code: `<Timeline>\n  <TimelineItem date="Today" title="Registry validated" />\n  <TimelineItem date="Yesterday" title="Tokens approved" />\n</Timeline>` },
  Metadata: { description: "Dense supporting facts that remain scannable and calm.", code: `<Metadata items={[\n  { label: "Status", value: "Stable" },\n  { label: "Primitive", value: "Base UI" },\n]} />` },
  Message: { description: "Conversation content with clear authorship, actions, and readable measure.", code: `<Message from="assistant">\n  <MessageContent>Three patterns match this intent.</MessageContent>\n  <MessageActions><Button variant="ghost">Copy</Button></MessageActions>\n</Message>` },
  Composer: { description: "A flexible prompt input that grows with the thought, not the chrome.", code: `<Composer onSubmit={send}>\n  <ComposerInput placeholder="Ask Manner…" />\n  <ComposerAction aria-label="Send" />\n</Composer>` },
  Reasoning: { description: "Progressive disclosure for model reasoning and intermediate work.", code: `<Reasoning defaultOpen>\n  <ReasoningTrigger>How this was decided</ReasoningTrigger>\n  <ReasoningContent>Compared hierarchy and interaction cost.</ReasoningContent>\n</Reasoning>` },
  "Tool call": { description: "A legible operational state for tools, arguments, and results.", code: `<ToolCall name="registry.search" status="complete">\n  Found 6 compatible components\n</ToolCall>` },
  Sources: { description: "Evidence and references shown with useful origin context.", code: `<Sources items={[\n  { title: "Registry specification", domain: "ui.shadcn.com", href: docsUrl },\n  { title: "Accessibility guidance", domain: "w3.org", href: wcagUrl },\n]} />` },
  Artifact: { description: "A focused output surface that remains connected to its conversation.", code: `<Artifact title="DESIGN.md" type="Markdown">\n  <pre>{content}</pre>\n</Artifact>` },
};

function ComponentPreview({ name, disabled, compact }: { name: string; disabled: boolean; compact: boolean }) {
  const [on, setOn] = useState(true);
  const [composerValue, setComposerValue] = useState("Build a responsive settings workspace");
  const [sent, setSent] = useState(false);
  const densityClass = compact ? "is-compact" : "";

  return (
    <div className={`production-preview ${densityClass}`}>
      {name === "Button" && <div className="button-showcase"><Button disabled={disabled}>Save changes</Button><Button disabled={disabled} variant="outline">Preview</Button><Button disabled={disabled} variant="ghost">Cancel</Button><Button disabled={disabled} variant="danger">Delete</Button></div>}
      {name === "Field" && <Field><FieldLabel htmlFor="project-name">Project name</FieldLabel><Input id="project-name" disabled={disabled} defaultValue="Margin notes"/><FieldDescription>Shown to collaborators in shared workspaces.</FieldDescription></Field>}
      {name === "Select" && <Field><FieldLabel>Style preset</FieldLabel><Select defaultValue="warm" disabled={disabled}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="warm">Editorial warm</SelectItem><SelectItem value="quiet">Quiet neutral</SelectItem><SelectItem value="dense">Dense product</SelectItem></SelectContent></Select><FieldDescription>The selected preset updates semantic tokens.</FieldDescription></Field>}
      {name === "Switch" && <div className="settings-card"><div><strong>Respect reduced motion</strong><p>Simplify nonessential transitions automatically.</p></div><Switch disabled={disabled} checked={on} onCheckedChange={setOn} aria-label="Respect reduced motion"/></div>}
      {name === "Dialog" && <Dialog><DialogTrigger render={<Button disabled={disabled}/>}>Edit profile</DialogTrigger><DialogContent><span className="micro-label">PROFILE / PUBLIC</span><DialogTitle>Edit your profile</DialogTitle><DialogDescription>Change how your name and short biography appear to collaborators.</DialogDescription><Field className="mt-5"><FieldLabel htmlFor="display-name">Display name</FieldLabel><Input id="display-name" defaultValue="Yuda"/></Field><div className="mt-6 flex justify-end gap-2"><Button variant="ghost">Cancel</Button><Button>Save changes</Button></div></DialogContent></Dialog>}
      {name === "Command" && <Command items={[{id:"components",label:"Open component library",description:"Browse production primitives"},{id:"install",label:"Copy install command",description:"Add through the @manner registry"},{id:"theme",label:"Switch to dark theme"},{id:"rules",label:"View agent rules"}]} />}
      {name === "Surface" && <Surface tone="inset"><span className="micro-label">RELEASE READINESS</span><h4 className="my-3 font-[family-name:var(--serif)] text-2xl">Three checks remaining</h4><p className="m-0 text-sm leading-relaxed text-[var(--ink-secondary)]">Keyboard, contrast, and clean-install verification are still open.</p></Surface>}
      {name === "Section heading" && <SectionHeading eyebrow="Foundations / 02" title={<>Structure before <i className="font-normal text-[var(--accent)]">decoration.</i></>} description="Every border, surface, and motion decision should make the content easier to understand." action={<Button variant="outline">Read principles</Button>}/>}
      {name === "Note" && <Note title="Design with the content, not around it.">Use a visible surface only when the grouping needs one. Let spacing and typography do most of the structural work.</Note>}
      {name === "Quote" && <Quote cite="Design principle 05 — Restraint">One memorable typographic gesture is better than five decorative effects.</Quote>}
      {name === "Timeline" && <Timeline items={[{date:"Today · 14:24",title:"Registry validated",description:"All component metadata passed schema checks."},{date:"Yesterday",title:"Warm-dark tokens approved",description:"Contrast pairs verified at AA."},{date:"30 July",title:"First composition shipped"}]}/>}
      {name === "Metadata" && <Metadata items={[{label:"Status",value:"● Stable"},{label:"Primitive",value:"Base UI"},{label:"Registry",value:"@manner/metadata"},{label:"Keyboard",value:"Verified"},{label:"Updated",value:"2 Aug 2026"}]}/>}
      {name === "Message" && <div className="grid gap-5"><Message from="user">Which surface pattern fits a documentation reader?</Message><Message from="assistant" actions={<><button>Copy</button><button>Useful</button></>}>Use one primary reading surface and let the outline sit directly on the canvas. Reserve a raised panel for temporary notes or artifacts.</Message></div>}
      {name === "Composer" && <div><Composer disabled={disabled} value={composerValue} onValueChange={setComposerValue} onSubmit={() => { setSent(true); setComposerValue(""); }}/>{sent && <p className="sent-state">Prompt sent to the workspace.</p>}</div>}
      {name === "Reasoning" && <Reasoning open title="How this was decided" summary="3 steps"><ol className="m-0 grid gap-2 pl-5"><li>Compared information density and reading measure.</li><li>Removed surfaces that did not express hierarchy.</li><li>Verified the mobile transformation preserves actions.</li></ol></Reasoning>}
      {name === "Tool call" && <ToolCall name="registry.search" status="complete" duration="420ms"><code>{`{ query: "editorial reader", limit: 6 }`}</code><p className="mb-0">✓ Found 6 compatible components</p></ToolCall>}
      {name === "Sources" && <Sources items={[{title:"Registry specification",domain:"ui.shadcn.com",href:"https://ui.shadcn.com/docs/registry"},{title:"WCAG 2.2 quick reference",domain:"w3.org",href:"https://www.w3.org/WAI/WCAG22/quickref/"},{title:"Base UI primitives",domain:"base-ui.com",href:"https://base-ui.com/react/overview/about"}]}/>}
      {name === "Artifact" && <Artifact title="DESIGN.md" type="Markdown"><pre className="m-0 whitespace-pre-wrap">{`# Interface direction\n\nBuild for reading first.\nUse semantic tokens only.\n\n## Required states\n- keyboard focus\n- reduced motion`}</pre></Artifact>}
    </div>
  );
}
function categoryForComponent(name: string): keyof typeof componentSets {
  return (Object.keys(componentSets) as Array<keyof typeof componentSets>).find((group) => componentSets[group].includes(name)) ?? "Editorial";
}

function ComponentShowcase({ onInspect }: { onInspect: (name: string) => void }) {
  const [motion, setMotion] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [goalCreated, setGoalCreated] = useState(false);
  const [activeNav, setActiveNav] = useState("Analytics");
  const [payout, setPayout] = useState(82);
  const [message, setMessage] = useState("Build a calm research workspace");
  const [sentMessage, setSentMessage] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="component-page component-showcase-page">
      <header className="showcase-heading"><div><span className="component-breadcrumb">COMPONENT SHOWCASE <b>/</b> LIVE</span><h2>The system,<br/><i>under pressure.</i></h2><p>Real controls and product compositions—not decorative placeholders. Interact with them, then open the underlying component or block.</p></div><div><strong>18</strong><span>components</span><strong>06</strong><span>blocks</span></div></header>

      <section className="showcase-mosaic" aria-label="Interactive component showcase">
        <article className="showcase-card showcase-controls">
          <header><span>PRIMITIVES / CONTROLS</span><button onClick={() => onInspect("Button")}>Open docs ↗</button></header>
          <div className="showcase-button-row"><Button>Continue →</Button><Button variant="outline">Secondary</Button><Button variant="ghost">Quiet</Button></div>
          <label><span>Project name</span><Input defaultValue="Margin notes" /></label>
          <label><span>Message</span><Textarea defaultValue="Write with clarity, then remove what the interface does not need." /></label>
          <div className="showcase-control-row"><span className="showcase-badge">STABLE</span><label><input type="checkbox" defaultChecked/> Selected</label><Switch checked={motion} onCheckedChange={setMotion} aria-label="Motion enabled"/></div>
        </article>

        <article className="showcase-card showcase-activity">
          <header><div><span>ACTIVITY</span><h3>Contribution history</h3><p>{selectedMonth} is selected · last 5 months</p></div><button onClick={() => onInspect("Timeline")}>↗</button></header>
          <div className="showcase-bars">{[["Dec",48],["Jan",76],["Feb",58],["Mar",82],["Apr",40]].map(([month,value]) => <button key={month} className={selectedMonth === month ? "active" : ""} onClick={() => setSelectedMonth(String(month))}><i style={{height: `${value}%`}}/><span>{month}</span></button>)}</div>
          <div className="showcase-activity-meta"><div><span>UPCOMING</span><strong>12 Aug</strong><small>System review</small></div><div><span>STATUS</span><strong>On track</strong><small>3 checks remain</small></div></div>
        </article>

        <article className="showcase-card showcase-goal">
          <header><span>FORM COMPOSITION</span><button onClick={() => onInspect("Field")}>Open docs ↗</button></header>
          <h3>{goalCreated ? "Milestone created." : "Set a new milestone"}</h3><p>{goalCreated ? "Your target is now visible in the planning workspace." : "Define the outcome, amount, and date. Keep the decision path explicit."}</p>
          {!goalCreated ? <form onSubmit={(event) => { event.preventDefault(); setGoalCreated(true); }}><label>Goal name<input defaultValue="Publish the component registry"/></label><div><label>Target<input defaultValue="18 components"/></label><label>Target date<input type="date" defaultValue="2026-08-28"/></label></div><button className="demo-button primary" type="submit">Create milestone</button><button className="demo-button ghost" type="button">Cancel</button></form> : <button className="demo-button outline" onClick={() => setGoalCreated(false)}>Create another</button>}
        </article>

        <article className="showcase-card showcase-nav-card">
          <header><span>APPLICATION NAV</span><a href="/blocks">View block ↗</a></header>
          <div className="showcase-mini-brand"><span>M</span><strong>Manner Studio</strong></div>
          <nav aria-label="Showcase navigation">{[["Overview","○"],["Analytics","▥"],["Library","◇"],["Review","↗"]].map(([item,glyph]) => <button key={item} className={activeNav === item ? "active" : ""} onClick={() => setActiveNav(item)}><span>{glyph}</span>{item}</button>)}</nav>
          <footer><span className="status-dot"/> {activeNav} workspace active</footer>
        </article>

        <article className="showcase-card showcase-balance">
          <header><span>DATA / SURFACE</span><button onClick={() => onInspect("Metadata")}>Open docs ↗</button></header>
          <p>RELEASE READINESS</p><strong className="showcase-big-number">82%</strong><span className="showcase-status">● READY FOR REVIEW</span>
          <div className="showcase-progress"><i/></div>
          <dl><div><dt>Components</dt><dd>18 stable</dd></div><div><dt>Blocks</dt><dd>6 compositions</dd></div><div><dt>Open checks</dt><dd>3 remaining</dd></div></dl>
        </article>

        <article className="showcase-card showcase-payout">
          <header><span>SETTINGS / RANGE</span><button onClick={() => onInspect("Select")}>Open docs ↗</button></header>
          <h3>Quality threshold</h3><p>Set the minimum completion required before a component can be marked stable.</p>
          <label>Review standard<select defaultValue="aa"><option value="aa">WCAG 2.2 AA</option><option value="aaa">WCAG 2.2 AAA</option><option value="custom">Custom checklist</option></select></label>
          <div className="showcase-range-label"><span>Minimum score</span><strong>{payout}%</strong></div><input aria-label="Minimum quality score" type="range" min="50" max="100" value={payout} onChange={(event) => setPayout(Number(event.target.value))}/><div className="showcase-range-ends"><span>50</span><span>100</span></div>
        </article>

        <article className="showcase-card showcase-ai">
          <header><div><span>AI INTERFACE</span><h3>New conversation</h3><p>Composer, message, and artifact states.</p></div><button onClick={() => onInspect("Composer")}>↗</button></header>
          <div className="showcase-chat-body">{sentMessage ? <><div className="showcase-user-message">{sentMessage}</div><div className="showcase-assistant-message"><span>M</span><p>I’d start with one persistent outline, a primary reading surface, and an artifact drawer that replaces the third column on mobile.</p></div></> : <div className="showcase-chat-empty"><span>✦</span><strong>What are we making?</strong><p>Describe a product task and Manner will choose an appropriate composition.</p></div>}</div>
          <form onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setSentMessage(message); setMessage(""); } }}><input aria-label="Message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask Manner…"/><button aria-label="Send message" type="submit">↑</button></form>
        </article>

        <article className="showcase-card showcase-login">
          <header><span>AUTHENTICATION BLOCK</span><a href="/blocks">View block ↗</a></header>
          <div className="showcase-login-mark">M</div><h3>{signedIn ? "Welcome back, Yuda." : "Return to the workspace."}</h3><p>{signedIn ? "Your editorial workspace is ready." : "A focused sign-in flow without generic card soup."}</p>
          {!signedIn ? <form onSubmit={(event) => { event.preventDefault(); setSignedIn(true); }}><input aria-label="Email" type="email" defaultValue="yuda@example.com"/><input aria-label="Password" type="password" defaultValue="manner123"/><button type="submit">Sign in</button></form> : <button className="demo-button outline" onClick={() => setSignedIn(false)}>Sign out</button>}
        </article>

        <article className="showcase-card showcase-leaderboard">
          <header><span>DENSE DATA BLOCK</span><a href="/blocks">View block ↗</a></header>
          <h3>Component adoption</h3><p>Used across three product compositions.</p>
          <div className="showcase-table"><div><span>01</span><strong>Button</strong><em>18 uses</em><i>↗ 4</i></div><div><span>02</span><strong>Surface</strong><em>14 uses</em><i>↗ 2</i></div><div><span>03</span><strong>Composer</strong><em>9 uses</em><i>→ 0</i></div><div><span>04</span><strong>Timeline</strong><em>7 uses</em><i>↗ 1</i></div></div>
        </article>

        <article className="showcase-card showcase-editorial">
          <header><span>EDITORIAL PRIMITIVES</span><button onClick={() => onInspect("Quote")}>Open docs ↗</button></header>
          <blockquote>“The best design system does not make every product identical. It makes every decision legible.”</blockquote><cite>— Manner principle 04</cite>
          <div className="showcase-note"><span>✦</span><p><strong>Restraint is a feature.</strong><br/>Use one memorable typographic gesture instead of five decorative effects.</p></div>
        </article>
      </section>
    </div>
  );
}

export function ComponentLab({ initialSelected = "Note", variant = "embedded" }: { initialSelected?: string; variant?: "embedded" | "docs" }) {
  const [category, setCategory] = useState<keyof typeof componentSets>(() => categoryForComponent(initialSelected));
  const [selected, setSelected] = useState(initialSelected);
  const [view, setView] = useState<"preview" | "usage" | "source">("preview");
  const [disabled, setDisabled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [installCopied, setInstallCopied] = useState(false);
  const docsMode = variant === "docs";
  const [showcase, setShowcase] = useState(docsMode);
  const componentList = Object.values(componentSets).flat();
  const selectedIndex = componentList.indexOf(selected);
  const registryName = componentRegistryNames[selected];
  const installCommand = `pnpm dlx shadcn@latest add @manner/${registryName}`;

  function chooseCategory(next: keyof typeof componentSets) {
    setCategory(next);
    setSelected(componentSets[next][0]);
    setView("preview");
  }

  function chooseComponent(item: string) {
    setShowcase(false);
    setCategory(categoryForComponent(item));
    setSelected(item);
    setView("preview");
    setDisabled(false);
  }

  async function copyComponentInstall() {
    await navigator.clipboard.writeText(componentSource[selected]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function copyInstallCommand() {
    await navigator.clipboard.writeText(installCommand);
    setInstallCopied(true);
    window.setTimeout(() => setInstallCopied(false), 1600);
  }

  return (
    <div className={`component-docs ${docsMode ? "component-docs-full" : ""}`}>
      <aside className="component-index">
        {docsMode && <nav className="docs-section-links" aria-label="Documentation sections"><p>SECTIONS</p><a href="/foundations">Foundations</a><a className="active" href="/components">Components</a><a href="/blocks">Blocks</a><a href="/design">Agent guide</a></nav>}
        <p>COMPONENTS</p>
        {docsMode && <button className={`docs-showcase-link ${showcase ? "active" : ""}`} onClick={() => setShowcase(true)}>Showcase<span>LIVE</span></button>}
        {docsMode ? (Object.keys(componentSets) as Array<keyof typeof componentSets>).map((group) => <div className="docs-component-group" key={group}><span>{group}</span>{componentSets[group].map((item) => <button key={item} className={selected === item ? "active" : ""} onClick={() => chooseComponent(item)}>{item}</button>)}</div>) : <>
          {Object.keys(componentSets).map((item) => (
            <button key={item} onClick={() => chooseCategory(item as keyof typeof componentSets)} className={category === item ? "active" : ""}>{item}<span>{componentSets[item as keyof typeof componentSets].length}</span></button>
          ))}
          <div className="component-tree">
            {componentSets[category].map((item) => <button key={item} className={selected === item ? "active" : ""} onClick={() => chooseComponent(item)}>{item}</button>)}
          </div>
        </>}
      </aside>
      {docsMode && showcase ? <ComponentShowcase onInspect={chooseComponent}/> : <div className="component-page">
        <header className="component-page-header"><div><div className="component-breadcrumb">COMPONENTS <span>/</span> {category.toUpperCase()}</div><h3>{selected}</h3><p>{componentMeta[selected].description}</p></div>{docsMode ? <div className="component-page-actions"><button onClick={copyComponentInstall}><Icon name={copied ? "check" : "copy"}/>{copied ? "Copied" : "Copy source"}</button><button aria-label="Previous component" disabled={selectedIndex === 0} onClick={() => chooseComponent(componentList[selectedIndex - 1])}>←</button><button aria-label="Next component" disabled={selectedIndex === componentList.length - 1} onClick={() => chooseComponent(componentList[selectedIndex + 1])}>→</button></div> : <span className="stable-badge">● STABLE</span>}</header>
        {!docsMode && <div className="install-command"><code><span>INSTALL</span> {installCommand} <em>· source-owned</em></code><button onClick={copyInstallCommand} aria-label="Copy install command"><Icon name={installCopied ? "check" : "copy"}/>{installCopied ? "Copied" : "Copy install"}</button></div>}
        <div className="preview-toolbar">
          <div role="tablist" aria-label="Component view"><button role="tab" aria-selected={view === "preview"} onClick={() => setView("preview")}>Preview</button><button role="tab" aria-selected={view === "usage"} onClick={() => setView("usage")}>Usage</button><button role="tab" aria-selected={view === "source"} onClick={() => setView("source")}>Source</button></div>
          <div className="state-controls"><label><input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)}/> Disabled</label><label><input type="checkbox" checked={compact} onChange={(event) => setCompact(event.target.checked)}/> Compact</label><span>100%</span></div>
        </div>
        <div className={`component-canvas ${view !== "preview" ? "code-view" : ""}`} key={`${selected}-${view}`}>
          {view === "preview" ? <ComponentPreview name={selected} disabled={disabled} compact={compact}/> : <CodeBlock code={view === "usage" ? componentMeta[selected].code : componentSource[selected]} filename={view === "usage" ? `${registryName}.example.tsx` : `${registryName}.tsx`} />}
        </div>
        <div className="component-guidance"><div><span>USE WHEN</span><p>You need a familiar interface pattern with an opinionated editorial treatment.</p></div><div><span>AVOID WHEN</span><p>A native element already communicates the action clearly without extra structure.</p></div><div><span>ACCESSIBILITY</span><p>Keyboard-visible focus, semantic state, and reduced-motion behavior included.</p></div></div>
        {docsMode && <section className="component-installation"><div><span className="section-index">INSTALLATION</span><h4>Own the component source.</h4><p>Manner is a shadcn-compatible source registry. The CLI resolves dependencies, writes the files into your app, and leaves every line under your control.</p></div><div className="install-command"><code><span>INSTALL</span> {installCommand} <em>· Base UI where behavior needs a primitive</em></code><button onClick={copyInstallCommand} aria-label="Copy install command"><Icon name={installCopied ? "check" : "copy"}/>{installCopied ? "Copied" : "Copy install"}</button></div><CodeBlock language="bash" label="terminal" filename="Install with shadcn" showLineNumbers={false} code={`pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json\n${installCommand}`} /></section>}
      </div>}
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyInstall() {
    const response = await fetch("/DESIGN.md");
    await navigator.clipboard.writeText(await response.text());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="showcase-home" id="top">
      <section className="showcase-home-hero">
        <div>
          <p className="eyebrow"><span /> Manner / agent-native editorial UI</p>
          <h1>A design system<br/><i>you can see working.</i></h1>
        </div>
        <div className="showcase-home-intro">
          <p>18 interactive components, six application blocks, and one copyable design grammar for coding agents.</p>
          <div className="showcase-home-actions">
            <a href="/components" className="primary-button">Browse components <Icon name="arrow" /></a>
            <button className="text-link copy-design-button" onClick={copyInstall}><Icon name={copied ? "check" : "copy"}/>{copied ? "DESIGN.md copied" : "Copy DESIGN.md"}</button>
          </div>
        </div>
      </section>

      <section className="root-showcase" aria-label="Manner component and block showcase">
        <ComponentShowcase onInspect={() => { window.location.href = "/components"; }}/>
      </section>

      <section className="showcase-home-links" aria-label="Explore Manner">
        <a href="/foundations"><span>01</span><div><strong>Foundations</strong><small>Color, type, space, motion</small></div><b>↗</b></a>
        <a href="/components"><span>02</span><div><strong>Components</strong><small>Live previews and source</small></div><b>↗</b></a>
        <a href="/blocks"><span>03</span><div><strong>Blocks</strong><small>Complete product compositions</small></div><b>↗</b></a>
        <a href="/design"><span>04</span><div><strong>Agent guide</strong><small>Copyable DESIGN.md</small></div><b>↗</b></a>
      </section>

      <footer className="showcase-home-footer">
        <a className="brand" href="#top"><Mark/><span>Manner</span></a>
        <p>Source-owned editorial interfaces for humans and coding agents.</p>
        <span>Independent project · v0.1</span>
      </footer>
    </main>
  );
}
