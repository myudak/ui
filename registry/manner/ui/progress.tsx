export function Progress({ value, label = "Progress" }: { value: number; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="manner-progress"><div><span>{label}</span><strong>{safe}%</strong></div><progress value={safe} max="100">{safe}%</progress></div>;
}
