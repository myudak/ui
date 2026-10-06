"use client"

import { CheckIcon, CopyIcon } from "lucide-react"

import { useCopy } from "@/components/site/copy-button"
import { cn } from "@/lib/cn"

/** A single-line command pill, copied on click. */
export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(command)}
      className={cn(
        "group/copy flex h-11 w-full max-w-full items-center gap-3 rounded-lg border bg-card/70 pr-2 pl-4 text-left font-mono text-[0.8125rem] outline-none transition-colors hover:border-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-auto",
        className
      )}
    >
      <span className="text-brand select-none" aria-hidden="true">$</span>
      <span className="min-w-0 flex-1 truncate">{command}</span>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground group-hover/copy:bg-muted group-hover/copy:text-foreground">
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </span>
      <span className="sr-only" aria-live="polite">{copied ? "Copied to clipboard" : "Copy command"}</span>
    </button>
  )
}
