import { Button } from "@/registry/manner/ui/button"
import { Field, FieldLabel } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/registry/manner/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Set width</PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Reading measure</PopoverTitle>
          <PopoverDescription>Keep long-form text between 60 and 75 characters.</PopoverDescription>
        </PopoverHeader>
        <Field>
          <FieldLabel htmlFor="popover-demo-width">Max width (ch)</FieldLabel>
          <Input id="popover-demo-width" type="number" defaultValue={68} />
        </Field>
      </PopoverContent>
    </Popover>
  )
}
