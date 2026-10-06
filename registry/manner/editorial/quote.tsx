import * as React from "react"

import { cn } from "@/lib/cn"

type QuoteProps = React.ComponentProps<"figure"> & { cite: React.ReactNode }

function Quote({ children, cite, className, ...props }: QuoteProps) {
  return (
    <figure data-slot="quote" className={cn("border-y py-8", className)} {...props}>
      <blockquote className="font-heading text-2xl leading-snug tracking-tight text-balance sm:text-3xl">
        “{children}”
      </blockquote>
      <figcaption className="mt-5 font-mono text-xs text-muted-foreground">— {cite}</figcaption>
    </figure>
  )
}

export { Quote, type QuoteProps }
