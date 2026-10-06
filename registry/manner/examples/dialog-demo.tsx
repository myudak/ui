import { Button } from "@/registry/manner/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/manner/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/registry/manner/ui/field"
import { Input } from "@/registry/manner/ui/input"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Edit profile</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogDescription>Changes are visible to collaborators immediately.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="dialog-demo-name">Display name</FieldLabel>
            <Input id="dialog-demo-name" defaultValue="Muchamad Yuda" />
          </Field>
          <Field>
            <FieldLabel htmlFor="dialog-demo-role">Role</FieldLabel>
            <Input id="dialog-demo-role" defaultValue="Design engineer" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Save changes</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
