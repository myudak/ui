"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"

import { CommandMenu } from "@/components/site/command-menu"
import { GitHubIcon, LogoMark } from "@/components/site/logo"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { cn } from "@/lib/cn"
import { mainNav, siteConfig } from "@/lib/site"
import { Badge } from "@/registry/manner/ui/badge"
import { Button } from "@/registry/manner/ui/button"
import { Separator } from "@/registry/manner/ui/separator"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/manner/ui/sheet"

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="-ml-2 md:hidden" aria-label="Open navigation" />}>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <LogoMark /> Manner
              </SheetTitle>
              <SheetDescription>An editorial design system on shadcn.</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile" className="grid gap-1 px-4">
              {[{ title: "Home", href: "/" }, ...mainNav].map((item) => (
                <SheetClose
                  key={item.href}
                  render={
                    <Link
                      href={item.href}
                      aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                      className="rounded-md px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
                    />
                  }
                >
                  {item.title}
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-4 flex items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50" aria-label="Manner home">
          <LogoMark />
          <span className="font-heading text-lg font-medium tracking-tight">Manner</span>
          <Badge variant="outline" className="hidden font-mono sm:inline-flex">{siteConfig.version}</Badge>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                "aria-[current=page]:text-foreground aria-[current=page]:font-medium"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <CommandMenu />
          <Separator orientation="vertical" className="mx-1 hidden h-5 lg:block" />
          <Button variant="ghost" size="icon" nativeButton={false} render={<a href={siteConfig.github} target="_blank" rel="noreferrer" />} aria-label="Manner on GitHub">
            <GitHubIcon />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
