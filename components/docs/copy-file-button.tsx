"use client"

import { CheckIcon, CopyIcon } from "lucide-react"

import { useCopy } from "@/components/site/copy-button"
import { Button } from "@/registry/manner/ui/button"

/** Copies a text file served from /public, e.g. DESIGN.md. */
export function CopyFileButton({
  href,
  children,
  variant = "outline",
  size = "default",
}: {
  href: string
  children: React.ReactNode
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: React.ComponentProps<typeof Button>["size"]
}) {
  const { copied, copy } = useCopy(1800)
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(async () => (await fetch(href)).text())}
      aria-live="polite"
    >
      {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
      {copied ? "Copied" : children}
    </Button>
  )
}
