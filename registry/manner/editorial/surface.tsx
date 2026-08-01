import * as React from "react"

import { cn } from "@/lib/cn"

type SurfaceProps = React.ComponentProps<"section"> & { tone?: "default" | "inset" | "raised" }

function Surface({ className, tone = "default", ...props }: SurfaceProps) {
  return (
    <section
      data-slot="surface"
      data-tone={tone}
      className={cn(
        "rounded-[var(--radius-md,10px)] border p-5",
        tone === "default" && "border-[var(--border)] bg-[var(--surface)]",
        tone === "inset" && "border-[var(--border-subtle)] bg-[var(--surface-inset)]",
        tone === "raised" && "border-[var(--border)] bg-[var(--surface)] shadow-[0_16px_45px_color-mix(in_oklab,var(--ink)_9%,transparent)]",
        className,
      )}
      {...props}
    />
  )
}

export { Surface, type SurfaceProps }
