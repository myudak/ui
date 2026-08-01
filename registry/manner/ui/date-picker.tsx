import * as React from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/cn";

export function DatePicker({ label = "Date", className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const id = React.useId();
  return <label className={cn("manner-date-picker", className)} htmlFor={props.id ?? id}><span>{label}</span><div><input id={props.id ?? id} type="date" {...props}/><CalendarDays aria-hidden="true" /></div></label>;
}
