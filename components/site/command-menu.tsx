"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { BookOpenIcon, BotIcon, ComponentIcon, LayoutTemplateIcon, PaletteIcon, SearchIcon } from "lucide-react"

import { catalogGroups, componentCatalog, blockCatalog } from "@/lib/catalog"
import { cn } from "@/lib/cn"
import { Button } from "@/registry/manner/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/manner/ui/command"
import { Kbd, KbdGroup } from "@/registry/manner/ui/kbd"

const pages = [
  { title: "Components", href: "/components", icon: ComponentIcon },
  { title: "Blocks", href: "/blocks", icon: LayoutTemplateIcon },
  { title: "Foundations", href: "/foundations", icon: PaletteIcon },
  { title: "Agents & DESIGN.md", href: "/agents", icon: BotIcon },
]

export function CommandMenu({ className }: { className?: string }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const typing = target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        aria-label="Search docs"
        className={cn(
          "size-9 justify-center gap-2 bg-card/60 px-0 font-normal text-muted-foreground shadow-none sm:w-56 sm:justify-start sm:pr-1.5 sm:pl-3",
          className
        )}
      >
        <SearchIcon />
        <span className="hidden flex-1 text-left sm:inline">Search docs…</span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search Manner" description="Search components, blocks, and pages">
        <Command>
          <CommandInput placeholder="Search components, blocks, pages…" />
          <CommandList className="max-h-[min(60vh,420px)]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {pages.map((page) => (
                <CommandItem key={page.href} value={page.title} onSelect={() => go(page.href)}>
                  <page.icon />
                  {page.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            {catalogGroups.map((group) => (
              <CommandGroup key={group} heading={group}>
                {componentCatalog
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem
                      key={item.name}
                      value={`${item.title} ${item.name} ${group}`}
                      onSelect={() => go(`/components/${item.name}`)}
                    >
                      <ComponentIcon />
                      {item.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Blocks">
              {blockCatalog.map((block) => (
                <CommandItem key={block.name} value={`${block.title} ${block.name}`} onSelect={() => go(`/blocks/${block.name}`)}>
                  <LayoutTemplateIcon />
                  {block.title}
                  <span className="ml-auto font-mono text-xs text-muted-foreground">{block.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Files">
              <CommandItem value="DESIGN.md design rules" onSelect={() => go("/agents#design")}>
                <BookOpenIcon />
                DESIGN.md
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
