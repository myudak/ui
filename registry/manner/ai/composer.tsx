"use client"

import * as React from "react"
import { ArrowUpIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/cn"
import { Button } from "@/registry/manner/ui/button"

type ComposerProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  value: string
  onValueChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  disabled?: boolean
  contextAction?: React.ReactNode
}

function Composer({
  value,
  onValueChange,
  onSubmit,
  placeholder = "Ask Manner…",
  disabled,
  contextAction,
  className,
  ...props
}: ComposerProps) {
  return (
    <form
      data-slot="composer"
      data-disabled={disabled || undefined}
      className={cn(
        "rounded-xl border bg-card p-2 text-card-foreground transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 data-disabled:opacity-60",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault()
        if (value.trim()) onSubmit(value.trim())
      }}
      {...props}
    >
      <textarea
        aria-label="Message"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter") event.currentTarget.form?.requestSubmit()
        }}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        className="field-sizing-content max-h-48 min-h-16 w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
      <footer className="flex items-center justify-between gap-3 pt-1">
        {contextAction ?? (
          <Button type="button" variant="ghost" size="sm" className="text-muted-foreground" disabled={disabled}>
            <PlusIcon aria-hidden="true" /> Add context
          </Button>
        )}
        <div className="flex items-center gap-2">
          <kbd className="hidden font-mono text-xs text-muted-foreground sm:inline">⌘ ↵</kbd>
          <Button type="submit" size="icon-sm" disabled={disabled || !value.trim()} aria-label="Send message">
            <ArrowUpIcon aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </form>
  )
}

export { Composer, type ComposerProps }
