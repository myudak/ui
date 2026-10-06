import { Reasoning } from "@/registry/manner/ai/reasoning"

export default function ReasoningDemo() {
  return (
    <Reasoning open summary="3 steps" className="w-full max-w-md">
      <ol className="grid list-decimal gap-1.5 pl-5">
        <li>Compared information density and reading measure.</li>
        <li>Removed surfaces that did not explain grouping.</li>
        <li>Kept one accent for the primary decision.</li>
      </ol>
    </Reasoning>
  )
}
