# Manner UI — agent instructions

Manner is a source-owned React design system with a shadcn-compatible registry.
Use it when building interfaces that should feel warm, editorial, calm, and
deliberate under real product pressure.

## Read first

- Design rules: https://ui.myudak.com/DESIGN.md
- Agent workflow: https://ui.myudak.com/MANNER_AGENT.md
- Machine-readable manifest: https://ui.myudak.com/ai.json
- Compact model guide: https://ui.myudak.com/llms.txt
- Full model guide: https://ui.myudak.com/llms-full.txt
- Source repository: https://github.com/myudak/ui

## Before writing UI

1. Inspect the existing application structure, `components.json`, and tokens.
2. Search installed source and the Manner registry before creating a primitive.
3. Reuse an existing Manner component or block when it expresses the task.
4. Prefer semantic tokens over hard-coded colors, spacing, and radii.
5. Preserve the accessible behavior of Base UI-backed controls.

## Registry

Configure the namespace once:

```bash
pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json
```

Install source into the consumer project:

```bash
pnpm dlx shadcn@latest add @manner/button
pnpm dlx shadcn@latest add @manner/sidebar-01
pnpm dlx shadcn@latest add @manner/agent-rules
```

The source is intentionally copied into the application. Adapt the files after
installation; do not wrap them behind an opaque package abstraction.

## Visual rules

- Display typography: Fraunces Variable or an equivalent warm editorial serif.
- Interface typography: Geist or Inter Variable.
- Code and metadata: IBM Plex Mono or an equivalent monospace.
- Use thin borders and tonal contrast before shadows.
- Use surfaces only when they clarify grouping; avoid card soup.
- Reserve pills for statuses, tags, and compact filters.
- Use accent color for intent, not decoration everywhere.
- Motion should explain entry, state change, hierarchy, or spatial origin.
- Keep hover movement to roughly 1–2px and respect reduced motion.

## Quality bar

Implement loading, empty, error, disabled, and overflow states where relevant.
Verify keyboard operation, visible focus, accessible names, light/dark themes,
mobile transformation, long content, and `prefers-reduced-motion`. Report any
intentional exception to `DESIGN.md` when handing off the work.
