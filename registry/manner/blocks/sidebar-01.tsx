"use client"

import * as React from "react"
import { BookOpenIcon, CheckCircle2Icon, HomeIcon, LayersIcon, PlusIcon } from "lucide-react"

import { Button } from "@/registry/manner/ui/button"
import { Separator } from "@/registry/manner/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/registry/manner/ui/sidebar"

const navigation = [
  { title: "Overview", icon: HomeIcon },
  { title: "Work", icon: LayersIcon, badge: "12" },
  { title: "Library", icon: BookOpenIcon },
  { title: "Review", icon: CheckCircle2Icon, badge: "2" },
]

const stats = [
  { label: "Open threads", value: "12", detail: "+3 this week" },
  { label: "Reading time", value: "4.2h", detail: "Across 8 notes" },
  { label: "Decisions", value: "07", detail: "2 need review" },
]

function SidebarBlock() {
  const [active, setActive] = React.useState("Overview")

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary font-heading text-primary-foreground">
                  M
                </span>
                <span className="grid leading-tight">
                  <strong className="font-heading text-base font-medium">Manner Studio</strong>
                  <span className="text-xs text-muted-foreground">Editorial workspace</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={active === item.title}
                      tooltip={item.title}
                      onClick={() => setActive(item.title)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[0.65rem] font-semibold text-brand">
                  MY
                </span>
                <span>Muchamad Yuda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-1 h-4" />
          <span className="text-sm text-muted-foreground">
            Workspace / <span className="text-foreground">{active}</span>
          </span>
          <Button size="sm" className="ml-auto">
            <PlusIcon data-icon="inline-start" /> New note
          </Button>
        </header>
        <main className="p-6 sm:p-10">
          <h1 className="font-heading text-4xl font-medium tracking-tight">Good afternoon.</h1>
          <p className="mt-2 text-muted-foreground">Three threads moved since yesterday.</p>
          <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl border sm:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.label} className="flex min-h-32 flex-col gap-1 border-b p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
                <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{stat.label}</span>
                <strong className="mt-auto font-heading text-3xl font-medium">{stat.value}</strong>
                <span className="text-sm text-brand">{stat.detail}</span>
              </article>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export { SidebarBlock }
