# Manner Interface Rules

Manner is a warm, editorial interface system for thoughtful software.
It is independent and is not affiliated with Anthropic or Claude.

## Product feeling

Interfaces should feel literate, calm, curious, competent, warm, and slightly unconventional. They should never feel corporate-luxury, faux-vintage, overly cute, or generically AI-generated.

## Non-negotiable rules

- Use semantic design tokens. Do not add arbitrary color values inside components.
- Search existing components and blocks before creating a new primitive.
- Use visible surfaces only when grouping requires a container.
- Do not wrap every section, statistic, or list item in a card.
- Use serif typography only for major titles, quotes, selected numbers, and editorial emphasis.
- Use sans-serif typography for controls, forms, tables, and dense reading.
- Use monospace for metadata, code, keyboard hints, timestamps, and system state.
- Use thin borders and tonal contrast before shadows.
- Keep control radii small to medium. Pills are reserved for status, tags, and compact filters.
- Motion must explain state, continuity, hierarchy, or origin.
- Every interaction needs visible keyboard focus and an accessible name.
- Irreversible actions use the `destructive` variant and ask for confirmation.
- Design mobile layouts intentionally. Do not merely shrink desktop grids.
- Respect `prefers-reduced-motion`.

## Semantic tokens

Manner uses shadcn's standard CSS variable names, so any shadcn component inherits the theme:

- Surfaces: `background`, `card`, `popover`, `muted`, `accent` (hover and selected surface), `sidebar`
- Ink: `foreground`, `muted-foreground`, `primary` / `primary-foreground` (the ink action color), `secondary`
- Lines: `border`, `input`, `ring` (focus)
- Status: `destructive`, plus Manner's `success` and `warning`
- Intent: Manner's `brand` (terracotta), `brand-foreground`, and `brand-soft`
- Data: `chart-1` … `chart-5`

Use Tailwind utilities generated from these tokens (`bg-card`, `text-muted-foreground`, `border-border`, `text-brand`, `ring-ring/50`) instead of component-specific colors. `brand` marks intent — the one decision that matters on a screen — and is never decoration.

Manner 0.1 names (`canvas`, `surface`, `ink`, `accent-soft`, `focus`, `danger`, …) are aliased by `@manner/manner-theme` for one release. Note that `muted` and `accent` changed meaning: 0.1 `muted` (a text color) is now `muted-foreground`, and 0.1 `accent` (terracotta) is now `brand`.

## Typography

- Display: Fraunces Variable at weight 400–500, exposed as `font-heading` (also `font-serif`).
- Interface and body: Geist or Inter Variable, exposed as `font-sans`. Never set interface text below 12px.
- Code and metadata: IBM Plex Mono, exposed as `font-mono`.
- Keep long-form body measure between 58 and 72 characters.
- Use line-height 1.55–1.75 for prose.
- Never use serif for tiny labels, dense tables, or code-adjacent UI.

## Shape and elevation

One `--radius` variable (default `0.5rem`) drives every radius:

- `rounded-sm`: radius − 4px — badges inside controls, keyboard keys
- `rounded-md`: radius − 2px — menu items, small buttons
- `rounded-lg`: radius — controls, alerts, list rows
- `rounded-xl`: radius + 4px — cards, code blocks, previews
- `rounded-2xl`: radius + 8px — major canvases only

Most grouping uses a 1px border and tonal contrast with no shadow. Popovers and menus may use `shadow-md`; dialogs and floating previews may use `shadow-lg`/`shadow-xl` tinted with `shadow-foreground/5`. Do not place giant blurred shadows behind normal cards.

## Motion

- Entry: opacity plus an 8–12px rise, ease-out. Explains where content came from.
- State: color, border, and opacity transitions at 100–160ms. Never animate layout to show state.
- Overlays: `tw-animate-css` fade and zoom (`data-open:animate-in`, `data-closed:animate-out`) at 100–220ms.
- Hover: at most 1–2px of movement.
- Panels and layout changes: 180–300ms. Avoid bounce and decorative zoom.

Respect `prefers-reduced-motion` by removing nonessential motion entirely.

## Responsive behavior

Validate at 360, 390, 768, 1024, and 1440 pixels. Sidebars become sheets, tabs, or compact selectors. Multi-panel AI interfaces show one primary panel at a time. Keep essential actions available without hover. Preserve readable measure.

## Accessibility

Target WCAG 2.2 AA with full keyboard operation, visible focus, accessible names, correct field relationships, non-color state indicators, logical focus order, dialog focus restoration, reduced motion, and 400% reflow.

## Avoid

- arbitrary colors inside components
- generic gradients and gradient text
- glassmorphism for ordinary surfaces
- giant centered hero followed by three generic cards
- nested card inside card inside card
- every control rendered as a pill
- decorative motion that delays interaction
- low-contrast beige-on-beige text
- fixed-height content that clips user text or localization
- icon-only actions without labels

## Agent workflow

1. Inspect the existing application structure, `components.json`, and tokens.
2. Reuse Manner components before creating new primitives. Add missing source with `pnpm dlx shadcn@latest add @manner/<name>`.
3. Choose a composition based on the user task, not visual novelty.
4. Implement loading, empty, error, disabled, and overflow states where applicable.
5. Verify keyboard use, visible focus, reduced motion, and mobile transformation.
6. Explain any intentional exception to these rules.
7. Update documentation and tests when component behavior changes.

Install the rules and a component with:

```sh
pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json
pnpm dlx shadcn@latest add @manner/agent-rules
pnpm dlx shadcn@latest add @manner/button
```

## Definition of done

A stable component has semantic tokens, light and dark modes, keyboard tests, accessible state, visible focus, reduced motion, mobile behavior, long-content coverage, relevant loading/error/empty states, documentation, and real usage in at least one application composition.
