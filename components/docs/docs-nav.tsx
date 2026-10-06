"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { catalogGroups, componentCatalog } from "@/lib/catalog"
import { cn } from "@/lib/cn"

const linkClass =
  "block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-accent aria-[current=page]:font-medium aria-[current=page]:text-foreground"

export function DocsNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Components" className={cn("grid gap-6 text-sm", className)}>
      <div>
        <p className="px-2.5 pb-1.5 font-mono text-xs tracking-wide text-muted-foreground uppercase">Get started</p>
        {[
          { title: "All components", href: "/components" },
          { title: "Blocks", href: "/blocks" },
          { title: "Foundations", href: "/foundations" },
          { title: "Agents", href: "/agents" },
        ].map((item) => (
          <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={linkClass}>
            {item.title}
          </Link>
        ))}
      </div>
      {catalogGroups.map((group) => (
        <div key={group}>
          <p className="px-2.5 pb-1.5 font-mono text-xs tracking-wide text-muted-foreground uppercase">{group}</p>
          {componentCatalog
            .filter((item) => item.group === group)
            .map((item) => {
              const href = `/components/${item.name}`
              return (
                <Link key={item.name} href={href} aria-current={pathname === href ? "page" : undefined} className={linkClass}>
                  {item.title}
                </Link>
              )
            })}
        </div>
      ))}
    </nav>
  )
}
