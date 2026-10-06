import { Note } from "@/registry/manner/editorial/note"
import { Progress } from "@/registry/manner/ui/progress"

const outline = ["A system, not a style", "Visual authority", "Semantic tokens", "Agent constraints"]

function ReaderBlock() {
  return (
    <div className="grid grid-cols-1 min-h-svh bg-background lg:grid-cols-[220px_minmax(0,1fr)_260px]">
      <aside className="hidden border-r p-6 lg:flex lg:flex-col">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">On this page</p>
        <nav aria-label="Article outline" className="mt-4 grid gap-1">
          {outline.map((item, index) => (
            <a
              key={item}
              href={`#reader-${index}`}
              aria-current={index === 0 ? "location" : undefined}
              className="border-l-2 border-transparent py-1.5 pl-3 text-sm text-muted-foreground hover:text-foreground aria-[current]:border-brand aria-[current]:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="mt-auto grid gap-2">
          <span className="font-mono text-xs text-muted-foreground">42% read</span>
          <Progress value={42} aria-label="Reading progress" />
        </div>
      </aside>
      <article className="mx-auto w-full max-w-[68ch] px-6 py-12 sm:px-10 sm:py-16">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Design systems · 8 min</p>
        <h1 id="reader-0" className="mt-5 font-heading text-5xl leading-[0.95] font-medium tracking-tight text-balance">
          A system, <em className="font-normal text-brand">not a style.</em>
        </h1>
        <p className="mt-8 font-heading text-xl leading-relaxed text-pretty">
          A useful interface system does not merely prescribe what things look like. It explains why they exist and how
          they behave under pressure.
        </p>
        <p className="mt-6 leading-7 text-muted-foreground">
          Color and type are only the visible edge. The deeper system connects intent, component anatomy, application
          patterns, agent instructions, and tests.
        </p>
        <h2 id="reader-1" className="mt-12 font-heading text-2xl font-medium tracking-tight">Visual authority</h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          Hierarchy should be carried by type and spacing first. Surfaces, borders, and color are reserved for meaning.
        </p>
        <blockquote className="my-10 border-l-2 border-brand pl-5 font-heading text-xl italic">
          Portable taste requires rules that survive implementation.
        </blockquote>
      </article>
      <aside className="hidden border-l bg-muted/30 p-6 lg:block">
        <Note title="Structure precedes decoration.">Every container should explain a relationship.</Note>
      </aside>
    </div>
  )
}

export { ReaderBlock }
