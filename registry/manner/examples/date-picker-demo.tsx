import { DatePicker } from "@/registry/manner/ui/date-picker"
import { Field, FieldLabel } from "@/registry/manner/ui/field"

export default function DatePickerDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="date-picker-demo">Target date</FieldLabel>
      <DatePicker id="date-picker-demo" defaultValue={new Date(2026, 7, 28)} />
    </Field>
  )
}
