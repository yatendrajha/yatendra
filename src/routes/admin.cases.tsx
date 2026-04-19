import { createFileRoute } from "@tanstack/react-router";
import { CrudEditor, type FieldDef } from "@/components/admin/CrudEditor";

export const Route = createFileRoute("/admin/cases")({
  component: () => (
    <CrudEditor
      table="case_studies"
      title="Case Studies"
      description="Edit your highlighted case studies."
      fields={fields}
      defaults={{
        title: "",
        subtitle: "",
        problem: "",
        bet: "",
        impact: [],
        accent: "from-primary to-secondary",
        sort_order: 0,
      }}
    />
  ),
});

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "subtitle", label: "Subtitle", type: "text" },
  { key: "problem", label: "Problem", type: "textarea" },
  { key: "bet", label: "Bet", type: "textarea" },
  { key: "impact", label: "Impact (comma-separated)", type: "stringArray" },
  {
    key: "accent",
    label: "Accent gradient (Tailwind classes)",
    type: "text",
  },
  { key: "sort_order", label: "Sort order", type: "number" },
];
