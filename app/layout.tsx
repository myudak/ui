import type { Metadata } from "next";
import { Fraunces, Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Manner — Agent-native editorial design system",
  description: "Warm, expressive interface components and patterns, delivered as source code and understood by coding agents.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="ai-manifest" href="/ai.json" type="application/json" />
        <link rel="llms" href="/llms.txt" type="text/plain" />
      </head>
      <body
        className={`${geistSans.variable} ${fraunces.variable} ${plexMono.variable}`}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
