import { DocsNav } from "@/components/docs/docs-nav"

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid grid-cols-1 max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] overflow-y-auto overscroll-contain py-8 pr-2 md:block [scrollbar-width:thin]">
        <DocsNav />
      </aside>
      <div className="min-w-0 py-10 md:py-12">{children}</div>
    </div>
  )
}
