import type { Metadata } from "next"

import { TokenSwatch } from "@/components/docs/token-swatch"
import { CodeBlock } from "@/components/site/code-block"
import { SectionHeading } from "@/registry/manner/editorial/section-heading"

export const metadata: Metadata = {
  title: "Foundations",
  description: "Manner's color, type, shape, elevation, and motion tokens — on shadcn's standard variable names.",
}

const colorGroups = [
  {
    title: "Surfaces",
    description: "Warm neutrals carry the product. Most screens are background, card, and muted.",
    tokens: ["background", "card", "muted", "accent", "popover", "sidebar"],
  },
  {
    title: "Ink",
    description: "Text and the primary action share one ink color. Muted text keeps AA contrast on every surface.",
    tokens: ["foreground", "muted-foreground", "primary", "primary-foreground", "border", "input"],
  },
  {
    title: "Intent",
    description: "Terracotta marks the one thing that matters. Status colors communicate state, never decoration.",
    tokens: ["brand", "brand-soft", "ring", "success", "warning", "destructive"],
  },
]

const typeScale = [
  { name: "Display", className: "font-heading text-5xl font-medium tracking-tight sm:text-6xl", sample: "Warmth with working rules.", spec: "Fraunces · 48–60 / 1.0 · −0.025em" },
  { name: "Heading", className: "font-heading text-3xl font-medium tracking-tight", sample: "Structure before decoration", spec: "Fraunces · 30 / 1.15" },
  { name: "Title", className: "font-heading text-xl font-medium", sample: "Release readiness", spec: "Fraunces · 20 / 1.3" },
  { name: "Body", className: "text-base leading-7", sample: "Interface text is set in Geist for clarity at small sizes and long reading sessions.", spec: "Geist · 16 / 1.75" },
  { name: "Small", className: "text-sm text-muted-foreground", sample: "Supporting descriptions and helper text.", spec: "Geist · 14 / 1.5" },
  { name: "Label", className: "font-mono text-xs tracking-[0.14em] text-brand uppercase", sample: "Foundations / 02", spec: "IBM Plex Mono · 12 · uppercase" },
]

const radii = [
  { name: "sm", value: "calc(var(--radius) - 4px)", className: "rounded-sm" },
  { name: "md", value: "calc(var(--radius) - 2px)", className: "rounded-md" },
  { name: "lg", value: "var(--radius)", className: "rounded-lg" },
  { name: "xl", value: "calc(var(--radius) + 4px)", className: "rounded-xl" },
  { name: "full", value: "9999px", className: "rounded-full" },
]

const motion = [
  { name: "Enter", detail: "Opacity + 8px rise, 520ms ease-out. Explains where new content came from." },
  { name: "State", detail: "Color and border transitions at 150ms. Never animate layout to show state." },
  { name: "Hover", detail: "At most 1–2px of movement. Affordance, not spectacle." },
  { name: "Reduced", detail: "prefers-reduced-motion removes every nonessential transition." },
]

const themeExample = `:root {
  --background: oklch(0.968 0.012 75);
  --foreground: oklch(0.235 0.016 48);
  --primary: oklch(0.235 0.016 48);
  --brand: oklch(0.58 0.145 38);      /* terracotta intent */
  --brand-soft: oklch(0.915 0.045 45);
  --radius: 0.5rem;
}

.dark {
  --background: oklch(0.19 0.012 48);
  --foreground: oklch(0.93 0.012 75);
  --brand: oklch(0.7 0.13 39);
}`

export default function FoundationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-3xl">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Foundations</p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
          Warmth with <em className="font-normal text-brand">working rules.</em>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
          Manner&apos;s tokens use shadcn&apos;s standard names — <code className="font-mono text-base text-foreground">background</code>,{" "}
          <code className="font-mono text-base text-foreground">primary</code>,{" "}
          <code className="font-mono text-base text-foreground">muted</code> — so any shadcn component inherits the theme.
          Manner adds <code className="font-mono text-base text-foreground">brand</code>,{" "}
          <code className="font-mono text-base text-foreground">success</code>, and{" "}
          <code className="font-mono text-base text-foreground">warning</code>.
        </p>
      </header>

      <section className="mt-20">
        <SectionHeading id="color" eyebrow="01 / Color" title="Color" description="Every value is OKLCH and has a tuned dark counterpart. Toggle the theme to see both." />
        <div className="mt-10 grid gap-12">
          {colorGroups.map((group) => (
            <div key={group.title} className="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
              <div>
                <h3 className="font-heading text-xl font-medium">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
                {group.tokens.map((token) => <TokenSwatch key={token} token={token} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading id="type" eyebrow="02 / Typography" title="Three voices" description="A warm serif for display, a precise sans for interface, a mono for metadata and code." />
        <div className="mt-10 divide-y border-y">
          {typeScale.map((style) => (
            <div key={style.name} className="grid grid-cols-1 gap-3 py-6 md:grid-cols-[10rem_minmax(0,1fr)_14rem] md:items-baseline">
              <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{style.name}</span>
              <p className={style.className}>{style.sample}</p>
              <span className="font-mono text-xs text-muted-foreground md:text-right">{style.spec}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-2" aria-label="Shape and elevation">
        <div>
          <SectionHeading eyebrow="03 / Shape" title="Radius" description="One --radius variable; every other radius derives from it." />
          <div className="mt-8 flex flex-wrap gap-4">
            {radii.map((radius) => (
              <figure key={radius.name} className="grid gap-2">
                <div className={`size-20 border-2 border-foreground/70 bg-brand-soft ${radius.className}`} />
                <figcaption className="font-mono text-xs text-muted-foreground">{radius.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="04 / Elevation" title="Borders before shadows" description="Tonal contrast and a 1px border separate most surfaces. Shadows are reserved for layers that float." />
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="grid h-24 place-items-center rounded-xl border bg-card text-sm">Border</div>
            <div className="grid h-24 place-items-center rounded-xl bg-muted text-sm">Tone</div>
            <div className="grid h-24 place-items-center rounded-xl border bg-popover text-sm shadow-lg shadow-foreground/5">Floating</div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading id="motion" eyebrow="05 / Motion" title="Motion explains" description="Movement shows entry, state change, hierarchy, or spatial origin — and nothing else." />
        <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {motion.map((item) => (
            <div key={item.name} className="bg-background p-5">
              <dt className="font-heading text-lg font-medium">{item.name}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <SectionHeading
          id="theming"
          eyebrow="06 / Theming"
          title="Make it yours"
          description="Install @manner/manner-theme, then override any variable. Components read tokens only — no hard-coded colors."
        />
        <CodeBlock code={themeExample} language="css" filename="app/globals.css" />
      </section>
    </div>
  )
}
