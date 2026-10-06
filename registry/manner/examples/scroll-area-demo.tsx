import { ScrollArea } from "@/registry/manner/ui/scroll-area"
import { Separator } from "@/registry/manner/ui/separator"

const releases = Array.from({ length: 20 }, (_, index) => `v0.${20 - index}.0`)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-64 w-48 rounded-lg border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium">Releases</h4>
        {releases.map((release) => (
          <div key={release}>
            <div className="font-mono text-sm">{release}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
