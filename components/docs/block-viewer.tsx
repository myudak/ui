"use client"

import * as React from "react"
import { ArrowUpRightIcon, MonitorIcon, RotateCwIcon, SmartphoneIcon, TabletIcon } from "lucide-react"

import { CodeBlock } from "@/components/site/code-block"
import { cn } from "@/lib/cn"
import { Button } from "@/registry/manner/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/manner/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/registry/manner/ui/toggle-group"

const viewports = {
  desktop: { width: "100%", icon: MonitorIcon, label: "Desktop" },
  tablet: { width: "768px", icon: TabletIcon, label: "Tablet" },
  mobile: { width: "375px", icon: SmartphoneIcon, label: "Mobile" },
} as const

type Viewport = keyof typeof viewports

export function BlockViewer({
  name,
  code,
  height = 640,
  className,
}: {
  name: string
  code: string
  height?: number
  className?: string
}) {
  const [viewport, setViewport] = React.useState<Viewport>("desktop")
  const [reloadKey, setReloadKey] = React.useState(0)
  const src = `/view/${name}`

  return (
    <Tabs defaultValue="preview" className={cn("gap-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TabsList variant="line" className="h-9">
          <TabsTrigger value="preview" className="px-2">Preview</TabsTrigger>
          <TabsTrigger value="code" className="px-2">Code</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-1">
          <ToggleGroup
            variant="outline"
            size="sm"
            value={[viewport]}
            onValueChange={(value) => value[0] && setViewport(value[0] as Viewport)}
            aria-label="Preview width"
            className="hidden md:flex"
          >
            {(Object.keys(viewports) as Viewport[]).map((key) => {
              const Icon = viewports[key].icon
              return (
                <ToggleGroupItem key={key} value={key} aria-label={viewports[key].label}>
                  <Icon />
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
          <Button variant="ghost" size="icon-sm" aria-label="Reload preview" onClick={() => setReloadKey((value) => value + 1)}>
            <RotateCwIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" nativeButton={false} render={<a href={src} target="_blank" rel="noreferrer" />} aria-label="Open preview in a new tab">
            <ArrowUpRightIcon />
          </Button>
        </div>
      </div>
      <TabsContent value="preview">
        <div className="overflow-hidden rounded-xl border bg-muted/40">
          <iframe
            key={reloadKey}
            data-preview
            src={src}
            title={`${name} preview`}
            loading="lazy"
            className="mx-auto block bg-background transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: viewports[viewport].width, height }}
          />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} filename={`components/${name}.tsx`} maxHeight={`${height}px`} />
      </TabsContent>
    </Tabs>
  )
}
