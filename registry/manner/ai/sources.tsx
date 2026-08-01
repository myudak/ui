import * as React from "react"

import { cn } from "@/lib/cn"

type SourceItem = { title: string; domain: string; href: string }
type SourcesProps = React.ComponentProps<"ol"> & { items: SourceItem[] }

function Sources({ items, className, ...props }: SourcesProps) {
  return (
    <ol data-slot="sources" className={cn("m-0 list-none divide-y divide-[var(--border-subtle)] p-0", className)} {...props}>
      {items.map((item, index) => <li key={item.href}><a href={item.href} target="_blank" rel="noreferrer" className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"><span className="font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span><span><strong className="block font-[family-name:var(--serif)] text-base font-medium">{item.title}</strong><small className="text-xs text-[var(--muted)]">{item.domain}</small></span><span aria-hidden="true" className="text-[var(--accent)]">↗</span></a></li>)}
    </ol>
  )
}

export { Sources, type SourceItem, type SourcesProps }
