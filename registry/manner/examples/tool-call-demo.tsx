import { ToolCall } from "@/registry/manner/ai/tool-call"

export default function ToolCallDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <ToolCall name="registry.search" status="complete" duration="420ms">
        <code className="font-mono text-xs">{`{ query: "editorial reader", limit: 6 }`}</code>
        <p className="mt-1">Found 6 compatible components.</p>
      </ToolCall>
      <ToolCall name="shadcn.add" status="running" />
    </div>
  )
}
