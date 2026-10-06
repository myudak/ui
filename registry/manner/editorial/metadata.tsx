import * as React from "react"

import { cn } from "@/lib/cn"

type MetadataItem = { label: React.ReactNode; value: React.ReactNode }
type MetadataProps = React.ComponentProps<"dl"> & { items: MetadataItem[] }

function Metadata({ items, className, ...props }: MetadataProps) {
  return (
    <dl
      data-slot="metadata"
      className={cn("divide-y rounded-lg border bg-card text-card-foreground", className)}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-baseline gap-4 px-4 py-3">
          <dt className="font-mono text-xs text-muted-foreground">{item.label}</dt>
          <dd className="text-sm">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { Metadata, type MetadataItem, type MetadataProps }
