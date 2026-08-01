"use client"

import { Search } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/cn"

type CommandItem = { id: string; label: string; description?: string; keywords?: string[] }

type CommandProps = {
  items: CommandItem[]
  onSelect?: (item: CommandItem) => void
  placeholder?: string
  emptyText?: string
  className?: string
}

function Command({ items, onSelect, placeholder = "Type a command…", emptyText = "No commands found.", className }: CommandProps) {
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const filtered = React.useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return items
    return items.filter((item) => [item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(" ").toLowerCase().includes(value))
  }, [items, query])

  function select(item: CommandItem | undefined) {
    if (item) onSelect?.(item)
  }

  return (
    <div data-slot="command" className={cn("overflow-hidden rounded-[var(--radius-md,10px)] border border-[var(--border)] bg-[var(--surface)]", className)}>
      <label className="flex h-11 items-center gap-3 border-b border-[var(--border-subtle)] px-3">
        <Search aria-hidden="true" className="size-4 text-[var(--muted)]" />
        <span className="sr-only">Command search</span>
        <input
          aria-controls="manner-command-list"
          aria-expanded="true"
          aria-activedescendant={filtered[activeIndex] ? `command-${filtered[activeIndex].id}` : undefined}
          role="combobox"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, filtered.length - 1)) }
            if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)) }
            if (event.key === "Enter") { event.preventDefault(); select(filtered[activeIndex]) }
          }}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
        />
      </label>
      <div id="manner-command-list" role="listbox" className="max-h-72 overflow-y-auto p-1">
        {filtered.length ? filtered.map((item, index) => (
          <button
            id={`command-${item.id}`}
            key={item.id}
            role="option"
            aria-selected={index === activeIndex}
            className="grid w-full grid-cols-[1fr_auto] gap-4 rounded-[var(--radius-xs,4px)] px-3 py-2.5 text-left hover:bg-[var(--surface-inset)] aria-selected:bg-[var(--accent-soft)]"
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => select(item)}
          >
            <span><strong className="block text-sm font-medium">{item.label}</strong>{item.description && <small className="mt-0.5 block text-xs text-[var(--muted)]">{item.description}</small>}</span>
            <span aria-hidden="true" className="text-[var(--accent)]">↗</span>
          </button>
        )) : <p className="m-0 px-3 py-8 text-center text-sm text-[var(--muted)]">{emptyText}</p>}
      </div>
    </div>
  )
}

export { Command, type CommandItem, type CommandProps }
