# Changelog

## 0.2.0 — shadcn foundation

Manner is now built on shadcn's **base-nova** style (Base UI).

### Fixed

- Components installed from the registry are fully styled. In 0.1, fifteen items (card, alert, tabs, tooltip, drawer, checkbox, radio-group, date-picker, file-upload, progress, skeleton, stepper, pagination, breadcrumb, empty-state) relied on CSS that only existed on the docs site.

### Tokens — breaking

Tokens use shadcn's standard names. `@manner/manner-theme` keeps 0.1 aliases for one release.

| 0.1 | 0.2 |
| --- | --- |
| `--canvas` | `--background` |
| `--surface` | `--card` / `--popover` |
| `--surface-inset` | `--muted` |
| `--ink` | `--foreground` (and `--primary` for ink actions) |
| `--ink-secondary` | `--foreground` at 80%, or `--muted-foreground` |
| `--muted` (text) | `--muted-foreground` — **`--muted` is now a surface** |
| `--accent` (terracotta) | `--brand` — **`--accent` is now the hover surface** |
| `--accent-soft` | `--brand-soft` |
| `--border-subtle` / `--border` | `--border` / `--input` |
| `--focus` | `--ring` |
| `--danger` | `--destructive` |

Use Tailwind utilities (`bg-card`, `text-muted-foreground`, `text-brand`) instead of `bg-[var(--surface)]`.

### Components — breaking

Primitives now follow shadcn's compositional APIs and Base UI's `render` prop:

- `Tabs items={…}` → `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent`
- `Alert tone="success"` → `Alert variant="success"` with `AlertTitle` / `AlertDescription`
- `Card` gains `CardTitle`, `CardDescription`, `CardAction`
- `Tooltip content="…"` → `Tooltip` / `TooltipTrigger` / `TooltipContent`
- `Drawer title trigger` → `Drawer` / `DrawerTrigger` / `DrawerContent` / …
- `RadioGroup options={…}` → `RadioGroup` / `RadioGroupItem`
- `Checkbox` children → pair with `Field` + `FieldLabel`
- `Breadcrumb items={…}` and `Pagination page total` → shadcn compositions
- `Progress label` → `ProgressLabel` / `ProgressValue` children
- `DatePicker` takes a `Date` (`defaultValue`, `value`, `onValueChange`) and opens a calendar popover
- `Button` variants: `default` (was `primary`), `brand`, `outline`, `secondary`, `ghost`, `destructive` (was `danger`), `link`
- `empty-state` is replaced by `empty` (`Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`)

### Added

`accordion`, `badge`, `calendar`, `dropdown-menu`, `input-group`, `kbd`, `label`, `navigation-menu`, `popover`, `scroll-area`, `separator`, `sheet`, `sidebar`, `toggle`, `toggle-group`, and the `use-mobile` hook.

### Site

New landing page, ⌘K search, statically generated `/components/[slug]` and `/blocks/[name]` pages with live previews, source, and install commands, responsive block viewer, and rebuilt Foundations and Agents pages. `/design` now redirects to `/agents#design`.
