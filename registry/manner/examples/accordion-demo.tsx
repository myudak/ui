import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/manner/ui/accordion"

const items = [
  { value: "source", title: "Do I own the source?", body: "Yes. The CLI copies every file into your project; edit it like your own code." },
  { value: "base", title: "Why Base UI?", body: "Base UI provides robust, unstyled accessibility primitives that Manner styles with semantic tokens." },
  { value: "theme", title: "Can I change the palette?", body: "Override the CSS variables. Every component reads shadcn-standard tokens." },
]

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["source"]} className="w-full max-w-md">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
