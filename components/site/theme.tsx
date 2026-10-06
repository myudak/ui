"use client"

import * as React from "react"

import { THEME_STORAGE_KEY } from "./theme-script"

export type Theme = "light" | "dark" | "system"

const CHANGE_EVENT = "manner-theme-change"

function readTheme(): Theme {
  try {
    return (localStorage.getItem(THEME_STORAGE_KEY) as Theme | null) ?? "system"
  } catch {
    // Storage can be unavailable (private mode); the system theme still applies.
    return "system"
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function resolveDark(theme: Theme) {
  return theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
}

export function useTheme() {
  const theme = React.useSyncExternalStore(subscribe, readTheme, () => "system" as Theme)

  const setTheme = React.useCallback((next: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    const dark = resolveDark(next)
    document.documentElement.classList.toggle("dark", dark)
    // `storage` events only reach *other* documents; update same-origin preview iframes directly.
    document.querySelectorAll<HTMLIFrameElement>("iframe[data-preview]").forEach((frame) => {
      frame.contentDocument?.documentElement.classList.toggle("dark", dark)
    })
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  return { theme, setTheme }
}
