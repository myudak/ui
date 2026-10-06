import { ArrowDownRightIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/registry/manner/ui/badge"

const models = [
  { rank: 1, name: "Nusantara 3", elo: 1284, winRate: 68, trend: 24 },
  { rank: 2, name: "Gemini Flash", elo: 1249, winRate: 64, trend: 11 },
  { rank: 3, name: "GPT Luna", elo: 1218, winRate: 61, trend: 0 },
  { rank: 4, name: "Qwen Fast", elo: 1192, winRate: 58, trend: -7 },
  { rank: 5, name: "Sahabat 2", elo: 1170, winRate: 55, trend: 3 },
]

const summary = [
  { label: "Valid votes", value: "18,420" },
  { label: "Decisive", value: "62%" },
  { label: "Models", value: "24" },
]

function Trend({ value }: { value: number }) {
  const Icon = value > 0 ? ArrowUpRightIcon : value < 0 ? ArrowDownRightIcon : ArrowRightIcon
  return (
    <span className={value > 0 ? "inline-flex items-center gap-1 text-success" : value < 0 ? "inline-flex items-center gap-1 text-destructive" : "inline-flex items-center gap-1 text-muted-foreground"}>
      <Icon className="size-3.5" aria-hidden="true" />
      {Math.abs(value)}
      <span className="sr-only">{value > 0 ? "places up" : value < 0 ? "places down" : "no change"}</span>
    </span>
  )
}

function LeaderboardBlock() {
  return (
    <section className="min-h-svh bg-background px-6 py-10 sm:px-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Arena · July</p>
          <h1 className="mt-2 font-heading text-4xl font-medium tracking-tight">Model leaderboard</h1>
        </div>
        <a href="#methodology" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Methodology
        </a>
      </header>
      <dl className="mt-8 grid grid-cols-1 overflow-hidden rounded-xl border sm:grid-cols-3">
        {summary.map((item) => (
          <div key={item.label} className="border-b p-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
            <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{item.label}</dt>
            <dd className="mt-2 font-heading text-3xl font-medium tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Model ranking by ELO</caption>
          <thead>
            <tr className="border-b font-mono text-xs tracking-wide text-muted-foreground uppercase">
              <th scope="col" className="py-3 font-normal">Rank / model</th>
              <th scope="col" className="py-3 text-right font-normal">ELO</th>
              <th scope="col" className="py-3 text-right font-normal">Win rate</th>
              <th scope="col" className="py-3 text-right font-normal">Trend</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.name} className="border-b transition-colors hover:bg-muted/50">
                <td className="py-4">
                  <span className="mr-4 font-mono text-xs text-brand">{String(model.rank).padStart(2, "0")}</span>
                  <strong className="font-medium">{model.name}</strong>
                  {model.rank === 1 && <Badge variant="brand" className="ml-2">Leader</Badge>}
                </td>
                <td className="text-right tabular-nums">{model.elo}</td>
                <td className="text-right tabular-nums">{model.winRate}%</td>
                <td className="text-right tabular-nums"><Trend value={model.trend} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export { LeaderboardBlock }
