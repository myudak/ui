import * as React from "react"

import { cn } from "@/lib/cn"

type ArtifactProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  type: React.ReactNode
  actions?: React.ReactNode
}

function Artifact({ title, type, actions, children, className, ...props }: ArtifactProps) {
  return (
    <section
      data-slot="artifact"
      className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground", className)}
      {...props}
    >
      <header className="flex min-h-11 items-center justify-between gap-4 border-b px-4">
        <div className="flex min-w-0 items-baseline gap-2">
          <strong className="truncate text-sm font-medium">{title}</strong>
          <span className="font-mono text-xs tracking-wide text-brand uppercase">{type}</span>
        </div>
        {actions && <div className="flex items-center gap-1">{actions}</div>}
      </header>
      <div className="min-h-40 bg-muted/50 p-4 font-mono text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

export { Artifact, type ArtifactProps }
