// Maps block name to its component; used by /view/[name] and the docs.
import type { ComponentType } from "react"

import { AIWorkspaceBlock } from "./ai-workspace-01"
import { LeaderboardBlock } from "./leaderboard-01"
import { LoginBlock } from "./login-01"
import { ReaderBlock } from "./reader-01"
import { SettingsBlock } from "./settings-01"
import { SidebarBlock } from "./sidebar-01"

export const blocks: Record<string, ComponentType> = {
  "login-01": LoginBlock,
  "sidebar-01": SidebarBlock,
  "settings-01": SettingsBlock,
  "reader-01": ReaderBlock,
  "ai-workspace-01": AIWorkspaceBlock,
  "leaderboard-01": LeaderboardBlock,
}
