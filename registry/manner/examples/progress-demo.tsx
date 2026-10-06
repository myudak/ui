import { Progress, ProgressLabel, ProgressValue } from "@/registry/manner/ui/progress"

export default function ProgressDemo() {
  return (
    <Progress value={82} className="w-full max-w-sm">
      <ProgressLabel>Release readiness</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}
