import { createFileRoute } from "@tanstack/react-router";
import { CrudEditor, type FieldDef } from "@/components/admin/CrudEditor";

export const Route = createFileRoute("/admin/skills")({
  component: () => (
    <CrudEditor
      table="skills"
      title="Skills"
      description="Skills shown in the toolkit section."
      fields={fields}
      defaults={{ name: "", sort_order: 0 }}
    />
  ),
});

const fields: FieldDef[] = [
  { key: "name", label: "Skill", type: "text" },
  { key: "sort_order", label: "Sort order", type: "number" },
];
