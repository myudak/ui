"use client"

import { Highlight, type Language, type PrismTheme } from "prism-react-renderer"

import { CopyButton } from "@/components/site/copy-button"
import { cn } from "@/lib/cn"

type CodeBlockProps = {
  code: string
  language?: Language
  filename?: string
  showLineNumbers?: boolean
  copyable?: boolean
  className?: string
  /** Caps the height and scrolls; useful for long source files. */
  maxHeight?: string
}

const theme: PrismTheme = {
  plain: { color: "var(--foreground)", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "var(--muted-foreground)", fontStyle: "italic" } },
    { types: ["punctuation", "operator"], style: { color: "var(--muted-foreground)" } },
    { types: ["property", "tag", "constant", "symbol", "deleted", "keyword", "atrule"], style: { color: "var(--brand)" } },
    { types: ["boolean", "number"], style: { color: "var(--chart-3)" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted", "attr-value"], style: { color: "var(--success)" } },
    { types: ["function", "class-name"], style: { color: "var(--chart-3)" } },
    { types: ["regex", "important", "variable"], style: { color: "var(--warning)" } },
  ],
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = false,
  copyable = true,
  className,
  maxHeight,
}: CodeBlockProps) {
  const source = code.replace(/^\n/, "").trimEnd()

  return (
    <div data-slot="code-block" className={cn("group/code relative overflow-hidden rounded-xl border bg-muted/50", className)}>
      {filename && (
        <div className="flex h-10 items-center justify-between gap-2 border-b bg-muted/60 pr-1.5 pl-4">
          <span className="truncate font-mono text-xs text-muted-foreground">{filename}</span>
          {copyable && <CopyButton value={source} label={`Copy ${filename}`} />}
        </div>
      )}
      {!filename && copyable && (
        <CopyButton value={source} label="Copy code" className="absolute top-1.5 right-1.5 z-10 bg-muted/80 backdrop-blur" />
      )}
      <Highlight theme={theme} code={source} language={language}>
        {({ className: prismClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(prismClass, "overflow-auto p-4 font-mono text-[0.8125rem] leading-6", !filename && copyable && "pr-12")}
            style={{ ...style, maxHeight }}
            tabIndex={0}
          >
            <code>
              {tokens.map((line, index) => {
                const { className: lineClass, ...lineProps } = getLineProps({ line })
                return (
                  <span key={index} className={cn("table-row", lineClass)} {...lineProps}>
                    {showLineNumbers && (
                      <span aria-hidden="true" className="table-cell pr-4 text-right text-muted-foreground/60 select-none">
                        {index + 1}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </span>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
