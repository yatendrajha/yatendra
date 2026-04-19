import { createFileRoute } from "@tanstack/react-router";
import { CrudEditor, type FieldDef } from "@/components/admin/CrudEditor";

export const Route = createFileRoute("/admin/journey")({
  component: () => (
    <CrudEditor
      table="journey_milestones"
      title="Journey Milestones"
      description="Edit the timeline of your career milestones."
      fields={fields}
      defaults={{ year: "", title: "", organization: "", body: "", tag: "", sort_order: 0 }}
    />
  ),
});

const fields: FieldDef[] = [
  { key: "year", label: "Year", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "organization", label: "Organization", type: "text" },
  { key: "tag", label: "Tag", type: "text" },
  { key: "body", label: "Body", type: "textarea" },
  { key: "sort_order", label: "Sort order", type: "number" },
];
