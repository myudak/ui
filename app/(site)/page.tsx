import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { CopyFileButton } from "@/components/docs/copy-file-button"
import { AgentTranscript } from "@/components/home/agent-transcript"
import { BlocksShowcase } from "@/components/home/blocks-showcase"
import { CopyCommand } from "@/components/home/copy-command"
import { Faq } from "@/components/home/faq"
import { Gallery } from "@/components/home/gallery"
import { HeroPreview } from "@/components/home/hero-preview"
import { CodeBlock } from "@/components/site/code-block"
import { InstallCommand } from "@/components/site/install-command"
import { blockCatalog, componentCatalog } from "@/lib/catalog"
import { SectionHeading } from "@/registry/manner/editorial/section-heading"
import { Button } from "@/registry/manner/ui/button"

const proof = [
  { value: String(componentCatalog.length), label: "Components" },
  { value: String(blockCatalog.length), label: "Page blocks" },
  { value: "Base UI", label: "Accessible primitives" },
  { value: "shadcn", label: "Registry & CLI" },
  { value: "MIT", label: "Source you own" },
]

const steps = [
  {
    title: "Add the registry",
    body: "One line in components.json points the shadcn CLI at Manner.",
    code: "npx shadcn registry add \\\n  @manner=https://ui.myudak.com/r/{name}.json",
  },
  {
    title: "Install source",
    body: "Components and their dependencies are copied into your repo — no package to upgrade around.",
    code: "npx shadcn add @manner/settings-01\n\n✓ components/ui/field.tsx\n✓ components/ui/select.tsx\n✓ components/ui/switch.tsx\n✓ components/settings-01.tsx",
  },
  {
    title: "Make it yours",
    body: "Edit the file. Tokens are shadcn-standard CSS variables, so theming is one block of CSS.",
    code: ":root {\n  --brand: oklch(0.58 0.145 38);\n  --radius: 0.5rem;\n}",
  },
]

const principles = [
  { title: "Structure before decoration", body: "Type and spacing carry hierarchy. Surfaces appear only when grouping needs one." },
  { title: "One accent, used for intent", body: "Terracotta marks the decision that matters — not every link and border." },
  { title: "Every state, not just the happy path", body: "Loading, empty, error, disabled, and overflow ship with the pattern." },
  { title: "Motion that explains", body: "Entry, state change, and spatial origin. Under 2px on hover, none when reduced." },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-8 lg:pt-20 lg:pb-28">
          <div className="animate-reveal">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 rounded-full border bg-card/80 py-1 pr-3 pl-1 text-sm outline-none transition-colors hover:border-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="rounded-full bg-brand-soft px-2 py-0.5 font-mono text-xs text-brand">0.2</span>
              Rebuilt on shadcn base-nova
              <ArrowRightIcon className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </Link>
            <h1 className="mt-7 font-heading text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] font-medium tracking-[-0.035em] text-balance">
              A design system <em className="font-normal text-brand">you can see working.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
              Warm, editorial React components and page blocks on shadcn and Base UI. Installed as source with one
              command — and written down so your coding agent builds the same way you would.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" nativeButton={false} render={<Link href="/components" />}>
                Browse components <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/agents" />}>
                Use with an agent
              </Button>
            </div>
            <CopyCommand className="mt-6" command="pnpm dlx shadcn@latest add @manner/button" />
          </div>
          <div className="animate-reveal [animation-delay:120ms]">
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* Proof */}
      <section aria-label="At a glance" className="border-b bg-card/40">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 px-4 py-8 sm:grid-cols-3 sm:px-6 md:grid-cols-5 lg:px-8">
          {proof.map((item) => (
            <div key={item.label} className="border-l pl-4">
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="mt-1 font-heading text-2xl font-medium tracking-tight">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Live components"
          title={<>The system, <em className="font-normal text-brand">under pressure.</em></>}
          description="Not screenshots. Every control below is the same source you install — try the form, search the command list, tab through it."
          action={
            <Button variant="outline" nativeButton={false} render={<Link href="/components" />}>
              All {componentCatalog.length} components <ArrowRightIcon data-icon="inline-end" />
            </Button>
          }
        />
        <div className="mt-12">
          <Gallery />
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="How it works"
            title="Source in your repo, in three steps"
            description="Manner is a shadcn registry. There is no runtime package — the CLI copies files you can read, edit, and review."
          />
          <ol className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-brand">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading text-xl font-medium tracking-tight">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                <CodeBlock code={step.code} language={index === 2 ? "css" : "bash"} className="bg-background" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Blocks */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Blocks"
          title={<>Whole pages, <em className="font-normal text-brand">not placeholders.</em></>}
          description="Sign-in, app shell, settings, reader, AI workspace, and leaderboard — each a working composition you install in one command."
          action={
            <Button variant="outline" nativeButton={false} render={<Link href="/blocks" />}>
              Browse blocks <ArrowRightIcon data-icon="inline-end" />
            </Button>
          }
        />
        <div className="mt-12">
          <BlocksShowcase />
        </div>
      </section>

      {/* Agents */}
      <section className="border-y bg-card/40">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <SectionHeading
              eyebrow="Agent-native"
              title={<>Taste your agent <em className="font-normal text-brand">can read.</em></>}
              description="Manner writes its rules down. DESIGN.md holds the visual grammar; MANNER_AGENT.md holds the workflow; llms.txt and ai.json make the catalog discoverable."
            />
            <ul className="mt-8 grid gap-3 text-sm">
              {[
                ["DESIGN.md", "Tokens, type, surfaces, motion, required states"],
                ["MANNER_AGENT.md", "Inspect → reuse → install → adapt → verify"],
                ["llms.txt · ai.json", "Every component and block, machine-readable"],
              ].map(([file, detail]) => (
                <li key={file} className="flex flex-wrap items-baseline gap-x-3 border-b pb-3">
                  <code className="font-mono text-foreground">{file}</code>
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <CopyFileButton href="/DESIGN.md" variant="default">Copy DESIGN.md</CopyFileButton>
              <Button variant="ghost" nativeButton={false} render={<Link href="/agents" />}>
                Agent guide <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </div>
          <AgentTranscript />
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <figure>
            <blockquote className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-4xl">
              “One memorable typographic gesture is better than <em className="text-brand">five decorative effects.</em>”
            </blockquote>
            <figcaption className="mt-5 font-mono text-xs tracking-wide text-muted-foreground uppercase">Principle 05 — Restraint</figcaption>
          </figure>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {principles.map((principle, index) => (
              <li key={principle.title} className="bg-background p-6">
                <span className="font-mono text-xs text-brand">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-heading text-lg font-medium tracking-tight">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8 lg:py-28">
          <SectionHeading className="self-start lg:sticky lg:top-24" eyebrow="Questions" title="Before you install" description="The short answers. The long ones live in the docs and DESIGN.md." />
          <Faq />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end lg:px-8 lg:py-24">
          <div>
            <h2 className="font-heading text-4xl leading-[1.02] font-medium tracking-tight text-balance sm:text-5xl">
              Own the source. <em className="font-normal text-brand">Keep the manner.</em>
            </h2>
            <p className="mt-4 max-w-xl text-lg opacity-75">Start with one component, or install a whole page.</p>
          </div>
          <div className="grid gap-3 text-foreground">
            <InstallCommand args="add @manner/sidebar-01" className="bg-background" />
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="brand" nativeButton={false} render={<Link href="/components" />}>
                Browse components <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground dark:text-foreground dark:hover:bg-muted" nativeButton={false} render={<a href="https://github.com/myudak/ui" />}>
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
