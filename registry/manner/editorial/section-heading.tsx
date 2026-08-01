import * as React from "react"

import { cn } from "@/lib/cn"

type SectionHeadingProps = Omit<React.ComponentProps<"header">, "title"> & {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

function SectionHeading({ eyebrow, title, description, action, className, ...props }: SectionHeadingProps) {
  return (
    <header data-slot="section-heading" className={cn("grid gap-5 border-l-2 border-[var(--accent)] pl-5 sm:grid-cols-[1fr_auto]", className)} {...props}>
      <div>
        {eyebrow && <p className="m-0 font-mono text-[.68rem] uppercase tracking-[.13em] text-[var(--accent)]">{eyebrow}</p>}
        <h2 className="my-2 font-[family-name:var(--serif)] text-4xl font-medium leading-[.98] tracking-[-.035em] text-[var(--ink)]">{title}</h2>
        {description && <p className="m-0 max-w-[62ch] text-sm leading-relaxed text-[var(--ink-secondary)]">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </header>
  )
}

export { SectionHeading, type SectionHeadingProps }
