"use client"

import * as React from "react"

import { CodeBlock } from "@/components/site/code-block"
import { cn } from "@/lib/cn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/manner/ui/tabs"

export function ComponentPreview({
  children,
  code,
  filename,
  className,
}: {
  children: React.ReactNode
  code: string
  filename?: string
  className?: string
}) {
  return (
    <Tabs defaultValue="preview" className={cn("gap-3", className)}>
      <TabsList variant="line" className="h-9">
        <TabsTrigger value="preview" className="px-2">Preview</TabsTrigger>
        <TabsTrigger value="code" className="px-2">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="relative flex min-h-[360px] items-center justify-center overflow-x-auto rounded-xl border bg-card p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="relative flex w-full justify-center">{children}</div>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} filename={filename} maxHeight="520px" />
      </TabsContent>
    </Tabs>
  )
}
