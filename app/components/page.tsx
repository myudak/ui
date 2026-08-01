"use client";

import { ComponentLab } from "../page";

export default function ComponentsPage() {
  return (
    <main className="component-reference-route">
      <ComponentLab initialSelected="Button" variant="docs" />
    </main>
  );
}
