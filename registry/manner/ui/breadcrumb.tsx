import { ChevronRight } from "lucide-react";
export function Breadcrumb({ items }: { items: Array<string | { label: string; href: string }> }) {
  return <nav className="manner-breadcrumb" aria-label="Breadcrumb"><ol>{items.map((item, index) => { const label = typeof item === "string" ? item : item.label; return <li key={label}>{index > 0 && <ChevronRight aria-hidden="true"/>}{typeof item === "string" || index === items.length - 1 ? <span aria-current={index === items.length - 1 ? "page" : undefined}>{label}</span> : <a href={item.href}>{label}</a>}</li>; })}</ol></nav>;
}
