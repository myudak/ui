import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/manner/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Alert variant="success">
        <CheckCircle2Icon />
        <AlertTitle>Registry ready</AlertTitle>
        <AlertDescription>All component manifests passed validation.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangleIcon />
        <AlertTitle>Review required</AlertTitle>
        <AlertDescription>Three accessibility checks need a human decision.</AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon />
        <AlertTitle>Tokens changed in 0.2</AlertTitle>
        <AlertDescription>Manner now uses shadcn-standard variable names.</AlertDescription>
      </Alert>
    </div>
  )
}
