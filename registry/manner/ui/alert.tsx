import * as React from "react";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { cn } from "@/lib/cn";
export function Alert({ title, tone = "info", children, className }: { title: string; tone?: "info" | "success" | "warning" | "danger"; children?: React.ReactNode; className?: string }) {
  const Icon = tone === "success" ? CircleCheck : tone === "warning" || tone === "danger" ? CircleAlert : Info;
  return <div className={cn("manner-alert", `tone-${tone}`, className)} role={tone === "danger" ? "alert" : "status"}><Icon aria-hidden="true"/><div><strong>{title}</strong>{children && <p>{children}</p>}</div></div>;
}
