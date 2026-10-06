import { CopyIcon, ThumbsUpIcon } from "lucide-react"

import { Message } from "@/registry/manner/ai/message"
import { Button } from "@/registry/manner/ui/button"

export default function MessageDemo() {
  return (
    <div className="grid w-full max-w-lg gap-5">
      <Message from="user">Which surface pattern fits a documentation reader?</Message>
      <Message
        from="assistant"
        actions={
          <>
            <Button variant="ghost" size="icon-xs" aria-label="Copy answer"><CopyIcon /></Button>
            <Button variant="ghost" size="icon-xs" aria-label="Mark as useful"><ThumbsUpIcon /></Button>
          </>
        }
      >
        Use the reader block: one persistent outline, a 68ch reading column, and notes in the margin instead of cards.
      </Message>
    </div>
  )
}
