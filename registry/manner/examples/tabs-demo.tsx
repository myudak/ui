import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/manner/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="preview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="source">Source</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="rounded-lg border p-4 text-muted-foreground">Interactive component output.</TabsContent>
      <TabsContent value="usage" className="rounded-lg border p-4 text-muted-foreground">Copyable composition examples.</TabsContent>
      <TabsContent value="source" className="rounded-lg border p-4 text-muted-foreground">The exact file the CLI installs.</TabsContent>
    </Tabs>
  )
}
