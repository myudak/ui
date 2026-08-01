import { Sparkles } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/cn"

type NoteProps = React.ComponentProps<"aside"> & { title?: React.ReactNode }

function Note({ title, children, className, ...props }: NoteProps) {
  return (
    <aside data-slot="note" className={cn("grid grid-cols-[24px_1fr] gap-4 rounded-[var(--radius-sm,6px)] border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] bg-[var(--surface)] p-5", className)} {...props}>
      <Sparkles aria-hidden="true" className="mt-0.5 size-4 text-[var(--accent)]" />
      <div>{title && <strong className="font-[family-name:var(--serif)] text-lg font-medium">{title}</strong>}<div className="mt-1.5 text-sm leading-relaxed text-[var(--ink-secondary)]">{children}</div></div>
    </aside>
  )
}

export { Note, type NoteProps }
