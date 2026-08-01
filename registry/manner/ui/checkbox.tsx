"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function Checkbox({ children, className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const id = React.useId();
  return <label htmlFor={props.id ?? id} className={cn("manner-checkbox", className)}><span><input id={props.id ?? id} type="checkbox" {...props}/><i><Check aria-hidden="true" /></i></span>{children && <em>{children}</em>}</label>;
}
