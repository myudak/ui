import * as React from "react"

import { cn } from "@/lib/cn"

type TimelineEntry = { date: React.ReactNode; title: React.ReactNode; description?: React.ReactNode }
type TimelineProps = React.ComponentProps<"ol"> & { items: TimelineEntry[] }

function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <ol data-slot="timeline" className={cn("grid", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="group/item relative grid grid-cols-[auto_1fr] gap-x-4 pb-6 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute top-8 bottom-0 left-3.5 w-px bg-border group-last/item:hidden"
          />
          <span className="relative flex size-7 items-center justify-center rounded-full border bg-background font-mono text-xs text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="pt-0.5">
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{item.date}</p>
            <h3 className="mt-1 font-heading text-lg font-medium tracking-tight">{item.title}</h3>
            {item.description && (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { Timeline, type TimelineEntry, type TimelineProps }
