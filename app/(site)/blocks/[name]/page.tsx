import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { blockSource } from "@/app/component-source.generated"
import { BlockViewer } from "@/components/docs/block-viewer"
import { InstallCommand } from "@/components/site/install-command"
import { blockCatalog, getBlock, getComponent } from "@/lib/catalog"
import { getRegistryItem } from "@/lib/registry"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/manner/ui/breadcrumb"

export function generateStaticParams() {
  return blockCatalog.map((block) => ({ name: block.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params
  const block = getBlock(name)
  return block ? { title: block.title, description: block.description } : {}
}

export default async function BlockPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const block = getBlock(name)
  if (!block) notFound()

  const uses = (getRegistryItem(name)?.registryDependencies ?? [])
    .map((dependency) => dependency.replace("@manner/", ""))
    .map((component) => getComponent(component))
    .filter((component) => component !== undefined)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink render={<Link href="/blocks" />}>Blocks</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{block.category}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end">
        <div>
          <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">{block.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-pretty text-muted-foreground">{block.description}</p>
        </div>
        <InstallCommand args={`add @manner/${block.name}`} />
      </div>
      <BlockViewer className="mt-10" name={block.name} code={blockSource[block.name]} />
      {uses.length > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          Built with{" "}
          {uses.map((component, index) => (
            <span key={component.name}>
              {index > 0 && ", "}
              <Link href={`/components/${component.name}`} className="text-foreground underline underline-offset-4">
                {component.title}
              </Link>
            </span>
          ))}
          .
        </p>
      )}
    </div>
  )
}
