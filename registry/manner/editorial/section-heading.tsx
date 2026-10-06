import * as React from "react"

import { cn } from "@/lib/cn"

type SectionHeadingProps = Omit<React.ComponentProps<"header">, "title"> & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  as?: "h1" | "h2" | "h3"
}

function SectionHeading({ eyebrow, title, description, action, as: Heading = "h2", className, ...props }: SectionHeadingProps) {
  return (
    <header
      data-slot="section-heading"
      className={cn("flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", className)}
      {...props}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">{eyebrow}</p>
        )}
        <Heading className="mt-3 font-heading text-3xl leading-[1.05] font-medium tracking-tight text-balance sm:text-4xl">
          {title}
        </Heading>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}

export { SectionHeading, type SectionHeadingProps }
