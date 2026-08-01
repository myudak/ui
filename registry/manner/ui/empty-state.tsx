import * as React from "react";
import { Plus } from "lucide-react";
export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) { return <div className="manner-empty-state"><span><Plus aria-hidden="true"/></span><h3>{title}</h3>{description && <p>{description}</p>}{action}</div>; }
