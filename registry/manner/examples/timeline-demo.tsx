import { Timeline } from "@/registry/manner/editorial/timeline"

export default function TimelineDemo() {
  return (
    <Timeline
      className="max-w-md"
      items={[
        { date: "Today · 14:24", title: "Registry validated", description: "All component metadata passed schema checks." },
        { date: "Yesterday", title: "Warm-dark tokens approved", description: "Contrast verified across every surface." },
        { date: "Aug 12", title: "Agent rules published" },
      ]}
    />
  )
}
