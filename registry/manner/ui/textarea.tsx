import * as React from "react"

import { cn } from "@/lib/cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full resize-y rounded-[var(--radius-sm,6px)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm leading-relaxed text-[var(--ink)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted)] focus-visible:border-[var(--focus)] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--focus)_14%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--danger)]",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
