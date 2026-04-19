import { createFileRoute } from "@tanstack/react-router";
import { CrudEditor, type FieldDef } from "@/components/admin/CrudEditor";

export const Route = createFileRoute("/admin/contact")({
  component: () => (
    <CrudEditor
      table="contact_links"
      title="Contact Links"
      description="Edit the cards in the contact section."
      fields={fields}
      defaults={{ label: "", value: "", href: "", sort_order: 0 }}
    />
  ),
});

const fields: FieldDef[] = [
  { key: "label", label: "Label", type: "text" },
  { key: "value", label: "Display value", type: "text" },
  { key: "href", label: "Link (mailto:, tel:, https://…)", type: "text" },
  { key: "sort_order", label: "Sort order", type: "number" },
];
