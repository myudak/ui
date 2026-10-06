import { Sources } from "@/registry/manner/ai/sources"

export default function SourcesDemo() {
  return (
    <Sources
      className="w-full max-w-md"
      items={[
        { title: "Registry specification", domain: "ui.shadcn.com", href: "https://ui.shadcn.com/docs/registry" },
        { title: "WCAG 2.2 quick reference", domain: "w3.org", href: "https://www.w3.org/WAI/WCAG22/quickref/" },
        { title: "Base UI accessibility", domain: "base-ui.com", href: "https://base-ui.com/react/overview/accessibility" },
      ]}
    />
  )
}
