"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRightIcon, BookOpenIcon, ClipboardIcon, LayoutGridIcon, NotebookPenIcon, PaletteIcon } from "lucide-react"

import { cn } from "@/lib/cn"
import { Message } from "@/registry/manner/ai/message"
import { Reasoning } from "@/registry/manner/ai/reasoning"
import { ToolCall } from "@/registry/manner/ai/tool-call"
import { Timeline } from "@/registry/manner/editorial/timeline"
import { Alert, AlertDescription, AlertTitle } from "@/registry/manner/ui/alert"
import { Badge } from "@/registry/manner/ui/badge"
import { Button } from "@/registry/manner/ui/button"
import { Checkbox } from "@/registry/manner/ui/checkbox"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/registry/manner/ui/command"
import { DatePicker } from "@/registry/manner/ui/date-picker"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/manner/ui/empty"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"
import { Kbd } from "@/registry/manner/ui/kbd"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/manner/ui/select"
import { Switch } from "@/registry/manner/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/registry/manner/ui/toggle-group"

function Tile({
  href,
  label,
  className,
  children,
}: {
  href: string
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <article className={cn("group/tile flex min-w-0 flex-col rounded-2xl border bg-card p-5 sm:p-6", className)}>
      <header className="mb-5 flex items-center justify-between gap-3">
        <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{label}</span>
        <Link
          href={href}
          className="inline-flex items-center gap-1 rounded-sm text-xs text-muted-foreground outline-none hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Docs <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
        </Link>
      </header>
      {children}
    </article>
  )
}

/**
 * cmdk scrolls its selected item into view on mount, which would drag the page
 * down to an inline Command below the fold. Mount it once it is on screen.
 */
function MountWhenVisible({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={className}>{visible ? children : null}</div>
}

const cadences = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every two weeks" },
  { value: "monthly", label: "Monthly" },
]

function MilestoneForm() {
  const [created, setCreated] = React.useState(false)

  if (created) {
    return (
      <div className="flex flex-1 flex-col justify-center">
        <Alert variant="success">
          <AlertTitle>Milestone created</AlertTitle>
          <AlertDescription>It now appears in the planning workspace.</AlertDescription>
        </Alert>
        <Button variant="ghost" className="mt-3 self-start" onClick={() => setCreated(false)}>Create another</Button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault()
        setCreated(true)
      }}
    >
      <h3 className="font-heading text-2xl font-medium tracking-tight">Set a new milestone</h3>
      <p className="mt-1 text-sm text-muted-foreground">Define the outcome and the date. Keep the decision path explicit.</p>
      <FieldGroup className="mt-6 gap-5">
        <Field>
          <FieldLabel htmlFor="gallery-goal">Goal</FieldLabel>
          <Input id="gallery-goal" required defaultValue="Publish the component registry" />
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="gallery-date">Target date</FieldLabel>
            <DatePicker id="gallery-date" defaultValue={new Date(2026, 10, 12)} />
          </Field>
          <Field>
            <FieldLabel htmlFor="gallery-cadence">Check-ins</FieldLabel>
            <Select items={cadences} defaultValue="weekly">
              <SelectTrigger id="gallery-cadence" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {cadences.map((cadence) => <SelectItem key={cadence.value} value={cadence.value}>{cadence.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field orientation="horizontal">
          <Checkbox id="gallery-notify" defaultChecked />
          <FieldLabel htmlFor="gallery-notify">Notify the team</FieldLabel>
        </Field>
        <FieldDescription>Everyone on the project gets a calendar invite.</FieldDescription>
      </FieldGroup>
      <div className="mt-auto flex gap-2 pt-6">
        <Button type="submit">Create milestone</Button>
        <Button type="button" variant="ghost">Cancel</Button>
      </div>
    </form>
  )
}

export function Gallery() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
      <Tile href="/components/field" label="Form · Field, Select, Date Picker" className="md:col-span-3 md:row-span-2">
        <MilestoneForm />
      </Tile>

      <Tile href="/components/command" label="Overlay · Command" className="md:col-span-3">
        <MountWhenVisible className="min-h-[236px]">
        <Command className="rounded-xl border bg-background">
          <CommandInput placeholder="Search or run a command…" aria-label="Command search" />
          <CommandList className="max-h-48">
            <CommandGroup heading="Suggestions">
              <CommandItem><LayoutGridIcon /> Open component library</CommandItem>
              <CommandItem><BookOpenIcon /> Read DESIGN.md</CommandItem>
              <CommandItem><PaletteIcon /> Edit theme tokens</CommandItem>
              <CommandItem><ClipboardIcon /> Copy install command <CommandShortcut>⌘C</CommandShortcut></CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        </MountWhenVisible>
      </Tile>

      <Tile href="/components/switch" label="Controls" className="md:col-span-3">
        <div className="grid gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Continue</Button>
            <Button size="sm" variant="outline">Preview</Button>
            <Button size="sm" variant="ghost">Cancel</Button>
            <Badge variant="brand" className="ml-auto">Stable</Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ToggleGroup variant="outline" size="sm" defaultValue={["read"]} aria-label="Mode">
              <ToggleGroupItem value="read">Read</ToggleGroupItem>
              <ToggleGroupItem value="edit">Edit</ToggleGroupItem>
              <ToggleGroupItem value="review">Review</ToggleGroupItem>
            </ToggleGroup>
            <label className="flex items-center gap-2 text-sm">
              <Switch defaultChecked aria-label="Reduced motion" /> Reduced motion
            </label>
          </div>
          <p className="text-sm text-muted-foreground">
            Press <Kbd>Tab</Kbd> through every control — focus is always visible.
          </p>
        </div>
      </Tile>

      <Tile href="/components/message" label="AI · Message, Tool Call, Reasoning" className="md:col-span-4">
        <div className="grid gap-4">
          <Message from="user">Which surface pattern fits a documentation reader?</Message>
          <ToolCall name="registry.search" status="complete" duration="420ms">Found 6 compatible components.</ToolCall>
          <Message from="assistant">
            Use <strong className="font-medium">reader-01</strong>: one outline, a 68ch column, and notes in the margin
            instead of cards.
          </Message>
          <Reasoning summary="3 steps">Compared reading measure, removed surfaces that didn&apos;t explain grouping, kept one accent.</Reasoning>
        </div>
      </Tile>

      <article className="flex flex-col justify-between gap-8 rounded-2xl bg-primary p-6 text-primary-foreground md:col-span-2 dark:bg-brand-soft dark:text-foreground">
        <span className="font-mono text-xs tracking-wide uppercase opacity-70">Editorial · Quote</span>
        <blockquote className="font-heading text-2xl leading-snug tracking-tight text-balance">
          “The best design system doesn&apos;t make every product identical. It makes every decision legible.”
        </blockquote>
        <Link href="/components/quote" className="inline-flex items-center gap-1 self-start text-sm underline-offset-4 opacity-80 hover:underline hover:opacity-100">
          Manner principle 04 <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
        </Link>
      </article>

      <Tile href="/components/timeline" label="Editorial · Timeline" className="md:col-span-3">
        <Timeline
          items={[
            { date: "Today · 14:24", title: "Registry validated", description: "All 60 items passed schema checks." },
            { date: "Yesterday", title: "Dark tokens tuned", description: "Contrast verified on every surface." },
            { date: "Oct 1", title: "Moved to shadcn base-nova" },
          ]}
        />
      </Tile>

      <Tile href="/components/empty" label="Display · Empty" className="bg-muted/50 md:col-span-3">
        <Empty className="flex-1 border bg-background">
          <EmptyHeader>
            <EmptyMedia variant="icon"><NotebookPenIcon /></EmptyMedia>
            <EmptyTitle>No notes yet</EmptyTitle>
            <EmptyDescription>Empty, loading, and error states ship with every pattern — not as an afterthought.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent><Button size="sm">Create note</Button></EmptyContent>
        </Empty>
      </Tile>
    </div>
  )
}
