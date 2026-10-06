import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/cn"

type StepperProps = React.ComponentProps<"ol"> & {
  /** 1-based index of the current step. */
  current: number
  steps: string[]
}

function Stepper({ current, steps, className, ...props }: StepperProps) {
  return (
    <ol
      data-slot="stepper"
      className={cn("flex w-full items-center gap-2 text-sm", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const position = index + 1
        const state = position < current ? "complete" : position === current ? "current" : "upcoming"
        return (
          <li
            key={step}
            data-state={state}
            aria-current={state === "current" ? "step" : undefined}
            className="group/step flex min-w-0 flex-1 items-center gap-2 not-last:after:h-px not-last:after:min-w-4 not-last:after:flex-1 not-last:after:bg-border data-[state=complete]:not-last:after:bg-foreground/40"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors group-data-[state=complete]/step:border-foreground group-data-[state=complete]/step:bg-foreground group-data-[state=complete]/step:text-background group-data-[state=current]/step:border-brand group-data-[state=current]/step:text-brand group-data-[state=upcoming]/step:text-muted-foreground">
              {state === "complete" ? <CheckIcon className="size-3.5" aria-hidden="true" /> : position}
            </span>
            <span className="truncate font-medium group-data-[state=upcoming]/step:text-muted-foreground">
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper, type StepperProps }
