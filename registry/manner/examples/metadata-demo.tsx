import { Metadata } from "@/registry/manner/editorial/metadata"

export default function MetadataDemo() {
  return (
    <Metadata
      className="w-full max-w-sm"
      items={[
        { label: "Status", value: "Stable" },
        { label: "Primitive", value: "Base UI" },
        { label: "Registry", value: "@manner/metadata" },
        { label: "Keyboard", value: "Verified" },
      ]}
    />
  )
}
