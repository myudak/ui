"use client"

import * as React from "react"
import { FileUpIcon } from "lucide-react"

import { cn } from "@/lib/cn"

type FileUploadProps = Omit<React.ComponentProps<"input">, "type"> & {
  hint?: React.ReactNode
}

function FileUpload({ className, hint = "PDF, PNG, or JPG · 10 MB max", id, onChange, disabled, ...props }: FileUploadProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const [fileName, setFileName] = React.useState("")

  return (
    <label
      data-slot="file-upload"
      htmlFor={inputId}
      data-disabled={disabled || undefined}
      className={cn(
        "group/file-upload flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl border border-dashed border-input bg-card px-6 py-8 text-center transition-colors hover:border-brand/60 hover:bg-brand-soft/30 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
    >
      <span className="mb-1 flex size-10 items-center justify-center rounded-lg border bg-background text-muted-foreground group-hover/file-upload:text-brand">
        <FileUpIcon className="size-4" aria-hidden="true" />
      </span>
      <span className="text-sm font-medium">{fileName || "Choose a file or drag it here"}</span>
      <span className="text-xs text-muted-foreground">{fileName ? "Ready to upload" : hint}</span>
      <input
        id={inputId}
        type="file"
        disabled={disabled}
        className="sr-only"
        onChange={(event) => {
          setFileName(event.target.files?.[0]?.name ?? "")
          onChange?.(event)
        }}
        {...props}
      />
    </label>
  )
}

export { FileUpload, type FileUploadProps }
