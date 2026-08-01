"use client"

import * as React from "react"

import { Button } from "@/registry/manner/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/manner/ui/select"
import { Switch } from "@/registry/manner/ui/switch"

function SettingsBlock() {
  const [motion, setMotion] = React.useState(true)
  const [saved, setSaved] = React.useState(false)
  return (
    <div className="grid min-h-[520px] overflow-hidden rounded-[var(--radius-lg,14px)] border border-[var(--border)] bg-[var(--surface)] md:grid-cols-[210px_1fr]">
      <aside className="border-b border-[var(--border)] bg-[var(--surface-inset)] p-4 md:border-b-0 md:border-r"><p className="font-mono text-[.68rem] uppercase tracking-wider text-[var(--muted)]">Settings</p><nav className="flex gap-1 overflow-x-auto md:grid">{["Profile", "Appearance", "Writing", "Integrations", "Advanced"].map((item) => <button key={item} className="whitespace-nowrap border-l-2 border-transparent px-3 py-2 text-left text-sm text-[var(--ink-secondary)] aria-[current=page]:border-[var(--accent)] aria-[current=page]:bg-[var(--accent-soft)] aria-[current=page]:text-[var(--ink)]" aria-current={item === "Writing" ? "page" : undefined}>{item}</button>)}</nav></aside>
      <main className="w-full max-w-2xl p-6 sm:p-10"><p className="font-mono text-[.68rem] uppercase tracking-wider text-[var(--accent)]">Writing & motion</p><h2 className="my-2 font-[family-name:var(--serif)] text-3xl font-medium">Writing preferences</h2><p className="text-sm leading-relaxed text-[var(--ink-secondary)]">Choose how the workspace responds while you think and write.</p><div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]"><label className="flex items-center justify-between gap-6 py-5"><span><strong className="block text-sm">Reduced motion</strong><small className="mt-1 block text-xs text-[var(--muted)]">Simplify transitions and panel movement.</small></span><Switch checked={motion} onCheckedChange={setMotion} aria-label="Reduced motion" /></label><div className="grid gap-2 py-5"><span className="text-sm font-medium">Writing tone</span><Select defaultValue="editorial"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="editorial">Editorial warm</SelectItem><SelectItem value="neutral">Quiet neutral</SelectItem><SelectItem value="dense">Dense product</SelectItem></SelectContent></Select></div></div><Button className="mt-6" onClick={() => setSaved(true)}>{saved ? "Saved ✓" : "Save preferences"}</Button></main>
    </div>
  )
}

export { SettingsBlock }
