import { Button } from "@/registry/manner/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/manner/ui/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open details</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Component details</SheetTitle>
          <SheetDescription>Sheets keep secondary tasks next to the work they belong to.</SheetDescription>
        </SheetHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="sheet-demo-name">Name</FieldLabel>
            <Input id="sheet-demo-name" defaultValue="Surface" />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <SheetClose render={<Button />}>Confirm changes</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
