import { Skeleton } from "@/registry/manner/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4" aria-busy="true" aria-label="Loading profile">
      <Skeleton className="size-12 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
