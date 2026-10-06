import { Field, FieldLabel } from "@/registry/manner/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/registry/manner/ui/select"

const presets = [
  { value: "warm", label: "Editorial warm" },
  { value: "quiet", label: "Quiet neutral" },
  { value: "dense", label: "Dense product" },
]

export default function SelectDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="select-demo">Style preset</FieldLabel>
      <Select items={presets} defaultValue="warm">
        <SelectTrigger id="select-demo" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Presets</SelectLabel>
            {presets.map((preset) => (
              <SelectItem key={preset.value} value={preset.value}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
