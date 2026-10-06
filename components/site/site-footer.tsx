import Link from "next/link"

import { LogoMark } from "@/components/site/logo"
import { mainNav, siteConfig } from "@/lib/site"

const resources = [
  { title: "DESIGN.md", href: "/DESIGN.md" },
  { title: "llms.txt", href: "/llms.txt" },
  { title: "ai.json", href: "/ai.json" },
  { title: "Registry index", href: "/r/index.json" },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-heading text-lg font-medium">Manner</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An editorial design system on shadcn and Base UI. Source you own, rules your agents can read.
          </p>
        </div>
        <nav aria-label="Documentation">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">Docs</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:underline-offset-4">{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Machine-readable resources">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">For agents</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {resources.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="font-mono hover:underline hover:underline-offset-4">{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 border-t px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
        <p>MIT licensed · v{siteConfig.version}</p>
        <p>
          Built on{" "}
          <a href="https://ui.shadcn.com" className="underline underline-offset-4 hover:text-foreground">shadcn/ui</a> and{" "}
          <a href="https://base-ui.com" className="underline underline-offset-4 hover:text-foreground">Base UI</a> ·{" "}
          <a href={siteConfig.github} className="underline underline-offset-4 hover:text-foreground">Source on GitHub</a>
        </p>
      </div>
    </footer>
  )
}
