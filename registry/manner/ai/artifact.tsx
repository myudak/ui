import * as React from "react"

import { cn } from "@/lib/cn"

type ArtifactProps = React.ComponentProps<"section"> & { title: React.ReactNode; type: React.ReactNode; actions?: React.ReactNode }

function Artifact({ title, type, actions, children, className, ...props }: ArtifactProps) {
  return (
    <section data-slot="artifact" className={cn("overflow-hidden rounded-[var(--radius-md,10px)] border border-[var(--border)] bg-[var(--surface)] shadow-[0_16px_45px_color-mix(in_oklab,var(--ink)_8%,transparent)]", className)} {...props}>
      <header className="flex min-h-12 items-center justify-between gap-4 border-b border-[var(--border)] px-4"><div><strong className="text-sm font-medium">{title}</strong><span className="ml-2 font-mono text-[.65rem] uppercase tracking-wider text-[var(--accent)]">{type}</span></div>{actions}</header>
      <div className="min-h-48 bg-[var(--surface-inset)] p-5 font-mono text-sm leading-relaxed text-[var(--ink-secondary)]">{children}</div>
    </section>
  )
}

export { Artifact, type ArtifactProps }
