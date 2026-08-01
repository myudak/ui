import * as React from "react"

import { cn } from "@/lib/cn"

type ReasoningProps = React.ComponentProps<"details"> & { title?: React.ReactNode; summary?: React.ReactNode }

function Reasoning({ title = "How this was decided", summary, children, className, ...props }: ReasoningProps) {
  return (
    <details data-slot="reasoning" className={cn("group rounded-[var(--radius-sm,6px)] border border-[var(--border)] bg-[var(--surface)]", className)} {...props}>
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"><span className="size-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_var(--accent-soft)]" />{title}{summary && <small className="ml-auto text-xs font-normal text-[var(--muted)]">{summary}</small>}</summary>
      <div className="border-t border-[var(--border-subtle)] px-5 py-4 text-sm leading-relaxed text-[var(--ink-secondary)]">{children}</div>
    </details>
  )
}

export { Reasoning, type ReasoningProps }
