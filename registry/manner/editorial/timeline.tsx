import * as React from "react"

import { cn } from "@/lib/cn"

type TimelineEntry = { date: React.ReactNode; title: React.ReactNode; description?: React.ReactNode }
type TimelineProps = React.ComponentProps<"ol"> & { items: TimelineEntry[] }

function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <ol data-slot="timeline" className={cn("m-0 list-none p-0", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="grid grid-cols-[34px_1fr] gap-4 pb-6 last:pb-0">
          <span className="grid size-8 place-items-center rounded-full border border-[var(--border)] font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
          <div className="border-b border-[var(--border-subtle)] pb-5 last:border-0"><time className="font-mono text-[.68rem] uppercase tracking-wider text-[var(--muted)]">{item.date}</time><h3 className="my-1 font-[family-name:var(--serif)] text-lg font-medium">{item.title}</h3>{item.description && <p className="m-0 text-sm leading-relaxed text-[var(--ink-secondary)]">{item.description}</p>}</div>
        </li>
      ))}
    </ol>
  )
}

export { Timeline, type TimelineEntry, type TimelineProps }
