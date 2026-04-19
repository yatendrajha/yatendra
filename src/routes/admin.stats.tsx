import { createFileRoute } from "@tanstack/react-router";
import { CrudEditor, type FieldDef } from "@/components/admin/CrudEditor";

export const Route = createFileRoute("/admin/stats")({
  component: () => (
    <CrudEditor
      table="impact_stats"
      title="Impact Stats"
      description="Numbers shown in the impact section."
      fields={fields}
      defaults={{ value: "", label: "", sort_order: 0 }}
    />
  ),
});

const fields: FieldDef[] = [
  { key: "value", label: "Value", type: "text" },
  { key: "label", label: "Label", type: "text" },
  { key: "sort_order", label: "Sort order", type: "number" },
];
