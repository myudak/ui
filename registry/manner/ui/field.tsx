import * as React from "react"

import { cn } from "@/lib/cn"

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field" className={cn("grid gap-2", className)} {...props} />
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return <label data-slot="field-label" className={cn("text-sm font-medium text-[var(--ink)]", className)} {...props} />
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="field-description" className={cn("m-0 text-xs leading-relaxed text-[var(--muted)]", className)} {...props} />
}

function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="field-error" role="alert" className={cn("m-0 text-xs leading-relaxed text-[var(--danger)]", className)} {...props} />
}

export { Field, FieldDescription, FieldError, FieldLabel }
