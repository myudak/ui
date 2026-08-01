import * as React from "react"

import { cn } from "@/lib/cn"

type MessageProps = React.ComponentProps<"article"> & {
  from: "user" | "assistant"
  label?: string
  actions?: React.ReactNode
}

function Message({ from, label, actions, children, className, ...props }: MessageProps) {
  return (
    <article data-slot="message" data-from={from} className={cn("group grid max-w-[68ch] gap-2 data-[from=user]:ml-auto data-[from=user]:max-w-[78%] data-[from=user]:rounded-[var(--radius-md,10px)] data-[from=user]:bg-[var(--accent-soft)] data-[from=user]:p-4", className)} {...props}>
      <span className="font-mono text-[.66rem] uppercase tracking-wider text-[var(--muted)]">{label ?? (from === "user" ? "You" : "Manner")}</span>
      <div className="text-sm leading-relaxed text-[var(--ink)]">{children}</div>
      {actions && <footer className="flex gap-3 text-xs text-[var(--muted)] opacity-75 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{actions}</footer>}
    </article>
  )
}

export { Message, type MessageProps }
