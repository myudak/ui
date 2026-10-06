"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/cn"
import { Button } from "@/registry/manner/ui/button"
import { Calendar } from "@/registry/manner/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/manner/ui/popover"

type DatePickerProps = {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

const formatter = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" })

function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  disabled,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState(defaultValue)
  const date = value ?? internal

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            data-slot="date-picker"
            data-empty={!date || undefined}
            className={cn("w-full justify-between font-normal data-empty:text-muted-foreground", className)}
            {...props}
          />
        }
      >
        {date ? formatter.format(date) : placeholder}
        <CalendarIcon className="text-muted-foreground" aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(next) => {
            setInternal(next)
            onValueChange?.(next)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, type DatePickerProps }
