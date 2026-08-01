"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/cn"

const Dialog = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
const DialogClose = BaseDialog.Close

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-[90] bg-[color-mix(in_oklab,var(--ink)_38%,transparent)] transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <BaseDialog.Viewport className="fixed inset-0 z-[91] grid place-items-center overflow-y-auto p-4">
        <BaseDialog.Popup
          data-slot="dialog-content"
          className={cn(
            "relative w-full max-w-lg rounded-[var(--radius-lg,14px)] border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--ink)] shadow-[0_28px_80px_color-mix(in_oklab,var(--ink)_22%,transparent)] outline-none transition-[transform,opacity] duration-200 data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0 data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
          <BaseDialog.Close aria-label="Close dialog" className="absolute right-4 top-4 grid size-8 place-items-center rounded-[var(--radius-sm,6px)] border border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus)]">
            <X aria-hidden="true" className="size-4" />
          </BaseDialog.Close>
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn("m-0 pr-10 font-[family-name:var(--serif)] text-2xl font-medium tracking-tight", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn("mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]", className)} {...props} />
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger }
