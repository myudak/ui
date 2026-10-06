import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/cn"

type SourceItem = { title: string; domain: string; href: string }
type SourcesProps = React.ComponentProps<"ol"> & { items: SourceItem[] }

function Sources({ items, className, ...props }: SourcesProps) {
  return (
    <ol data-slot="sources" className={cn("divide-y", className)} {...props}>
      {items.map((item, index) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group/source grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-md py-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="font-mono text-xs text-brand">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0">
              <strong className="block truncate font-heading text-base font-medium group-hover/source:underline group-hover/source:underline-offset-4">
                {item.title}
              </strong>
              <span className="text-xs text-muted-foreground">{item.domain}</span>
            </span>
            <ArrowUpRightIcon aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover/source:-translate-y-px group-hover/source:translate-x-px group-hover/source:text-brand" />
          </a>
        </li>
      ))}
    </ol>
  )
}

export { Sources, type SourceItem, type SourcesProps }
