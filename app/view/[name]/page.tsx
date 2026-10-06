import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { blockCatalog, getBlock } from "@/lib/catalog"
import { blocks } from "@/registry/manner/blocks"

export function generateStaticParams() {
  return blockCatalog.map((block) => ({ name: block.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params
  const block = getBlock(name)
  return { title: block ? `${block.title} preview` : "Preview", robots: { index: false } }
}

export default async function BlockViewPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const Block = blocks[name]
  if (!Block) notFound()
  return <Block />
}
