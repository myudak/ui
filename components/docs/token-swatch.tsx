"use client"

import * as React from "react"

import { cn } from "@/lib/cn"

/** Shows a token's live value, so it stays correct in both themes. */
export function TokenSwatch({ token, label, className }: { token: string; label?: string; className?: string }) {
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    const read = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim())
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [token])

  return (
    <figure className={cn("min-w-0", className)}>
      <div className="h-16 rounded-lg border" style={{ background: `var(--${token})` }} />
      <figcaption className="mt-2 grid gap-0.5">
        <span className="text-sm font-medium">{label ?? token}</span>
        <code className="font-mono text-xs text-muted-foreground">--{token}</code>
        <code className="truncate font-mono text-xs text-muted-foreground/80" title={value}>{value || " "}</code>
      </figcaption>
    </figure>
  )
}
