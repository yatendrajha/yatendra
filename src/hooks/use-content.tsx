import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  photo_url: string;
};

export type Milestone = {
  id: string;
  year: string;
  title: string;
  organization: string;
  body: string;
  tag: string;
  sort_order: number;
};

export type Skill = { id: string; name: string; sort_order: number };
export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  bet: string;
  impact: string[];
  accent: string;
  sort_order: number;
};
export type Stat = { id: string; value: string; label: string; sort_order: number };
export type ContactLink = { id: string; label: string; value: string; href: string; sort_order: number };

export function useProfile() {
  const [data, setData] = useState<Profile | null>(null);
  useEffect(() => {
    supabase.from("profile").select("*").limit(1).maybeSingle().then(({ data }) => {
      if (data) setData(data as Profile);
    });
  }, []);
  return data;
}

function useList<T>(table: string) {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    supabase
      .from(table as never)
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setData(data as T[]);
      });
  }, [table]);
  return data;
}

export const useMilestones = () => useList<Milestone>("journey_milestones");
export const useSkills = () => useList<Skill>("skills");
export const useCaseStudies = () => useList<CaseStudy>("case_studies");
export const useStats = () => useList<Stat>("impact_stats");
export const useContactLinks = () => useList<ContactLink>("contact_links");
