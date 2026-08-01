import { Metadata } from "@/registry/manner/editorial/metadata"

const models = [
  ["01", "Nusantara 3", "1284", "68%", "↗ 24"],
  ["02", "Gemini Flash", "1249", "64%", "↗ 11"],
  ["03", "GPT Luna", "1218", "61%", "→ 0"],
  ["04", "Qwen Fast", "1192", "58%", "↘ 7"],
]

function LeaderboardBlock() {
  return (
    <section className="min-h-[520px] rounded-[var(--radius-lg,14px)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"><header className="flex items-start justify-between gap-5"><div><p className="m-0 font-mono text-[.65rem] uppercase tracking-wider text-[var(--accent)]">Arena Indo / July</p><h2 className="my-2 font-[family-name:var(--serif)] text-3xl font-medium">Model leaderboard</h2></div><a href="#methodology" className="text-sm text-[var(--ink-secondary)]">Methodology ↗</a></header><Metadata className="my-7 grid divide-y-0 sm:grid-cols-3" items={[{ label: "Valid votes", value: "18,420" }, { label: "Decisive", value: "62%" }, { label: "Models", value: "24" }]} /><div className="overflow-x-auto"><table className="w-full min-w-[620px] border-collapse text-left"><thead><tr className="border-b border-[var(--border)] font-mono text-[.65rem] uppercase tracking-wider text-[var(--muted)]"><th className="py-3 font-normal">Rank / model</th><th className="py-3 font-normal">ELO</th><th className="py-3 font-normal">Win rate</th><th className="py-3 font-normal">Trend</th></tr></thead><tbody>{models.map((row) => <tr key={row[1]} className="border-b border-[var(--border-subtle)] text-sm"><td className="py-4"><span className="mr-5 font-mono text-xs text-[var(--accent)]">{row[0]}</span><strong>{row[1]}</strong></td><td>{row[2]}</td><td>{row[3]}</td><td className="text-[var(--accent)]">{row[4]}</td></tr>)}</tbody></table></div></section>
  )
}

export { LeaderboardBlock }
