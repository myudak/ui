"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/cn"
import { Button } from "@/registry/manner/ui/button"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/manner/ui/select"
import { Switch } from "@/registry/manner/ui/switch"

const sections = ["Profile", "Appearance", "Writing", "Integrations", "Advanced"]
const tones = [
  { value: "editorial", label: "Editorial warm" },
  { value: "neutral", label: "Quiet neutral" },
  { value: "dense", label: "Dense product" },
]

function SettingsBlock() {
  const [section, setSection] = React.useState("Writing")
  const [saved, setSaved] = React.useState(false)
  const markDirty = () => setSaved(false)

  return (
    <div className="grid grid-cols-1 min-h-svh bg-background md:grid-cols-[220px_1fr]">
      <aside className="border-b bg-muted/40 p-4 md:border-r md:border-b-0 md:p-6">
        <p className="px-3 font-mono text-xs tracking-wide text-muted-foreground uppercase">Settings</p>
        <nav aria-label="Settings sections" className="mt-3 flex gap-1 overflow-x-auto md:flex-col">
          {sections.map((item) => (
            <button
              key={item}
              type="button"
              aria-current={section === item ? "page" : undefined}
              onClick={() => setSection(item)}
              className={cn(
                "rounded-md px-3 py-2 text-left text-sm whitespace-nowrap text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                section === item && "bg-background font-medium text-foreground shadow-xs ring-1 ring-border"
              )}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="w-full max-w-2xl p-6 sm:p-10">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">{section}</p>
        <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight">Writing preferences</h1>
        <p className="mt-2 text-sm text-muted-foreground">Choose how the workspace responds while you think and write.</p>
        <form
          className="mt-8"
          onChange={markDirty}
          onSubmit={(event) => {
            event.preventDefault()
            setSaved(true)
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="settings-01-name">Workspace name</FieldLabel>
              <Input id="settings-01-name" defaultValue="Margin notes" />
              <FieldDescription>Shown to collaborators in shared links.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="settings-01-tone">Writing tone</FieldLabel>
              <Select items={tones} defaultValue="editorial" onValueChange={markDirty}>
                <SelectTrigger id="settings-01-tone" className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <FieldSeparator />
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="settings-01-motion">Reduced motion</FieldLabel>
                <FieldDescription>Simplify transitions and panel movement.</FieldDescription>
              </FieldContent>
              <Switch id="settings-01-motion" defaultChecked onCheckedChange={markDirty} />
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="settings-01-focus">Focus mode by default</FieldLabel>
                <FieldDescription>Hide navigation when a document opens.</FieldDescription>
              </FieldContent>
              <Switch id="settings-01-focus" onCheckedChange={markDirty} />
            </Field>
          </FieldGroup>
          <div className="mt-8 flex items-center gap-3">
            <Button type="submit">{saved ? <><CheckIcon data-icon="inline-start" /> Saved</> : "Save preferences"}</Button>
            <Button type="reset" variant="ghost" onClick={markDirty}>Reset</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export { SettingsBlock }
