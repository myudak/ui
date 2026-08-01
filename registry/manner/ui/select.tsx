"use client"

import { Select as BaseSelect } from "@base-ui/react/select"
import { Check, ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/cn"

const Select = BaseSelect.Root

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-10 w-full items-center justify-between gap-3 rounded-[var(--radius-sm,6px)] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--ink)] outline-none transition-[border-color,box-shadow] focus-visible:border-[var(--focus)] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--focus)_14%,transparent)] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon><ChevronDown aria-hidden="true" className="size-4 text-[var(--muted)]" /></BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

const SelectValue = BaseSelect.Value

function SelectContent({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={6} className="z-[100] outline-none">
        <BaseSelect.Popup
          data-slot="select-content"
          className={cn(
            "min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-[var(--radius-md,10px)] border border-[var(--border)] bg-[var(--surface)] p-1 text-[var(--ink)] shadow-[0_16px_45px_color-mix(in_oklab,var(--ink)_12%,transparent)] outline-none transition-[transform,opacity] duration-150 data-[ending-style]:scale-[.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[.98] data-[starting-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={cn(
        "grid min-h-9 cursor-default grid-cols-[1fr_18px] items-center gap-3 rounded-[var(--radius-xs,4px)] px-3 text-sm outline-none data-[highlighted]:bg-[var(--accent-soft)] data-[selected]:text-[var(--accent)] data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator><Check aria-hidden="true" className="size-4" /></BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
