import { SectionHeading } from "@/registry/manner/editorial/section-heading"
import { Button } from "@/registry/manner/ui/button"

export default function SectionHeadingDemo() {
  return (
    <SectionHeading
      className="w-full max-w-2xl"
      eyebrow="Foundations / 02"
      title={<>Structure before <em className="font-normal text-brand">decoration.</em></>}
      description="Every border, surface, and motion should explain hierarchy or state."
      action={<Button variant="outline" size="sm">Read the rules</Button>}
    />
  )
}
