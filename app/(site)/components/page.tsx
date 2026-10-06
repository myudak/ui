import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { InstallCommand } from "@/components/site/install-command"
import { catalogGroups, componentCatalog, componentsInGroup, groupDescriptions } from "@/lib/catalog"

export const metadata: Metadata = {
  title: "Components",
  description: "Every Manner component, with live previews and installable source.",
}

export default function ComponentsIndexPage() {
  return (
    <div className="max-w-4xl">
      <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Components</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
        {componentCatalog.length} components, <em className="font-normal text-brand">one grammar.</em>
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
        Built from shadcn&apos;s Base UI sources and restyled with Manner tokens. Every component installs as editable
        source in your project.
      </p>
      <div className="mt-8 grid gap-2">
        <p className="text-sm text-muted-foreground">Add the registry once:</p>
        <InstallCommand args="registry add @manner=https://ui.myudak.com/r/{name}.json" />
      </div>

      <div className="mt-14 grid gap-14">
        {catalogGroups.map((group) => (
          <section key={group} aria-labelledby={`group-${group}`}>
            <div className="flex items-baseline justify-between gap-4 border-b pb-3">
              <h2 id={`group-${group}`} className="font-heading text-2xl font-medium tracking-tight">{group}</h2>
              <span className="font-mono text-xs text-muted-foreground">{componentsInGroup(group).length}</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{groupDescriptions[group]}</p>
            <ul className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {componentsInGroup(group).map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/components/${item.name}`}
                    className="group/link -mx-3 flex items-start gap-3 rounded-lg px-3 py-3 outline-none transition-colors hover:bg-accent/60 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{item.title}</span>
                      <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{item.description}</span>
                    </span>
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/link:-translate-y-px group-hover/link:translate-x-px group-hover/link:text-brand group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
