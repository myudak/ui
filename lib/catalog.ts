export type CatalogGroup = "Form" | "Surface" | "Navigation" | "Feedback" | "Editorial" | "AI interfaces";

export type ComponentDoc = {
  name: string;
  slug: string;
  group: CatalogGroup;
  description: string;
  usage: string;
  status?: "Stable" | "Beta";
};

export const componentCatalog: ComponentDoc[] = [
  { name: "Button", slug: "button", group: "Form", description: "A semantic action with restrained, purposeful variants.", usage: '<Button variant="primary">Save changes</Button>' },
  { name: "Field", slug: "field", group: "Form", description: "A labeled input composition for names, titles, and short-form content.", usage: '<Field>\n  <FieldLabel>Project name</FieldLabel>\n  <Input defaultValue="Margin notes" />\n  <FieldDescription>Shown to collaborators.</FieldDescription>\n</Field>' },
  { name: "Input", slug: "input", group: "Form", description: "A semantic single-line input with visible focus and invalid states.", usage: '<Input aria-label="Project name" placeholder="Margin notes" />' },
  { name: "Textarea", slug: "textarea", group: "Form", description: "A readable multiline field with controlled resizing.", usage: '<Textarea aria-label="Message" placeholder="Write with clarity…" />' },
  { name: "Select", slug: "select", group: "Form", description: "A compact choice control with clear focus and selected state.", usage: '<Select defaultValue="warm">…</Select>' },
  { name: "Switch", slug: "switch", group: "Form", description: "A binary setting with visible text, state, and keyboard focus.", usage: '<Switch defaultChecked aria-label="Reduced motion" />' },
  { name: "Checkbox", slug: "checkbox", group: "Form", description: "A compact control for one or more independent selections.", usage: '<Checkbox defaultChecked>Include references</Checkbox>' },
  { name: "Radio Group", slug: "radio-group", group: "Form", description: "A mutually exclusive choice set with native keyboard behavior.", usage: '<RadioGroup defaultValue="warm" options={options} />' },
  { name: "Date Picker", slug: "date-picker", group: "Form", description: "A native, accessible date input in the Manner visual system.", usage: '<DatePicker label="Target date" />' },
  { name: "File Upload", slug: "file-upload", group: "Form", description: "A labeled upload target with selected-file feedback.", usage: '<FileUpload accept="image/*,.pdf" />' },
  { name: "Card", slug: "card", group: "Surface", description: "A restrained bounded surface for content that truly needs grouping.", usage: '<Card><CardHeader>Release readiness</CardHeader><CardContent>82%</CardContent></Card>' },
  { name: "Dialog", slug: "dialog", group: "Surface", description: "A focused temporary layer with an explicit decision path.", usage: '<Dialog>…</Dialog>' },
  { name: "Drawer", slug: "drawer", group: "Surface", description: "A spatially grounded side panel for secondary tasks.", usage: '<Drawer trigger="Open details">…</Drawer>' },
  { name: "Tooltip", slug: "tooltip", group: "Surface", description: "A short accessible label for compact or unfamiliar controls.", usage: '<Tooltip content="Copy source"><button>…</button></Tooltip>' },
  { name: "Tabs", slug: "tabs", group: "Navigation", description: "Switches between related views without losing context.", usage: '<Tabs items={items} defaultValue="preview" />' },
  { name: "Breadcrumb", slug: "breadcrumb", group: "Navigation", description: "Shows location in a shallow, meaningful hierarchy.", usage: '<Breadcrumb items={["Components", "Form", "Field"]} />' },
  { name: "Pagination", slug: "pagination", group: "Navigation", description: "Moves through ordered result pages with clear current state.", usage: '<Pagination page={2} total={5} onPageChange={setPage} />' },
  { name: "Stepper", slug: "stepper", group: "Navigation", description: "Communicates progress through a finite multi-step flow.", usage: '<Stepper current={2} steps={["Connect", "Install", "Verify"]} />' },
  { name: "Alert", slug: "alert", group: "Feedback", description: "A semantic status message with calm hierarchy.", usage: '<Alert title="Registry ready">All checks passed.</Alert>' },
  { name: "Progress", slug: "progress", group: "Feedback", description: "Communicates completion with text and a semantic meter.", usage: '<Progress value={82} label="Release readiness" />' },
  { name: "Skeleton", slug: "skeleton", group: "Feedback", description: "A reduced-motion loading placeholder matching final geometry.", usage: '<Skeleton className="h-10 w-full" />' },
  { name: "Empty State", slug: "empty-state", group: "Feedback", description: "Explains an empty result and offers the next useful action.", usage: '<EmptyState title="No notes yet" action={<Button>Create note</Button>} />' },
  { name: "Surface", slug: "surface", group: "Editorial", description: "Semantic visual grouping without turning every section into a card.", usage: '<Surface tone="inset">…</Surface>' },
  { name: "Section Heading", slug: "section-heading", group: "Editorial", description: "Editorial hierarchy for the beginning of a meaningful section.", usage: '<SectionHeading eyebrow="Foundations" title="Structure before decoration." />' },
  { name: "Note", slug: "note", group: "Editorial", description: "A restrained aside for useful context.", usage: '<Note title="Design with the content">…</Note>' },
  { name: "Quote", slug: "quote", group: "Editorial", description: "A quotation with strong reading rhythm and attribution.", usage: '<Quote cite="Design principle 05">Restraint is a feature.</Quote>' },
  { name: "Timeline", slug: "timeline", group: "Editorial", description: "A compact history for decisions, releases, and progress.", usage: '<Timeline items={items} />' },
  { name: "Metadata", slug: "metadata", group: "Editorial", description: "Dense supporting facts that remain scannable and calm.", usage: '<Metadata items={items} />' },
  { name: "Message", slug: "message", group: "AI interfaces", description: "Conversation content with clear authorship and actions.", usage: '<Message from="assistant">Three patterns match.</Message>' },
  { name: "Composer", slug: "composer", group: "AI interfaces", description: "A flexible prompt input that grows with the thought.", usage: '<Composer onSubmit={send} />' },
  { name: "Reasoning", slug: "reasoning", group: "AI interfaces", description: "Progressive disclosure for intermediate work.", usage: '<Reasoning title="How this was decided">…</Reasoning>' },
  { name: "Tool Call", slug: "tool-call", group: "AI interfaces", description: "A legible operational state for tools and results.", usage: '<ToolCall name="registry.search" status="complete">…</ToolCall>' },
  { name: "Sources", slug: "sources", group: "AI interfaces", description: "Evidence links shown with useful origin context.", usage: '<Sources items={items} />' },
  { name: "Artifact", slug: "artifact", group: "AI interfaces", description: "A focused output surface connected to its conversation.", usage: '<Artifact title="DESIGN.md" type="Markdown">…</Artifact>' },
];

export const catalogGroups: CatalogGroup[] = ["Form", "Surface", "Navigation", "Feedback", "Editorial", "AI interfaces"];
export const componentByName = Object.fromEntries(componentCatalog.map((item) => [item.name, item]));
