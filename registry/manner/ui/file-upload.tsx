"use client";

import * as React from "react";
import { FileUp } from "lucide-react";
import { cn } from "@/lib/cn";

export function FileUpload({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [name, setName] = React.useState("");
  const id = React.useId();
  return <label className={cn("manner-file-upload", className)} htmlFor={props.id ?? id}><FileUp aria-hidden="true"/><strong>{name || "Choose a file"}</strong><span>{name ? "Ready to upload" : "PDF, PNG, or JPG · 10 MB max"}</span><input id={props.id ?? id} type="file" {...props} onChange={(event) => { setName(event.target.files?.[0]?.name ?? ""); props.onChange?.(event); }}/></label>;
}
