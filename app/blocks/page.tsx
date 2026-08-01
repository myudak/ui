"use client";

import { useState } from "react";
import { blockSource } from "../component-source.generated";
import { CodeBlock } from "@/components/code-block";
import { AIWorkspaceBlock } from "@/registry/manner/blocks/ai-workspace-01";
import { LeaderboardBlock } from "@/registry/manner/blocks/leaderboard-01";
import { LoginBlock } from "@/registry/manner/blocks/login-01";
import { ReaderBlock } from "@/registry/manner/blocks/reader-01";
import { SettingsBlock } from "@/registry/manner/blocks/settings-01";
import { SidebarBlock } from "@/registry/manner/blocks/sidebar-01";
import { BlueprintMark, InstallStrip, SiteFooter } from "@/components/system-chrome";

type BlockName = "login" | "sidebar" | "settings" | "reader" | "ai" | "leaderboard";

const blocks: Array<{ id: string; type: BlockName; category: string; title: string; description: string }> = [
  { id: "login-01", type: "login", category: "AUTHENTICATION", title: "Editorial sign in", description: "A focused sign-in flow with product context instead of a generic floating card." },
  { id: "sidebar-01", type: "sidebar", category: "APPLICATION SHELL", title: "Collapsible workspace", description: "A content-first shell with grouped navigation and a compact icon state." },
  { id: "settings-01", type: "settings", category: "SETTINGS", title: "Preference workspace", description: "Section navigation, calm fields, and explicit state treatment." },
  { id: "reader-01", type: "reader", category: "KNOWLEDGE", title: "Knowledge reader", description: "Outline navigation, long-form reading, notes, citations, and progress." },
  { id: "ai-workspace-01", type: "ai", category: "AI INTERFACE", title: "Conversation workspace", description: "Messages, composer, and an artifact panel that becomes a focused mobile view." },
  { id: "leaderboard-01", type: "leaderboard", category: "DENSE DATA", title: "Comparison leaderboard", description: "Ranked data, methodology, trend context, and filters without card soup." },
];

function BlockPreview({ type }: { type: BlockName }) {
  if (type === "login") return <LoginBlock />;
  if (type === "sidebar") return <SidebarBlock />;
  if (type === "settings") return <SettingsBlock />;
  if (type === "reader") return <ReaderBlock />;
  if (type === "ai") return <AIWorkspaceBlock />;
  return <LeaderboardBlock />;
}

function BlockCard({ block }: { block: typeof blocks[number] }) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [installCopied, setInstallCopied] = useState(false);
  const installCommand = `pnpm dlx shadcn@latest add @manner/${block.id}`;

  async function copyCode() {
    await navigator.clipboard.writeText(blockSource[block.id]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  async function copyInstall() {
    await navigator.clipboard.writeText(installCommand);
    setInstallCopied(true);
    window.setTimeout(() => setInstallCopied(false), 1500);
  }

  return (
    <article className="block-card reveal-in" id={block.id}>
      <header><div><span>{block.category} · {block.id}</span><h2>{block.title}</h2><p>{block.description}</p></div><div><button onClick={() => setView("preview")} className={view === "preview" ? "active" : ""}>Preview</button><button onClick={() => setView("code")} className={view === "code" ? "active" : ""}>Code</button></div></header>
      <div className={`block-frame ${view === "code" ? "show-code" : ""}`}>{view === "preview" ? <BlockPreview type={block.type}/> : <CodeBlock code={blockSource[block.id]} filename={`${block.id}.tsx`} />}</div>
      <footer><code>{installCommand}</code><div className="flex gap-3"><button onClick={copyInstall}>{installCopied ? "Install copied ✓" : "Copy install"}</button><button onClick={copyCode}>{copied ? "Source copied ✓" : "Copy source"}</button></div></footer>
    </article>
  );
}

export default function BlocksPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Authentication", "Application", "Knowledge", "AI", "Data"];
  const visible = blocks.filter((block) => category === "All" || block.category.toLowerCase().includes(category.toLowerCase()));
  return <main className="docs-route blocks-route"><header className="route-hero route-hero-blueprint reveal-in"><div><p className="section-index">BLOCKS / APPLICATION COMPOSITIONS</p><h1>Whole interfaces,<br/><i>not card collections.</i></h1><p>Runnable compositions built from the same registry source you install. Preview the real interaction, inspect the complete file, or add a block through shadcn.</p><div className="block-filter">{categories.map((item)=><button key={item} className={category===item?"active":""} onClick={()=>setCategory(item)}>{item}</button>)}</div></div><BlueprintMark compact /></header><section className="blocks-list">{visible.map((block)=><BlockCard key={block.id} block={block}/>)}</section><InstallStrip target="@manner/login-01"/><SiteFooter/></main>;
}
