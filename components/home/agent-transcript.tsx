import { Message } from "@/registry/manner/ai/message"
import { ToolCall } from "@/registry/manner/ai/tool-call"

export function AgentTranscript() {
  return (
    <div className="grid gap-4 rounded-2xl border bg-card p-5 sm:p-6">
      <Message from="user">Add a settings page to our app. Use Manner.</Message>
      <ToolCall name="read DESIGN.md" status="complete" duration="80ms" />
      <ToolCall name="shadcn add @manner/settings-01" status="complete" duration="2.4s">
        Installed field, select, switch, button → components/ui
      </ToolCall>
      <Message from="assistant" label="Agent">
        Added <code className="font-mono text-[0.92em]">app/settings/page.tsx</code> from settings-01. Reused Field,
        Select, and Switch; added the saved and error states. One exception: the danger zone uses a destructive
        button, as DESIGN.md requires for irreversible actions.
      </Message>
    </div>
  )
}
