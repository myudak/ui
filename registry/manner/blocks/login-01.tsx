"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/registry/manner/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"

function LoginBlock() {
  const [status, setStatus] = React.useState<"idle" | "pending" | "done">("idle")

  return (
    <div className="grid grid-cols-1 min-h-svh bg-background lg:grid-cols-[1.1fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex dark:border-r dark:bg-card dark:text-card-foreground">
        <span className="flex size-10 items-center justify-center rounded-full border border-current/30 font-heading text-lg">
          M
        </span>
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">The editorial workspace</p>
          <h1 className="mt-4 max-w-md font-heading text-5xl leading-[0.95] font-medium tracking-tight">
            Make room for <em className="font-normal text-brand">better thinking.</em>
          </h1>
        </div>
        <blockquote className="max-w-sm border-l border-brand pl-4 font-heading text-lg italic opacity-75">
          “The interface recedes. The work remains.”
        </blockquote>
      </section>
      <main className="flex items-center justify-center p-6 sm:p-12">
        <form
          className="w-full max-w-sm"
          onSubmit={(event) => {
            event.preventDefault()
            setStatus("pending")
            window.setTimeout(() => setStatus("done"), 700)
          }}
        >
          <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Welcome back</p>
          <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight">
            {status === "done" ? "Workspace ready." : "Sign in to Manner"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {status === "done"
              ? "The signed-in state is simulated locally in this example."
              : "Continue to your notes, decisions, and active work."}
          </p>
          {status === "done" ? (
            <Button type="button" variant="outline" className="mt-8 w-full" onClick={() => setStatus("idle")}>
              Reset example
            </Button>
          ) : (
            <FieldGroup className="mt-8">
              <Field>
                <FieldLabel htmlFor="login-01-email">Email</FieldLabel>
                <Input id="login-01-email" name="email" type="email" autoComplete="email" required placeholder="you@studio.com" />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="login-01-password">Password</FieldLabel>
                  <a href="#" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    Forgot?
                  </a>
                </div>
                <Input id="login-01-password" name="password" type="password" autoComplete="current-password" required />
                <FieldDescription>Example credentials never leave your browser.</FieldDescription>
              </Field>
              <Button type="submit" size="lg" disabled={status === "pending"}>
                {status === "pending" ? "Signing in…" : "Continue"}
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <FieldSeparator>or</FieldSeparator>
              <Button type="button" variant="outline" size="lg">
                Continue with a magic link
              </Button>
            </FieldGroup>
          )}
        </form>
      </main>
    </div>
  )
}

export { LoginBlock }
