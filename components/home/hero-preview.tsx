"use client"

import * as React from "react"
import { CheckIcon, SparklesIcon } from "lucide-react"

import { ToolCall } from "@/registry/manner/ai/tool-call"
import { Badge } from "@/registry/manner/ui/badge"
import { Button } from "@/registry/manner/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/manner/ui/card"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"
import { Progress, ProgressLabel, ProgressValue } from "@/registry/manner/ui/progress"
import { Switch } from "@/registry/manner/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/registry/manner/ui/tabs"

const checks = ["Keyboard", "Contrast", "Reduced motion", "Mobile"]

/** A small, real product composition built only from Manner components. */
export function HeroPreview() {
  const [done, setDone] = React.useState(3)
  const [published, setPublished] = React.useState(false)
  const progress = Math.round((done / checks.length) * 100)

  return (
    <div className="relative">
      <Card className="relative z-10 shadow-2xl shadow-foreground/8">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <Badge variant={published ? "secondary" : "brand"}>{published ? "Published" : "In review"}</Badge>
            <Tabs defaultValue="checks">
              <TabsList className="h-8">
                <TabsTrigger value="checks" className="text-xs">Checks</TabsTrigger>
                <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <CardTitle className="mt-3 text-2xl">Release 0.2 review</CardTitle>
          <CardDescription>Ship when every check passes.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-5">
            <Progress value={progress}>
              <ProgressLabel>Readiness</ProgressLabel>
              <ProgressValue />
            </Progress>
            <ul className="grid grid-cols-2 gap-2">
              {checks.map((check, index) => {
                const complete = index < done
                return (
                  <li key={check}>
                    <button
                      type="button"
                      aria-pressed={complete}
                      onClick={() => setDone(complete ? index : index + 1)}
                      className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:border-success/40 aria-pressed:bg-success/8"
                    >
                      <span className="flex size-4 items-center justify-center rounded-full border border-current/40 text-success">
                        {complete && <CheckIcon className="size-3" aria-hidden="true" />}
                      </span>
                      {check}
                    </button>
                  </li>
                )
              })}
            </ul>
            <Field>
              <FieldLabel htmlFor="hero-version">Version label</FieldLabel>
              <Input id="hero-version" defaultValue="Manner 0.2 — shadcn foundation" />
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="hero-notify">Notify subscribers</FieldLabel>
                <FieldDescription>Send the changelog by email.</FieldDescription>
              </FieldContent>
              <Switch id="hero-notify" defaultChecked />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="ghost" onClick={() => { setDone(0); setPublished(false) }}>Reset</Button>
          <Button variant="brand" disabled={done < checks.length && !published} onClick={() => setPublished(true)}>
            {published ? <><CheckIcon data-icon="inline-start" /> Published</> : "Publish release"}
          </Button>
        </CardFooter>
      </Card>
      <div className="absolute -bottom-8 -left-10 z-20 hidden w-72 rotate-[-1.5deg] xl:block">
        <ToolCall name="add @manner/card" status="complete" duration="1.2s" className="shadow-xl shadow-foreground/10" />
      </div>
      <div className="absolute -top-5 -right-6 z-20 hidden items-center gap-2 rounded-full border bg-popover px-3 py-1.5 text-xs shadow-lg shadow-foreground/10 xl:flex">
        <SparklesIcon className="size-3.5 text-brand" aria-hidden="true" />
        Every pixel here is a Manner component
      </div>
    </div>
  )
}
