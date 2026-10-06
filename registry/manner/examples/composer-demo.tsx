"use client"

import * as React from "react"

import { Composer } from "@/registry/manner/ai/composer"

export default function ComposerDemo() {
  const [value, setValue] = React.useState("Build a responsive settings workspace")
  const [sent, setSent] = React.useState<string | null>(null)

  return (
    <div className="grid w-full max-w-lg gap-2">
      <Composer
        value={value}
        onValueChange={setValue}
        onSubmit={(message) => {
          setSent(message)
          setValue("")
        }}
      />
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {sent ? `Sent: “${sent}”` : "Press ⌘ ↵ to send."}
      </p>
    </div>
  )
}
