// Copy-ready prompts for coding agents, shown on /agents.
export const agentPrompts = [
  {
    id: "install",
    label: "01 / INSTALL",
    title: "Install Manner in an existing app",
    description: "Use this when an agent is starting with an existing React or Next.js project.",
    code: `Use Manner UI in this project.

Before writing UI:
1. Read https://ui.myudak.com/llms.txt
2. Read https://ui.myudak.com/AGENTS.md
3. Inspect components.json, app/globals.css, and the existing source tree.

Configure and use the Manner registry:
pnpm dlx shadcn@latest registry add @manner=https://ui.myudak.com/r/{name}.json

Install the closest existing components before creating anything new. Keep the
copied source in this application and report which components were reused.`,
  },
  {
    id: "restyle",
    label: "02 / RESTYLE",
    title: "Restyle an existing page",
    description: "Use this when the product behavior is correct but the interface needs Manner’s visual grammar.",
    code: `Restyle this page using Manner UI:
https://ui.myudak.com

Read these first:
- https://ui.myudak.com/DESIGN.md
- https://ui.myudak.com/MANNER_AGENT.md
- https://ui.myudak.com/r/index.json

Preserve the existing product logic and content. Reuse installed Manner source,
use semantic tokens, keep focus and keyboard behavior intact, and intentionally
transform the mobile layout. Check loading, empty, error, disabled, and overflow
states before finishing.`,
  },
  {
    id: "page",
    label: "03 / COMPOSE",
    title: "Build a new page from a block",
    description: "Use this for dashboards, readers, settings, authentication, and AI interfaces.",
    code: `Build this page with Manner UI.

First inspect the block catalog:
https://ui.myudak.com/blocks
https://ui.myudak.com/r/index.json

Choose the closest block and install its source with shadcn. Compose the page
from existing primitives instead of drawing placeholder cards. Keep the block’s
accessibility behavior, adapt the content to this product, and add the states
that the real workflow needs. Explain any intentional design-rule exception.`,
  },
  {
    id: "component",
    label: "04 / EXTEND",
    title: "Add a missing component",
    description: "Use this only after the registry and installed source do not cover the interaction.",
    code: `Add a new Manner-compatible component only if no existing item fits.

Read https://ui.myudak.com/DESIGN.md and search the registry first:
https://ui.myudak.com/r/index.json

Follow the existing source conventions and Base UI semantics. Use semantic
tokens, visible focus, accessible names, keyboard behavior, reduced-motion
support, and light/dark states. Add a real example, source view, installation
metadata, and a test. Update the registry and explain why a new primitive was
necessary.`,
  },
  {
    id: "audit",
    label: "05 / VERIFY",
    title: "Audit a page against Manner",
    description: "Use this as a final pass before shipping a design-system implementation.",
    code: `Audit this interface against Manner UI.

Use:
- https://ui.myudak.com/DESIGN.md
- https://ui.myudak.com/MANNER_AGENT.md
- https://ui.myudak.com/ai.json

Check tokens, typography, hierarchy, surfaces, borders, motion, focus states,
keyboard operation, reduced motion, responsive behavior at 360/390/768/1024/
1440px, long content, and loading/empty/error/disabled states. Fix issues that
are clearly violations, then report the remaining intentional exceptions.`,
  },
];
