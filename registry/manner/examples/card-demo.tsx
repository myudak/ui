import { MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/registry/manner/ui/badge"
import { Button } from "@/registry/manner/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/manner/ui/card"
import { Progress } from "@/registry/manner/ui/progress"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Release readiness</CardTitle>
        <CardDescription>Three checks remain before review.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More actions"><MoreHorizontalIcon /></Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-baseline justify-between">
          <strong className="font-heading text-4xl font-medium">82%</strong>
          <Badge variant="brand">On track</Badge>
        </div>
        <Progress value={82} aria-label="Release readiness" />
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Open checklist</Button>
        <Button size="sm" variant="ghost">Share</Button>
      </CardFooter>
    </Card>
  )
}
