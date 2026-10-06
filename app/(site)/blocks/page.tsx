import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { BlockThumbnail } from "@/components/docs/block-thumbnail"
import { blockCatalog } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Complete product compositions built from Manner components. Install a whole page in one command.",
}

export default function BlocksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Blocks</p>
      <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
        Whole pages, <em className="font-normal text-brand">not placeholders.</em>
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
        Each block is a working composition — states, keyboard behavior, and mobile layout included. Install one, then
        make it yours.
      </p>
      <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
        {blockCatalog.map((block) => (
          <li key={block.name}>
            <Link
              href={`/blocks/${block.name}`}
              className="group/block block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <BlockThumbnail name={block.name} className="transition-[border-color,transform] duration-200 group-hover/block:-translate-y-0.5 group-hover/block:border-foreground/25 motion-reduce:transform-none" />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{block.category}</p>
                  <h2 className="mt-1 font-heading text-xl font-medium tracking-tight">{block.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{block.description}</p>
                </div>
                <span className="mt-1 inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted-foreground group-hover/block:text-brand">
                  {block.name}
                  <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
