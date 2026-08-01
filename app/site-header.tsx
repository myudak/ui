"use client";

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Mark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className="mark">
      <path d="M5 27V9l13 11L31 9v18" />
      <path d="M5 9h7l6 5 6-5h7" />
    </svg>
  );
}

function HeaderIcon({ name }: { name: "sun" | "moon" | "menu" }) {
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="icon">
      {name === "sun" && <><circle cx="11" cy="11" r="3.5"/><path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.6 4.6 6 6M16 16l1.4 1.4M17.4 4.6 16 6M6 16l-1.4 1.4"/></>}
      {name === "moon" && <path d="M18 14.7A7.6 7.6 0 0 1 7.3 4 7.7 7.7 0 1 0 18 14.7Z"/>}
      {name === "menu" && <path d="M3 6h16M3 11h16M3 16h16"/>}
    </svg>
  );
}

export function SiteHeader() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("manner-theme");
      setDark(saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.localStorage.setItem("manner-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="site-nav">
      <a className="brand" href="/" aria-label="Manner home"><Mark /><span>Manner</span><em>0.1</em></a>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a className={pathname === "/foundations" ? "active" : ""} href="/foundations" onClick={() => setMenuOpen(false)}>Foundations</a>
        <a className={pathname.startsWith("/components") ? "active" : ""} href="/components" onClick={() => setMenuOpen(false)}>Components</a>
        <a className={pathname === "/blocks" ? "active" : ""} href="/blocks" onClick={() => setMenuOpen(false)}>Blocks</a>
        <a className={pathname === "/design" || pathname === "/agents" ? "active" : ""} href="/design" onClick={() => setMenuOpen(false)}>Agent guide</a>
      </div>
      <div className="nav-actions">
        <a href="/design" className="github-link">DESIGN.md <span>↗</span></a>
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}><HeaderIcon name={dark ? "sun" : "moon"} /></button>
        <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><HeaderIcon name="menu" /></button>
      </div>
    </nav>
  );
}
