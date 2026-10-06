import * as React from "react"
import { CheckIcon, LoaderIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/cn"

type ToolCallStatus = "running" | "complete" | "error"
type ToolCallProps = React.ComponentProps<"section"> & { name: string; status: ToolCallStatus; duration?: string }

const statusIcon = {
  running: <LoaderIcon className="size-3.5 animate-spin" aria-hidden="true" />,
  complete: <CheckIcon className="size-3.5" aria-hidden="true" />,
  error: <XIcon className="size-3.5" aria-hidden="true" />,
}

function ToolCall({ name, status, duration, children, className, ...props }: ToolCallProps) {
  return (
    <section
      data-slot="tool-call"
      data-status={status}
      className={cn("group/tool overflow-hidden rounded-lg border bg-card text-card-foreground", className)}
      {...props}
    >
      <header className="flex items-center justify-between gap-4 px-4 py-2.5">
        <div className="flex min-w-0 items-baseline gap-2">
          <code className="truncate font-mono text-sm">{name}</code>
          {duration && <span className="text-xs text-muted-foreground">{duration}</span>}
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase group-data-[status=complete]/tool:text-success group-data-[status=error]/tool:text-destructive group-data-[status=running]/tool:text-brand">
          {statusIcon[status]}
          {status}
        </span>
      </header>
      {children && (
        <div className="border-t bg-muted/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
      )}
    </section>
  )
}

export { ToolCall, type ToolCallProps, type ToolCallStatus }
