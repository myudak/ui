# Contributing to Manner

Thanks for helping improve Manner.

## Before opening a change

1. Read `public/DESIGN.md` and `public/MANNER_AGENT.md`.
2. Search the registry before adding a new primitive.
3. Prefer a focused change over a broad visual rewrite.
4. Preserve semantic tokens, keyboard behavior, reduced motion, and responsive transformation.

## Component requirements

A stable component should include:

- semantic HTML and accessible names
- visible keyboard focus
- light and dark token support
- disabled, error, empty, loading, and overflow states where relevant
- an actual preview in the documentation
- registry metadata and dependency declarations
- usage in at least one realistic composition

## Validate locally

```bash
npm run prepare:system
npm run lint
npm run typecheck
node --test tests/registry-contract.test.mjs
```

Explain intentional exceptions to `DESIGN.md` in the pull request.
