export function Stepper({ current, steps }: { current: number; steps: string[] }) {
  return <ol className="manner-stepper">{steps.map((step, index) => <li key={step} data-state={index + 1 < current ? "complete" : index + 1 === current ? "current" : "upcoming"}><span>{index + 1 < current ? "✓" : index + 1}</span><strong>{step}</strong></li>)}</ol>;
}
