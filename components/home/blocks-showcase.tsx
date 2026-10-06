"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { BlockThumbnail } from "@/components/docs/block-thumbnail"
import { blockCatalog } from "@/lib/catalog"
import { Button } from "@/registry/manner/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/manner/ui/tabs"

export function BlocksShowcase() {
  return (
    <Tabs defaultValue={blockCatalog[0].name} className="gap-6">
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <TabsList variant="line" className="h-10 w-max gap-2">
          {blockCatalog.map((block) => (
            <TabsTrigger key={block.name} value={block.name} className="px-2 text-sm">
              {block.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {blockCatalog.map((block) => (
        <TabsContent key={block.name} value={block.name} className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <BlockThumbnail name={block.name} className="shadow-xl shadow-foreground/5" />
          <div className="grid gap-4">
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{block.category}</p>
            <h3 className="font-heading text-2xl font-medium tracking-tight">{block.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{block.description}</p>
            <code className="block rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs break-all">
              shadcn add @manner/{block.name}
            </code>
            <Button variant="outline" className="justify-self-start" nativeButton={false} render={<Link href={`/blocks/${block.name}`} />}>
              Open block <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
