import * as React from "react"

import { cn } from "@/lib/cn"

type MetadataItem = { label: React.ReactNode; value: React.ReactNode }
type MetadataProps = React.ComponentProps<"dl"> & { items: MetadataItem[] }

function Metadata({ items, className, ...props }: MetadataProps) {
  return (
    <dl data-slot="metadata" className={cn("m-0 divide-y divide-[var(--border-subtle)] rounded-[var(--radius-sm,6px)] border border-[var(--border)] bg-[var(--surface)]", className)} {...props}>
      {items.map((item, index) => <div key={index} className="grid grid-cols-[1fr_1.4fr] gap-4 px-4 py-3"><dt className="font-mono text-xs text-[var(--muted)]">{item.label}</dt><dd className="m-0 text-sm text-[var(--ink)]">{item.value}</dd></div>)}
    </dl>
  )
}

export { Metadata, type MetadataItem, type MetadataProps }
