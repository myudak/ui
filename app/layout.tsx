import type { Metadata, Viewport } from "next"
import { Fraunces, Geist, IBM_Plex_Mono } from "next/font/google"

import { themeScript } from "@/components/site/theme-script"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"] })
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.myudak.com"),
  title: {
    default: "Manner — an editorial design system on shadcn",
    template: "%s · Manner",
  },
  description:
    "Warm, editorial React components and blocks on shadcn and Base UI. Installed as source with the shadcn CLI and readable by coding agents.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Manner — an editorial design system on shadcn",
    description: "Warm, editorial React components and blocks on shadcn and Base UI.",
    url: "https://ui.myudak.com",
    siteName: "Manner",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1714" },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="ai-manifest" href="/ai.json" type="application/json" />
        <link rel="llms" href="/llms.txt" type="text/plain" />
      </head>
      <body className={`${geistSans.variable} ${fraunces.variable} ${plexMono.variable}`}>{children}</body>
    </html>
  )
}
