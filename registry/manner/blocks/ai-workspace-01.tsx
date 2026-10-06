"use client"

import * as React from "react"
import { CopyIcon, ThumbsUpIcon } from "lucide-react"

import { Artifact } from "@/registry/manner/ai/artifact"
import { Composer } from "@/registry/manner/ai/composer"
import { Message } from "@/registry/manner/ai/message"
import { ToolCall } from "@/registry/manner/ai/tool-call"
import { Button } from "@/registry/manner/ui/button"

function AIWorkspaceBlock() {
  const [value, setValue] = React.useState("Turn that into an implementation checklist")
  const [messages, setMessages] = React.useState<string[]>([])

  return (
    <div className="grid grid-cols-1 h-svh min-h-[560px] bg-background lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <main className="grid min-h-0 grid-rows-[auto_1fr_auto]">
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary font-heading text-primary-foreground">M</span>
          <div>
            <strong className="block text-sm font-medium">Design review</strong>
            <span className="text-xs text-muted-foreground">3 sources attached</span>
          </div>
        </header>
        <div className="flex min-h-0 flex-col gap-6 overflow-y-auto p-6">
          <Message from="user">How should this dashboard adapt on mobile?</Message>
          <ToolCall name="layout.inspect" status="complete" duration="320ms">
            Found 3 persistent panels and 1 sidebar.
          </ToolCall>
          <Message
            from="assistant"
            actions={
              <>
                <Button variant="ghost" size="icon-xs" aria-label="Copy answer"><CopyIcon /></Button>
                <Button variant="ghost" size="icon-xs" aria-label="Mark as useful"><ThumbsUpIcon /></Button>
              </>
            }
          >
            Keep one primary panel at a time. Replace the persistent sidebar with a sheet, and move the artifact into a
            full-screen drawer.
          </Message>
          {messages.map((message, index) => (
            <Message from="user" key={index}>{message}</Message>
          ))}
        </div>
        <Composer
          value={value}
          onValueChange={setValue}
          onSubmit={(message) => {
            setMessages((current) => [...current, message])
            setValue("")
          }}
          className="m-4 mt-0"
        />
      </main>
      <aside className="hidden border-l bg-muted/40 p-6 lg:block">
        <Artifact title="mobile-plan.md" type="Markdown">
          <pre className="whitespace-pre-wrap">{`# Mobile adaptation\n\n- one active panel\n- sidebar → sheet\n- artifact → drawer\n- keep actions visible`}</pre>
        </Artifact>
      </aside>
    </div>
  )
}

export { AIWorkspaceBlock }
