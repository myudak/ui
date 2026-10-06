import { Textarea } from "@/registry/manner/ui/textarea"

export default function TextareaDemo() {
  return (
    <Textarea
      aria-label="Message"
      className="max-w-md"
      placeholder="Write with clarity, then remove what the interface does not need."
    />
  )
}
