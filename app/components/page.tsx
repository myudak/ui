"use client";

import { ComponentLab } from "../page";
import { SiteFooter } from "@/components/system-chrome";

export default function ComponentsPage() {
  return (
    <main className="component-reference-route">
      <ComponentLab initialSelected="Button" variant="docs" />
      <SiteFooter />
    </main>
  );
}
