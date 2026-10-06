import Link from "next/link"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Button } from "@/registry/manner/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main" className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">404 · Not found</p>
        <h1 className="mt-3 max-w-2xl font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
          This page left <em className="font-normal text-brand">no forwarding address.</em>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          The component or block may have been renamed in 0.2. Search with <kbd className="font-mono">⌘K</kbd>, or start from the index.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button nativeButton={false} render={<Link href="/components" />}>Browse components</Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/" />}>Home</Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
