import { Note } from "@/registry/manner/editorial/note"

function ReaderBlock() {
  return (
    <div className="grid min-h-[560px] overflow-hidden rounded-[var(--radius-lg,14px)] border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[180px_1fr_230px]">
      <aside className="hidden border-r border-[var(--border)] bg-[var(--surface-inset)] p-5 lg:flex lg:flex-col"><p className="font-mono text-[.65rem] uppercase tracking-wider text-[var(--muted)]">On this page</p>{["A system, not a style", "Visual authority", "Semantic tokens", "Agent constraints"].map((item, index) => <a key={item} href={`#reader-${index}`} className={index === 0 ? "py-2 text-sm text-[var(--accent)]" : "py-2 text-sm text-[var(--muted)]"}>{item}</a>)}<span className="mt-auto font-mono text-[.65rem] text-[var(--accent)]">42% read</span></aside><article className="mx-auto max-w-[68ch] p-8 sm:p-12"><p className="font-mono text-[.65rem] uppercase tracking-wider text-[var(--accent)]">Design systems / 08 min</p><h1 id="reader-0" className="my-5 font-[family-name:var(--serif)] text-5xl font-medium leading-[.92] tracking-[-.045em]">A system,<br/><i className="font-normal text-[var(--accent)]">not a style.</i></h1><p className="font-[family-name:var(--serif)] text-xl leading-relaxed">A useful interface system does not merely prescribe what things look like. It explains why they exist and how they behave under pressure.</p><p className="text-base leading-7 text-[var(--ink-secondary)]">Color and type are only the visible edge. The deeper system connects intent, component anatomy, application patterns, agent instructions, and tests.</p><blockquote className="my-8 border-l-2 border-[var(--accent)] pl-5 font-[family-name:var(--serif)] text-xl italic">Portable taste requires rules that survive implementation.</blockquote></article><aside className="hidden border-l border-[var(--border)] bg-[var(--surface-inset)] p-5 lg:block"><Note title="Structure precedes decoration.">Every container should explain a relationship.</Note></aside>
    </div>
  )
}

export { ReaderBlock }
