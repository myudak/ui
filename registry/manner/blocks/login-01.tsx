"use client"

import * as React from "react"

import { Button } from "@/registry/manner/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"

function LoginBlock() {
  const [complete, setComplete] = React.useState(false)

  return (
    <main className="grid min-h-[560px] overflow-hidden rounded-[var(--radius-lg,14px)] border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[1.08fr_.92fr]">
      <section className="flex flex-col justify-between bg-[var(--ink)] p-8 text-[var(--canvas)] sm:p-12"><div><span className="grid size-11 place-items-center rounded-full border border-[color-mix(in_oklab,var(--canvas)_35%,transparent)] font-[family-name:var(--serif)] text-xl">M</span><p className="mt-12 font-mono text-[.68rem] uppercase tracking-[.14em] text-[var(--accent)]">The editorial workspace</p><h1 className="mt-4 font-[family-name:var(--serif)] text-5xl font-medium leading-[.92] tracking-[-.045em]">Make room for<br/><i className="font-normal text-[var(--accent)]">better thinking.</i></h1></div><blockquote className="m-0 max-w-sm border-l border-[var(--accent)] pl-4 font-[family-name:var(--serif)] text-lg italic text-[color-mix(in_oklab,var(--canvas)_78%,transparent)]">“The interface recedes. The work remains.”</blockquote></section>
      <form className="flex flex-col justify-center gap-5 p-8 sm:p-12" onSubmit={(event) => { event.preventDefault(); setComplete(true) }}><div><p className="m-0 font-mono text-[.68rem] uppercase tracking-[.13em] text-[var(--accent)]">Welcome back</p><h2 className="my-2 font-[family-name:var(--serif)] text-3xl font-medium">{complete ? "Workspace ready." : "Sign in to Manner"}</h2><p className="m-0 text-sm leading-relaxed text-[var(--ink-secondary)]">{complete ? "The authenticated state is represented locally in this example." : "Continue to your notes, decisions, and active work."}</p></div>{complete ? <Button type="button" variant="outline" onClick={() => setComplete(false)}>Reset example</Button> : <><Field><FieldLabel htmlFor="manner-login-email">Email</FieldLabel><Input id="manner-login-email" name="email" type="email" autoComplete="email" required defaultValue="yuda@example.com"/></Field><Field><FieldLabel htmlFor="manner-login-password">Password</FieldLabel><Input id="manner-login-password" name="password" type="password" autoComplete="current-password" required defaultValue="manner-demo"/><FieldDescription>Example credentials stay in your browser.</FieldDescription></Field><Button type="submit">Continue →</Button></>}</form>
    </main>
  )
}

export { LoginBlock }
