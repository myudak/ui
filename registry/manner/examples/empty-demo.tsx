import { NotebookPenIcon } from "lucide-react"

import { Button } from "@/registry/manner/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/manner/ui/empty"

export default function EmptyDemo() {
  return (
    <Empty className="max-w-md border">
      <EmptyHeader>
        <EmptyMedia variant="icon"><NotebookPenIcon /></EmptyMedia>
        <EmptyTitle>No notes yet</EmptyTitle>
        <EmptyDescription>Create the first note for this workspace, or import from Markdown.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center">
        <Button>Create note</Button>
        <Button variant="outline">Import</Button>
      </EmptyContent>
    </Empty>
  )
}
