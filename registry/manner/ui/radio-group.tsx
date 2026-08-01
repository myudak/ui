"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type Option = { value: string; label: string; description?: string };
export function RadioGroup({ name, options, value, defaultValue, onValueChange, className }: { name?: string; options: Option[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; className?: string }) {
  const generated = React.useId();
  return <fieldset className={cn("manner-radio-group", className)}>{options.map((option) => <label key={option.value}><input type="radio" name={name ?? generated} value={option.value} checked={value === undefined ? undefined : value === option.value} defaultChecked={value === undefined ? defaultValue === option.value : undefined} onChange={() => onValueChange?.(option.value)}/><i/><span><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span></label>)}</fieldset>;
}
