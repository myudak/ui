import { ComponentLab } from "../../page";
import { componentCatalog } from "@/lib/catalog";
import { SiteFooter } from "@/components/system-chrome";

export default async function ComponentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = componentCatalog.find((item) => item.slug === slug) ?? componentCatalog[0];
  return <main className="component-reference-route"><ComponentLab initialSelected={component.name} variant="docs" /><SiteFooter /></main>;
}
