import { Kbd, KbdGroup } from "@/registry/manner/ui/kbd"

export default function KbdDemo() {
  return (
    <p className="text-sm text-muted-foreground">
      Open search with <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>, send with <KbdGroup><Kbd>⌘</Kbd><Kbd>↵</Kbd></KbdGroup>.
    </p>
  )
}
