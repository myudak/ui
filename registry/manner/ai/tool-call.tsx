import * as React from "react"

import { cn } from "@/lib/cn"

type ToolCallProps = React.ComponentProps<"section"> & { name: string; status: "running" | "complete" | "error"; duration?: string }

function ToolCall({ name, status, duration, children, className, ...props }: ToolCallProps) {
  return (
    <section data-slot="tool-call" data-status={status} className={cn("overflow-hidden rounded-[var(--radius-sm,6px)] border border-[var(--border)] bg-[var(--surface)]", className)} {...props}>
      <header className="flex items-center justify-between gap-4 p-4"><div><code className="font-mono text-sm text-[var(--ink)]">{name}</code>{duration && <small className="ml-2 text-[var(--muted)]">{duration}</small>}</div><span className="font-mono text-[.66rem] uppercase tracking-wider text-[var(--accent)] data-[status=error]:text-[var(--danger)]" data-status={status}>{status}</span></header>
      <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-inset)] p-4 text-sm leading-relaxed text-[var(--ink-secondary)]">{children}</div>
    </section>
  )
}

export { ToolCall, type ToolCallProps }
