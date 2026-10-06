import { Field, FieldContent, FieldDescription, FieldLabel } from "@/registry/manner/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/manner/ui/radio-group"

const options = [
  { value: "warm", label: "Editorial warm", description: "Serif-led with terracotta intent." },
  { value: "quiet", label: "Quiet neutral", description: "Lower contrast for dense work." },
]

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="warm" aria-label="Theme preset" className="max-w-sm">
      {options.map((option) => (
        <FieldLabel key={option.value} htmlFor={`radio-demo-${option.value}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <span className="font-medium">{option.label}</span>
              <FieldDescription>{option.description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={option.value} id={`radio-demo-${option.value}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  )
}
