import * as React from "react";
export function Tooltip({ content, children }: { content: string; children: React.ReactElement }) {
  return <span className="manner-tooltip">{children}<span role="tooltip">{content}</span></span>;
}
