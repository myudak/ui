import { CopyIcon } from "lucide-react"

import { Button } from "@/registry/manner/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/manner/ui/tooltip"

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Copy source" />}>
        <CopyIcon />
      </TooltipTrigger>
      <TooltipContent>Copy component source</TooltipContent>
    </Tooltip>
  )
}
