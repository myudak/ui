import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"
import { Textarea } from "@/registry/manner/ui/textarea"

export default function FieldDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-demo-name">Project name</FieldLabel>
        <Input id="field-demo-name" defaultValue="Margin notes" />
        <FieldDescription>Shown to collaborators in shared links.</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="field-demo-slug">Public slug</FieldLabel>
        <Input id="field-demo-slug" defaultValue="margin notes" aria-invalid />
        <FieldError>Use lowercase letters and hyphens only.</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-demo-summary">Summary</FieldLabel>
        <Textarea id="field-demo-summary" placeholder="One paragraph is enough." />
      </Field>
    </FieldGroup>
  )
}
