import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/site/AuroraBackground";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Journey } from "@/components/site/Journey";
import { Impact } from "@/components/site/Impact";
import { Skills } from "@/components/site/Skills";
import { Cases } from "@/components/site/Cases";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Yatendra Jha — Product Leader | Fintech Platforms & Enterprise AI" },
      {
        name: "description",
        content:
          "14+ years building API-first, multi-tenant lending platforms. ₹40,000+ Cr disbursement across 30+ institutions. Mumbai, India.",
      },
      { property: "og:title", content: "Yatendra Jha — Product Leader" },
      {
        property: "og:description",
        content:
          "Co-lending, underwriting, and enterprise AI. A 14-year journey through fintech.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="dark relative min-h-screen bg-background text-foreground antialiased">
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Journey />
        <Impact />
        <Skills />
        <Cases />
        <Contact />
      </main>
    </div>
  );
}
