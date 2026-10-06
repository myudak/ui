import { Surface } from "@/registry/manner/editorial/surface"

export default function SurfaceDemo() {
  return (
    <div className="grid grid-cols-1 w-full max-w-2xl gap-3 sm:grid-cols-3">
      {(["default", "inset", "raised"] as const).map((tone) => (
        <Surface key={tone} tone={tone}>
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{tone}</p>
          <p className="mt-6 font-heading text-lg font-medium">Three checks remaining</p>
        </Surface>
      ))}
    </div>
  )
}
