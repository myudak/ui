"use client"

import * as React from "react"

import { Artifact } from "@/registry/manner/ai/artifact"
import { Composer } from "@/registry/manner/ai/composer"
import { Message } from "@/registry/manner/ai/message"

function AIWorkspaceBlock() {
  const [value, setValue] = React.useState("Turn that into an implementation checklist")
  const [messages, setMessages] = React.useState<string[]>([])
  return (
    <div className="grid min-h-[570px] overflow-hidden rounded-[var(--radius-lg,14px)] border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[1.08fr_.92fr]">
      <main className="grid min-h-0 grid-rows-[auto_1fr_auto]"><header className="flex h-14 items-center gap-3 border-b border-[var(--border)] px-4"><span className="grid size-8 place-items-center rounded-full bg-[var(--ink)] font-[family-name:var(--serif)] text-[var(--canvas)]">M</span><div><strong className="block text-sm">Design review</strong><small className="text-xs text-[var(--muted)]">3 sources attached</small></div></header><div className="flex flex-col gap-6 overflow-y-auto p-6"><Message from="user">How should this dashboard adapt on mobile?</Message><Message from="assistant" actions={<><button>Copy</button><button>Useful</button></>}>Keep one primary panel at a time. Replace the persistent sidebar with a sheet, and move the artifact into a full-screen drawer.</Message>{messages.map((message) => <Message from="user" key={message}>{message}</Message>)}</div><Composer value={value} onValueChange={setValue} onSubmit={(message) => { setMessages((current) => [...current, message]); setValue("") }} className="m-4" /></main><aside className="hidden bg-[var(--ink)] p-5 text-[var(--canvas)] lg:block"><Artifact title="mobile-plan.md" type="Markdown" className="border-[color-mix(in_oklab,var(--canvas)_18%,transparent)] bg-transparent text-[var(--canvas)]"><pre className="m-0 whitespace-pre-wrap">{`# Mobile adaptation\n\n- one active panel\n- sidebar → sheet\n- artifact → drawer\n- keep actions visible`}</pre></Artifact></aside>
    </div>
  )
}

export { AIWorkspaceBlock }
