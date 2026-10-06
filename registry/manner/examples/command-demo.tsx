import { BookOpenIcon, ClipboardIcon, LayoutGridIcon, PaletteIcon } from "lucide-react"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/registry/manner/ui/command"

export default function CommandDemo() {
  return (
    <Command className="w-full max-w-md border">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem><LayoutGridIcon /> Open component library</CommandItem>
          <CommandItem><BookOpenIcon /> Read DESIGN.md</CommandItem>
          <CommandItem><PaletteIcon /> Foundations</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem><ClipboardIcon /> Copy install command <CommandShortcut>⌘C</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
