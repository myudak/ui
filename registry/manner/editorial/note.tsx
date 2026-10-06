import * as React from "react"
import { SparklesIcon } from "lucide-react"

import { cn } from "@/lib/cn"

type NoteProps = Omit<React.ComponentProps<"aside">, "title"> & {
  title?: React.ReactNode
  icon?: React.ReactNode
}

function Note({ title, icon, children, className, ...props }: NoteProps) {
  return (
    <aside
      data-slot="note"
      className={cn(
        "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-lg border border-l-2 border-l-brand bg-card p-4 text-card-foreground",
        className
      )}
      {...props}
    >
      <span className="row-span-2 mt-0.5 text-brand [&_svg]:size-4" aria-hidden="true">
        {icon ?? <SparklesIcon />}
      </span>
      {title && <p className="font-heading text-base font-medium tracking-tight">{title}</p>}
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </aside>
  )
}

export { Note, type NoteProps }
