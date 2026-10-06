"use client"

import * as React from "react"

import { CopyButton } from "@/components/site/copy-button"
import { cn } from "@/lib/cn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/manner/ui/tabs"

const managers = [
  { id: "pnpm", runner: "pnpm dlx" },
  { id: "npm", runner: "npx" },
  { id: "bun", runner: "bunx --bun" },
] as const

/** A package-manager-aware shadcn command, e.g. `add @manner/button`. */
export function InstallCommand({ args, className }: { args: string; className?: string }) {
  return (
    <Tabs defaultValue="pnpm" className={cn("gap-0 overflow-hidden rounded-xl border bg-muted/50", className)}>
      <div className="flex items-center justify-between border-b bg-muted/60 pr-1.5 pl-2">
        <TabsList variant="line" className="h-10 gap-0">
          {managers.map((manager) => (
            <TabsTrigger key={manager.id} value={manager.id} className="px-2.5 font-mono text-xs">
              {manager.id}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {managers.map((manager) => {
        const command = `${manager.runner} shadcn@latest ${args}`
        return (
          <TabsContent key={manager.id} value={manager.id} className="flex items-center gap-2 py-1.5 pr-1.5 pl-4">
            <code className="min-w-0 flex-1 overflow-x-auto py-2 font-mono text-[0.8125rem] whitespace-nowrap">
              <span className="text-muted-foreground select-none">$ </span>
              {command}
            </code>
            <CopyButton value={command} label="Copy command" />
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
