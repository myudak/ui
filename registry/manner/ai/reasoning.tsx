import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/cn"

type ReasoningProps = Omit<React.ComponentProps<"details">, "title"> & {
  title?: React.ReactNode
  summary?: React.ReactNode
}

function Reasoning({ title = "How this was decided", summary, children, className, ...props }: ReasoningProps) {
  return (
    <details data-slot="reasoning" className={cn("group/reasoning rounded-lg border bg-card text-card-foreground", className)} {...props}>
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="size-2 rounded-full bg-brand ring-4 ring-brand-soft" />
        {title}
        {summary && <span className="ml-auto text-xs font-normal text-muted-foreground">{summary}</span>}
        <ChevronDownIcon
          aria-hidden="true"
          className={cn("size-4 text-muted-foreground transition-transform group-open/reasoning:rotate-180", !summary && "ml-auto")}
        />
      </summary>
      <div className="border-t px-4 py-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </details>
  )
}

export { Reasoning, type ReasoningProps }
