import * as React from "react";
import { cn } from "@/lib/cn";
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("manner-skeleton", className)} aria-hidden="true" {...props}/>; }
