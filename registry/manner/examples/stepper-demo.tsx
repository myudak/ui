import { Stepper } from "@/registry/manner/ui/stepper"

export default function StepperDemo() {
  return <Stepper current={2} steps={["Connect", "Install rules", "Verify"]} className="max-w-lg" />
}
