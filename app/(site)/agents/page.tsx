import type { Metadata } from "next"
import { ArrowUpRightIcon, BookOpenIcon, BracesIcon, FileTextIcon, WorkflowIcon } from "lucide-react"

import { designSource } from "@/app/component-source.generated"
import { CopyFileButton } from "@/components/docs/copy-file-button"
import { CodeBlock } from "@/components/site/code-block"
import { InstallCommand } from "@/components/site/install-command"
import { agentPrompts } from "@/lib/agent-prompts"
import { SectionHeading } from "@/registry/manner/editorial/section-heading"
import { Button } from "@/registry/manner/ui/button"

export const metadata: Metadata = {
  title: "Agents",
  description: "DESIGN.md, llms.txt, ai.json, and copy-ready prompts that teach coding agents to build with Manner.",
}

const files = [
  { name: "DESIGN.md", href: "/DESIGN.md", icon: BookOpenIcon, description: "The visual grammar: tokens, type, surfaces, motion, and required states." },
  { name: "MANNER_AGENT.md", href: "/MANNER_AGENT.md", icon: WorkflowIcon, description: "The operating workflow: inspect, reuse, install, adapt, verify, report." },
  { name: "llms.txt", href: "/llms.txt", icon: FileTextIcon, description: "A compact index for models, with links to everything else." },
  { name: "ai.json", href: "/ai.json", icon: BracesIcon, description: "A machine-readable manifest of every registry item and convention." },
]

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Agents</p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
            Taste your agent <em className="font-normal text-brand">can read.</em>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Manner ships its rules as plain files. Install them into a project and any coding agent — Claude Code, Codex,
            Cursor — builds with the same grammar you would.
          </p>
        </div>
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">Install the rules into your project root:</p>
          <InstallCommand args="add @manner/agent-rules" />
        </div>
      </header>

      <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {files.map((file) => (
          <li key={file.name} className="bg-background">
            <a
              href={file.href}
              target="_blank"
              rel="noreferrer"
              className="group/file flex h-full flex-col gap-3 p-5 outline-none transition-colors hover:bg-accent/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
            >
              <span className="flex items-center justify-between">
                <file.icon aria-hidden="true" className="size-5 text-brand" />
                <ArrowUpRightIcon aria-hidden="true" className="size-4 text-muted-foreground transition-transform group-hover/file:-translate-y-px group-hover/file:translate-x-px" />
              </span>
              <strong className="font-mono text-sm">{file.name}</strong>
              <span className="text-sm leading-relaxed text-muted-foreground">{file.description}</span>
            </a>
          </li>
        ))}
      </ul>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Prompts"
          title="Five prompts that cover the job"
          description="Paste one into your agent. Each points it at the right files and the checks that matter."
        />
        <div className="mt-10 grid gap-10">
          {agentPrompts.map((prompt) => (
            <article key={prompt.id} id={prompt.id} className="grid grid-cols-1 scroll-mt-20 gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-xs tracking-wide text-brand uppercase">{prompt.label}</p>
                <h3 className="mt-2 font-heading text-xl font-medium tracking-tight">{prompt.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{prompt.description}</p>
              </div>
              <CodeBlock code={prompt.code} language="markdown" filename="prompt.md" />
            </article>
          ))}
        </div>
      </section>

      <section id="design" className="mt-24 scroll-mt-20">
        <SectionHeading
          eyebrow="DESIGN.md"
          title="The rules, in full"
          description="This is the exact file agents receive. Copy it into a chat, or install it with the command above."
          action={
            <div className="flex gap-2">
              <CopyFileButton href="/DESIGN.md">Copy DESIGN.md</CopyFileButton>
              <Button variant="ghost" nativeButton={false} render={<a href="/DESIGN.md" target="_blank" rel="noreferrer" />}>
                Raw <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </div>
          }
        />
        <CodeBlock className="mt-8" code={designSource} language="markdown" filename="DESIGN.md" maxHeight="640px" />
      </section>
    </div>
  )
}
