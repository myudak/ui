import * as React from "react"

import { cn } from "@/lib/cn"

type QuoteProps = React.ComponentProps<"figure"> & { cite: React.ReactNode }

function Quote({ children, cite, className, ...props }: QuoteProps) {
  return (
    <figure data-slot="quote" className={cn("m-0 border-y border-[var(--border)] py-8", className)} {...props}>
      <blockquote className="m-0 font-[family-name:var(--serif)] text-3xl leading-tight tracking-[-.025em] text-[var(--ink)]">“{children}”</blockquote>
      <figcaption className="mt-5 font-mono text-xs text-[var(--muted)]">— {cite}</figcaption>
    </figure>
  )
}

export { Quote, type QuoteProps }
