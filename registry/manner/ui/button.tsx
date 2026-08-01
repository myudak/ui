"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/cn"

const buttonVariants = cva(
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-sm,6px)] px-4 text-sm font-medium transition-[color,background-color,border-color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "border border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)] hover:border-[var(--accent)] hover:bg-[var(--accent)]",
        secondary: "border border-[var(--border)] bg-[var(--surface-inset)] text-[var(--ink)] hover:border-[var(--ink-secondary)]",
        outline: "border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        ghost: "border border-transparent bg-transparent text-[var(--ink-secondary)] hover:bg-[var(--surface-inset)] hover:text-[var(--ink)]",
        danger: "border border-[color-mix(in_oklab,var(--danger)_38%,var(--border))] bg-[color-mix(in_oklab,var(--danger)_10%,transparent)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white",
      },
      size: {
        sm: "min-h-8 px-3 text-xs",
        md: "min-h-10 px-4 text-sm",
        lg: "min-h-12 px-5 text-base",
        icon: "size-10 min-h-10 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
)

type ButtonProps = Omit<React.ComponentProps<typeof BaseButton>, "className"> &
  VariantProps<typeof buttonVariants> & { className?: string }

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
