import * as React from "react"

import { cn } from "@/lib/cn"

type SurfaceProps = React.ComponentProps<"section"> & { tone?: "default" | "inset" | "raised" }

function Surface({ className, tone = "default", ...props }: SurfaceProps) {
  return (
    <section
      data-slot="surface"
      data-tone={tone}
      className={cn(
        "rounded-xl border p-5",
        tone === "default" && "bg-card text-card-foreground",
        tone === "inset" && "bg-muted/60",
        tone === "raised" && "bg-card text-card-foreground shadow-lg shadow-foreground/5",
        className
      )}
      {...props}
    />
  )
}

export { Surface, type SurfaceProps }
