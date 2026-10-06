"use client"

import * as React from "react"

import { cn } from "@/lib/cn"

/**
 * A scaled, non-interactive live render of a block. The iframe renders at a
 * desktop width and is scaled to fit, so the thumbnail shows the real layout.
 */
export function BlockThumbnail({
  name,
  className,
  width = 1280,
  height = 800,
}: {
  name: string
  className?: string
  width?: number
  height?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [width])

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-xl border bg-muted/40", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {scale > 0 && (
        <iframe
          data-preview
          src={`/view/${name}`}
          title={`${name} thumbnail`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 origin-top-left bg-background"
          style={{ width, height, transform: `scale(${scale})` }}
        />
      )}
    </div>
  )
}
