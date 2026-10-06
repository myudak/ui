# Manner agent setup

For machine-readable discovery, start with:

- `https://ui.myudak.com/llms.txt` — compact guide
- `https://ui.myudak.com/llms-full.txt` — complete guide
- `https://ui.myudak.com/ai.json` — manifest and catalog metadata
- `https://ui.myudak.com/r/index.json` — every installable item

Read `DESIGN.md` before changing interface code.

## Component workflow

1. Search the installed Manner files before creating a new primitive.
2. Add missing source with `pnpm dlx shadcn@latest add @manner/<name>`.
3. Prefer Manner blocks for common application shells, then adapt the owned source.
4. Use the shadcn-standard tokens from `DESIGN.md` (`background`, `card`, `muted-foreground`, `border`, `ring`, plus Manner's `brand`, `success`, `warning`); do not add component-specific colors.
5. Preserve Base UI semantics and keyboard behavior when changing interactive components.
6. Verify light/dark appearance, keyboard focus, disabled/error/empty states, reduced motion, and the mobile transformation.

## Useful registry items

- Form: `button`, `input`, `textarea`, `field`, `input-group`, `select`, `checkbox`, `radio-group`, `switch`, `toggle-group`, `date-picker`, `calendar`, `file-upload`
- Overlay: `dialog`, `sheet`, `drawer`, `popover`, `tooltip`, `dropdown-menu`, `command`
- Navigation: `tabs`, `accordion`, `breadcrumb`, `pagination`, `navigation-menu`, `stepper`, `sidebar`
- Display: `card`, `badge`, `alert`, `progress`, `skeleton`, `empty`, `kbd`, `separator`, `scroll-area`
- Editorial: `surface`, `section-heading`, `note`, `quote`, `timeline`, `metadata`
- AI: `message`, `composer`, `reasoning`, `tool-call`, `sources`, `artifact`
- Blocks: `login-01`, `sidebar-01`, `settings-01`, `reader-01`, `ai-workspace-01`, `leaderboard-01`

Primitives follow shadcn's compositional APIs (for example `Tabs` → `TabsList` → `TabsTrigger`, `Dialog` → `DialogTrigger render={<Button />}`). Base UI components use the `render` prop rather than `asChild`.

When implementation is complete, report which Manner items were reused, which were changed, and any intentional exception to `DESIGN.md`.
