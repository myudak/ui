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
- Design mobile layouts intentionally. Do not merely shrink desktop grids.
- Respect `prefers-reduced-motion`.

## Semantic tokens

Use `canvas`, `surface`, `surface-raised`, `surface-inset`, `ink`, `ink-secondary`, `ink-muted`, `accent`, `accent-soft`, `border-subtle`, `border`, `border-strong`, `focus`, `success`, `warning`, `danger`, and `info` instead of component-specific colors.

## Typography

- Display: Fraunces Variable, approximately weight 420.
- Interface and body: Geist or Inter Variable.
- Code and metadata: IBM Plex Mono.
- Keep long-form body measure between 58 and 72 characters.
- Use line-height 1.55–1.75 for prose.
- Never use serif for tiny labels, dense tables, or code-adjacent UI.

## Shape and elevation

- xs radius: 4px
- sm radius: 6px
- md radius: 10px
- lg radius: 14px
- xl radius: 20px, only for major canvases

Most content grouping uses no shadow. Menus may use lift-1. Dialogs may use lift-2. Do not place giant blurred shadows behind normal cards.

## Motion vocabulary

- `enter-soft`
- `exit-soft`
- `reveal-line`
- `shift-active`
- `expand-panel`
- `swap-content`
- `press-control`

Micro-interactions use 100–160ms. Menus and overlays use 140–220ms. Panels and layout changes use 180–300ms. Avoid bounce and decorative zoom by default.

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
