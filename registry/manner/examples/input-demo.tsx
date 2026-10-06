import { Input } from "@/registry/manner/ui/input"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Input aria-label="Project name" placeholder="Margin notes" />
      <Input aria-label="Invalid email" type="email" defaultValue="yuda@" aria-invalid />
      <Input aria-label="Disabled input" placeholder="Read-only workspace" disabled />
    </div>
  )
}
