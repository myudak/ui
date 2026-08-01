"use client";

import * as React from "react";
type Item = { value: string; label: string; content: React.ReactNode };
export function Tabs({ items, defaultValue }: { items: Item[]; defaultValue?: string }) {
  const [value, setValue] = React.useState(defaultValue ?? items[0]?.value);
  const index = items.findIndex((item) => item.value === value);
  return <div className="manner-tabs"><div role="tablist" aria-label="Views" onKeyDown={(event) => { if (!["ArrowLeft","ArrowRight"].includes(event.key)) return; event.preventDefault(); const delta = event.key === "ArrowRight" ? 1 : -1; setValue(items[(index + delta + items.length) % items.length].value); }}>{items.map((item) => <button key={item.value} role="tab" aria-selected={value === item.value} onClick={() => setValue(item.value)}>{item.label}</button>)}</div><div role="tabpanel">{items.find((item) => item.value === value)?.content}</div></div>;
}
