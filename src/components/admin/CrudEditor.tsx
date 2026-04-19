import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "stringArray";
};

type Row = Record<string, unknown> & { id: string };

type Props = {
  table: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
};

export function CrudEditor({ table, title, description, fields, defaults }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Record<string, unknown>>(defaults);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    const { data, error } = await supabase
      .from(table as never)
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast.error(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  function startEdit(r: Row) {
    setEditingId(r.id);
    const d: Record<string, unknown> = {};
    for (const f of fields) d[f.key] = r[f.key] ?? defaults[f.key];
    setDraft(d);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditingId(null);
    setDraft(defaults);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const v = draft[f.key];
      if (f.type === "number") payload[f.key] = Number(v) || 0;
      else if (f.type === "stringArray")
        payload[f.key] = Array.isArray(v)
          ? v
          : String(v ?? "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
      else payload[f.key] = String(v ?? "");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const op = editingId
      ? sb.from(table).update(payload).eq("id", editingId)
      : sb.from(table).insert(payload);
    const { error } = await op;
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editingId ? "Updated" : "Added");
    reset();
    refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this entry?")) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from(table).delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      refresh();
    }
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-gradient">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </header>

      <form onSubmit={save} className="glass rounded-2xl p-6 space-y-4 max-w-2xl">
        <h2 className="font-semibold">{editingId ? "Edit entry" : "Add new entry"}</h2>
        {fields.map((f) => (
          <FieldInput
            key={f.key}
            field={f}
            value={draft[f.key]}
            onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))}
          />
        ))}
        <div className="flex gap-2">
          <Button type="submit">{editingId ? "Update" : "Add"}</Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={reset}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <section>
        <h2 className="font-semibold mb-4">Entries ({rows.length})</h2>
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground text-sm">No entries yet.</p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className="glass rounded-xl p-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  {fields.slice(0, 3).map((f) => {
                    const v = r[f.key];
                    if (v === undefined || v === null || v === "") return null;
                    const str = Array.isArray(v) ? v.join(", ") : String(v);
                    return (
                      <p key={f.key} className="text-sm truncate">
                        <span className="text-muted-foreground text-xs uppercase tracking-widest mr-2">
                          {f.label}
                        </span>
                        {str}
                      </p>
                    );
                  })}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => startEdit(r)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(r.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Textarea
          rows={4}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
  if (field.type === "number") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Input
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }
  if (field.type === "stringArray") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Input
          value={arr.join(", ")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <Input value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
