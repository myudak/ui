import { ArrowRightIcon, PlusIcon } from "lucide-react"

import { Button } from "@/registry/manner/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        Continue <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="brand">Publish</Button>
      <Button variant="outline">Preview</Button>
      <Button variant="secondary">Duplicate</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" size="icon" aria-label="Add item">
        <PlusIcon />
      </Button>
    </div>
  )
}
