import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { componentSource, exampleSource } from "@/app/component-source.generated"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { InstallCommand } from "@/components/site/install-command"
import { componentCatalog, getComponent } from "@/lib/catalog"
import { exportsOf, getRegistryItem } from "@/lib/registry"
import { examples } from "@/registry/manner/examples"
import { Badge } from "@/registry/manner/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/manner/ui/breadcrumb"
import { Button } from "@/registry/manner/ui/button"

export function generateStaticParams() {
  return componentCatalog.map((item) => ({ slug: item.name }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const component = getComponent(slug)
  return component ? { title: component.title, description: component.description } : {}
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-14 scroll-mt-20">
      <h2 id={id} className="font-heading text-2xl font-medium tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = getComponent(slug)
  const Example = examples[slug]
  if (!component || !Example) notFound()

  const index = componentCatalog.indexOf(component)
  const previous = componentCatalog[index - 1]
  const next = componentCatalog[index + 1]
  const registryItem = getRegistryItem(slug)
  const npmDependencies = (registryItem?.dependencies ?? []).map((dependency) => dependency.replace(/@[^@]+$/, ""))
  const registryDependencies = (registryItem?.registryDependencies ?? []).filter(
    (dependency) => !["@manner/manner-theme", "@manner/utils"].includes(dependency)
  )
  const source = componentSource[slug]
  const usage = `import { ${exportsOf(source).join(", ")} } from "@/components/ui/${slug}"`
  const primitive = npmDependencies.includes("@base-ui/react") ? "Base UI" : npmDependencies.includes("cmdk") ? "cmdk" : npmDependencies.includes("react-day-picker") ? "react-day-picker" : "Native HTML"

  return (
    <article className="max-w-3xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink render={<Link href="/components" />}>Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{component.group}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight sm:text-5xl">{component.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-pretty text-muted-foreground">{component.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="secondary">{component.group}</Badge>
        <Badge variant="outline">{primitive}</Badge>
        <Badge variant="outline" className="font-mono">@manner/{slug}</Badge>
      </div>

      <ComponentPreview className="mt-10" code={exampleSource[slug]} filename={`${slug}-demo.tsx`}>
        <Example />
      </ComponentPreview>

      <Section id="installation" title="Installation">
        <InstallCommand args={`add @manner/${slug}`} />
        <details className="group/manual mt-4 rounded-xl border">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
            Or copy the source manually
            <span className="font-mono text-xs text-muted-foreground group-open/manual:hidden">components/ui/{slug}.tsx</span>
          </summary>
          <div className="border-t p-3">
            {npmDependencies.length > 0 && (
              <p className="mb-3 px-1 text-sm text-muted-foreground">
                Install dependencies: <code className="font-mono text-foreground">{npmDependencies.join(" ")}</code>
              </p>
            )}
            <CodeBlock code={source} filename={`components/ui/${slug}.tsx`} maxHeight="480px" showLineNumbers />
          </div>
        </details>
      </Section>

      <Section id="usage" title="Usage">
        <CodeBlock code={usage} />
        {registryDependencies.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Installs alongside{" "}
            {registryDependencies.map((dependency, position) => {
              const name = dependency.replace("@manner/", "")
              const documented = getComponent(name)
              return (
                <span key={dependency}>
                  {position > 0 && ", "}
                  {documented ? (
                    <Link href={`/components/${name}`} className="text-foreground underline underline-offset-4">{documented.title}</Link>
                  ) : (
                    <code className="font-mono text-foreground">{name}</code>
                  )}
                </span>
              )
            })}
            .
          </p>
        )}
      </Section>

      <nav aria-label="Pagination" className="mt-16 flex items-center justify-between gap-4 border-t pt-6">
        {previous ? (
          <Button variant="ghost" nativeButton={false} render={<Link href={`/components/${previous.name}`} />}>
            <ArrowLeftIcon data-icon="inline-start" /> {previous.title}
          </Button>
        ) : <span />}
        {next && (
          <Button variant="ghost" nativeButton={false} render={<Link href={`/components/${next.name}`} />}>
            {next.title} <ArrowRightIcon data-icon="inline-end" />
          </Button>
        )}
      </nav>
    </article>
  )
}
