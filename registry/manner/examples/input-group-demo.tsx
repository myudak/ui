import { SearchIcon } from "lucide-react"

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/registry/manner/ui/input-group"
import { Kbd } from "@/registry/manner/ui/kbd"

export default function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <InputGroup>
        <InputGroupInput aria-label="Search components" placeholder="Search components" />
        <InputGroupAddon><SearchIcon /></InputGroupAddon>
        <InputGroupAddon align="inline-end"><Kbd>⌘K</Kbd></InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon><InputGroupText>ui.myudak.com/</InputGroupText></InputGroupAddon>
        <InputGroupInput aria-label="Workspace slug" defaultValue="margin-notes" />
      </InputGroup>
    </div>
  )
}
