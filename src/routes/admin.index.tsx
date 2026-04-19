import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/")({
  component: ProfileEditor,
});

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  title: z.string().trim().max(160),
  tagline: z.string().trim().max(200),
  bio: z.string().trim().max(2000),
  location: z.string().trim().max(120),
  email: z.string().trim().email().or(z.literal("")),
  phone: z.string().trim().max(40),
  linkedin: z.string().trim().max(300),
  photo_url: z.string().trim().max(1000),
});

type FormState = z.infer<typeof schema>;

const empty: FormState = {
  name: "",
  title: "",
  tagline: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  linkedin: "",
  photo_url: "",
};

function ProfileEditor() {
  const [form, setForm] = useState<FormState>(empty);
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("profile")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setId(data.id);
          setForm({
            name: data.name,
            title: data.title,
            tagline: data.tagline,
            bio: data.bio,
            location: data.location,
            email: data.email,
            phone: data.phone,
            linkedin: data.linkedin,
            photo_url: data.photo_url,
          });
        }
        setLoading(false);
      });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSaving(true);
    const payload = parsed.data;
    const { error } = id
      ? await supabase.from("profile").update(payload).eq("id", id)
      : await supabase.from("profile").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile saved");
  }

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-gradient">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">Hero details, bio, and photo.</p>

      <form onSubmit={save} className="mt-8 space-y-5">
        <Field label="Name" value={form.name} onChange={(v) => set("name", v)} />
        <Field label="Title" value={form.title} onChange={(v) => set("title", v)} />
        <Field label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} />
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea rows={5} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
        </div>
        <Field label="Location" value={form.location} onChange={(v) => set("location", v)} />
        <Field label="Email" value={form.email} onChange={(v) => set("email", v)} />
        <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
        <Field label="LinkedIn URL" value={form.linkedin} onChange={(v) => set("linkedin", v)} />
        <Field label="Photo URL" value={form.photo_url} onChange={(v) => set("photo_url", v)} />
        {form.photo_url && (
          <img src={form.photo_url} alt="preview" className="h-32 w-32 object-cover rounded-xl border border-border" />
        )}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
