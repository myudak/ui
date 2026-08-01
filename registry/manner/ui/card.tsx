import * as React from "react";
import { cn } from "@/lib/cn";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <section ref={ref} className={cn("manner-card", className)} {...props}/>); Card.displayName = "Card";
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <header ref={ref} className={cn("manner-card-header", className)} {...props}/>); CardHeader.displayName = "CardHeader";
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("manner-card-content", className)} {...props}/>); CardContent.displayName = "CardContent";
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <footer ref={ref} className={cn("manner-card-footer", className)} {...props}/>); CardFooter.displayName = "CardFooter";
