import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/manner/ui/accordion"

const questions = [
  {
    q: "Is Manner a fork of shadcn/ui?",
    a: "It is a registry built on shadcn's foundation. Primitives start from shadcn's Base UI sources and are restyled with Manner tokens; editorial, AI, and block patterns are Manner's own. Everything installs with the regular shadcn CLI.",
  },
  {
    q: "Will it work with my existing shadcn components?",
    a: "Yes. Manner uses shadcn's standard variable names — background, foreground, primary, muted, border, ring — so components you already have pick up the theme. Manner only adds brand, success, and warning.",
  },
  {
    q: "Why Base UI instead of Radix?",
    a: "Base UI is the shadcn base that Manner targets. Its unstyled primitives handle focus, keyboard, and ARIA so the source you own stays small and readable.",
  },
  {
    q: "How do agents use it?",
    a: "Install @manner/agent-rules to add DESIGN.md and MANNER_AGENT.md to your project, or point an agent at llms.txt and ai.json. The rules cover tokens, typography, surfaces, motion, and the states every screen needs.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Manner is MIT licensed, and the source lives in your repository once installed.",
  },
]

export function Faq() {
  return (
    <Accordion defaultValue={["0"]} className="w-full">
      {questions.map((item, index) => (
        <AccordionItem key={item.q} value={String(index)}>
          <AccordionTrigger className="py-4 text-base">{item.q}</AccordionTrigger>
          <AccordionContent className="max-w-2xl text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
