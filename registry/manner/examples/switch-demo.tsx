import { Field, FieldContent, FieldDescription, FieldLabel } from "@/registry/manner/ui/field"
import { Switch } from "@/registry/manner/ui/switch"

export default function SwitchDemo() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="switch-demo">Respect reduced motion</FieldLabel>
        <FieldDescription>Simplify nonessential transitions automatically.</FieldDescription>
      </FieldContent>
      <Switch id="switch-demo" defaultChecked />
    </Field>
  )
}
