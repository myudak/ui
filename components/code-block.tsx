"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Highlight, type Language, type PrismTheme } from "prism-react-renderer";

type CodeBlockProps = {
  code: string;
  language?: Language;
  filename?: string;
  label?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  className?: string;
};

const mannerCodeTheme: PrismTheme = {
  plain: {
    color: "var(--ink)",
    backgroundColor: "transparent",
  },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "var(--muted)", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "var(--muted)" } },
    { types: ["namespace"], style: { opacity: 0.72 } },
    { types: ["property", "tag", "constant", "symbol", "deleted"], style: { color: "var(--accent)" } },
    { types: ["boolean", "number"], style: { color: "var(--focus)" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "var(--syntax-string)" } },
    { types: ["operator", "entity", "url"], style: { color: "var(--ink-secondary)" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "var(--accent)" } },
    { types: ["function", "class-name"], style: { color: "var(--syntax-function)" } },
    { types: ["regex", "important", "variable"], style: { color: "var(--warning)" } },
    { types: ["bold"], style: { fontWeight: "700" } },
    { types: ["italic"], style: { fontStyle: "italic" } },
  ],
};

function CodeBlock({
  code,
  language = "tsx",
  filename,
  label,
  showLineNumbers = true,
  copyable = true,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const normalizedCode = code.replace(/^\n/, "").trimEnd();

  async function copyCode() {
    await navigator.clipboard.writeText(normalizedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={`code-block ${className}`.trim()}>
      <header className="code-block-toolbar">
        <div>
          <span className="code-block-language">{label ?? language}</span>
          {filename && <strong>{filename}</strong>}
        </div>
        {copyable && (
          <button type="button" onClick={copyCode} aria-label={`Copy ${filename ?? "code"}`}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        )}
      </header>
      <Highlight theme={mannerCodeTheme} code={normalizedCode} language={language}>
        {({ className: prismClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${prismClassName} code-block-scroll`} style={style} data-line-numbers={showLineNumbers}>
            <code>
              {tokens.map((line, index) => {
                const { className: lineClassName, ...lineProps } = getLineProps({ line });
                return (
                  <span className={`code-block-line ${lineClassName ?? ""}`} key={index} {...lineProps}>
                    {showLineNumbers && <span className="code-block-number" aria-hidden="true">{index + 1}</span>}
                    <span className="code-block-content">
                      {line.map((token, tokenIndex) => <span key={tokenIndex} {...getTokenProps({ token })} />)}
                    </span>
                  </span>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export { CodeBlock };
