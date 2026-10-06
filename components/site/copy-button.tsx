"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/cn"
import { Button } from "@/registry/manner/ui/button"

export function useCopy(timeout = 1600) {
  const [copied, setCopied] = React.useState(false)
  const copy = React.useCallback(
    async (value: string | (() => Promise<string>)) => {
      try {
        await navigator.clipboard.writeText(typeof value === "string" ? value : await value())
        setCopied(true)
        window.setTimeout(() => setCopied(false), timeout)
      } catch {
        setCopied(false)
      }
    },
    [timeout]
  )
  return { copied, copy }
}

export function CopyButton({
  value,
  label = "Copy",
  className,
  variant = "ghost",
}: {
  value: string
  label?: string
  className?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const { copied, copy } = useCopy()
  return (
    <Button
      variant={variant}
      size="icon-sm"
      className={cn("text-muted-foreground hover:text-foreground", className)}
      aria-label={copied ? "Copied" : label}
      onClick={() => copy(value)}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
