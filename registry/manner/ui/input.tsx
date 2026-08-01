import * as React from "react"

import { cn } from "@/lib/cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-10 w-full rounded-[var(--radius-sm,6px)] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--ink)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted)] focus-visible:border-[var(--focus)] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--focus)_14%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--danger)]",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
