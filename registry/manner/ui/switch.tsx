"use client"

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import * as React from "react"

import { cn } from "@/lib/cn"

type SwitchProps = Omit<React.ComponentProps<typeof BaseSwitch.Root>, "className"> & { className?: string }

function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-[var(--border)] bg-[var(--surface-inset)] p-0.5 outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] data-[checked]:border-[var(--accent)] data-[checked]:bg-[var(--accent-soft)] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="block size-[18px] rounded-full bg-[var(--ink-secondary)] transition-transform duration-150 data-[checked]:translate-x-5 data-[checked]:bg-[var(--accent)]" />
    </BaseSwitch.Root>
  )
}

export { Switch, type SwitchProps }
