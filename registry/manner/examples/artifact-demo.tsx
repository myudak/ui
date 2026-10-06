import { CopyIcon } from "lucide-react"

import { Artifact } from "@/registry/manner/ai/artifact"
import { Button } from "@/registry/manner/ui/button"

export default function ArtifactDemo() {
  return (
    <Artifact
      title="DESIGN.md"
      type="Markdown"
      className="w-full max-w-md"
      actions={<Button variant="ghost" size="icon-sm" aria-label="Copy artifact"><CopyIcon /></Button>}
    >
      <pre className="whitespace-pre-wrap">{`# Interface direction\n\nBuild for reading first.\nUse semantic tokens only.\n\n## Required states\n- loading · empty · error`}</pre>
    </Artifact>
  )
}
