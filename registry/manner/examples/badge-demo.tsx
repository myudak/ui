import { Badge } from "@/registry/manner/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Stable</Badge>
      <Badge variant="brand">New</Badge>
      <Badge variant="secondary">Base UI</Badge>
      <Badge variant="outline">v0.2.0</Badge>
      <Badge variant="destructive">Deprecated</Badge>
    </div>
  )
}
