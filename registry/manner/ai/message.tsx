import * as React from "react"

import { cn } from "@/lib/cn"

type MessageProps = React.ComponentProps<"article"> & {
  from: "user" | "assistant"
  label?: string
  actions?: React.ReactNode
}

function Message({ from, label, actions, children, className, ...props }: MessageProps) {
  return (
    <article
      data-slot="message"
      data-from={from}
      className={cn(
        "group/message grid max-w-[68ch] gap-1.5 data-[from=user]:ml-auto data-[from=user]:max-w-[85%] data-[from=user]:rounded-xl data-[from=user]:rounded-br-sm data-[from=user]:bg-muted data-[from=user]:px-4 data-[from=user]:py-3",
        className
      )}
      {...props}
    >
      <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
        {label ?? (from === "user" ? "You" : "Manner")}
      </span>
      <div className="text-sm leading-relaxed">{children}</div>
      {actions && (
        <footer className="flex gap-1 text-muted-foreground opacity-70 transition-opacity group-focus-within/message:opacity-100 group-hover/message:opacity-100">
          {actions}
        </footer>
      )}
    </article>
  )
}

export { Message, type MessageProps }
