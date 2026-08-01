"use client"

import { ArrowUp, Plus } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/cn"
import { Button } from "@/registry/manner/ui/button"
import { Textarea } from "@/registry/manner/ui/textarea"

type ComposerProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  value: string
  onValueChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  disabled?: boolean
  contextAction?: React.ReactNode
}

function Composer({ value, onValueChange, onSubmit, placeholder = "Ask Manner…", disabled, contextAction, className, ...props }: ComposerProps) {
  return (
    <form
      data-slot="composer"
      className={cn("rounded-[var(--radius-lg,14px)] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[0_16px_45px_color-mix(in_oklab,var(--ink)_8%,transparent)]", className)}
      onSubmit={(event) => { event.preventDefault(); if (value.trim()) onSubmit(value.trim()) }}
      {...props}
    >
      <Textarea
        aria-label="Message"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") event.currentTarget.form?.requestSubmit() }}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-24 resize-none border-0 bg-transparent px-1 shadow-none focus-visible:shadow-none"
      />
      <footer className="mt-2 flex items-center justify-between gap-3">
        {contextAction ?? <button type="button" className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--ink)]"><Plus aria-hidden="true" className="size-3.5" /> Add context</button>}
        <div className="flex items-center gap-2"><kbd className="hidden font-mono text-[.65rem] text-[var(--muted)] sm:inline">⌘ ↵</kbd><Button type="submit" size="icon" disabled={disabled || !value.trim()} aria-label="Send message"><ArrowUp aria-hidden="true" className="size-4" /></Button></div>
      </footer>
    </form>
  )
}

export { Composer, type ComposerProps }
