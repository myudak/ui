"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Mark } from "@/app/site-header";

export function BlueprintMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`blueprint-mark ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <div className="blueprint-grid" />
      <div className="blueprint-measure measure-a">24</div>
      <div className="blueprint-measure measure-b">24</div>
      <svg viewBox="0 0 520 340" role="img">
        <g className="blueprint-construction">
          <path d="M72 267 170 86l87 118 154-67v140" />
          <path d="M56 279h376M170 65v232M410 116v181" />
          <path d="M65 291v-24M423 291v-24M158 75h24M158 286h24" />
        </g>
        <path className="blueprint-shadow" d="M72 267 170 86l87 118 154-67v140" />
        <path className="blueprint-edge" d="M72 255 170 74l87 118 154-67v140" />
        <path className="blueprint-face" d="M72 245 170 64l87 118 154-67v140" />
      </svg>
    </div>
  );
}

export function InstallStrip({ target = "@manner" }: { target?: string }) {
  const [copied, setCopied] = useState(false);
  const command = `pnpm dlx shadcn@latest add ${target}`;
  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }
  return (
    <section className="system-install-strip">
      <div className="system-install-icon"><span /><i /><b /></div>
      <div><span>INSTALL THE SYSTEM</span><strong>Own the source.</strong></div>
      <p>Manner is a shadcn-compatible registry. One command installs source you can inspect, edit, and ship.</p>
      <div className="system-install-command"><code>{command}</code><button onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy"}</button></div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="system-footer">
      <a className="brand" href="/"><Mark /><span>Manner</span><em>0.1.0</em></a>
      <p>Source-owned editorial interfaces for humans and coding agents.</p>
      <a href="https://github.com/myudak/ui" aria-label="Manner on GitHub">Independent project · MIT <span aria-hidden="true">↗</span></a>
    </footer>
  );
}
