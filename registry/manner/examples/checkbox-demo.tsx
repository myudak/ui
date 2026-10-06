import { Checkbox } from "@/registry/manner/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/registry/manner/ui/field"

export default function CheckboxDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox id="checkbox-demo-refs" defaultChecked />
        <FieldLabel htmlFor="checkbox-demo-refs">Include references</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="checkbox-demo-notify" />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-demo-notify">Notify collaborators</FieldLabel>
          <FieldDescription>Send a digest when this page changes.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="checkbox-demo-disabled" disabled />
        <FieldLabel htmlFor="checkbox-demo-disabled">Archive automatically</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
