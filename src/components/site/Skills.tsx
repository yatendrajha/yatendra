import { motion } from "framer-motion";
import { SectionHeader } from "./Journey";

const skills = [
  "Product Strategy & Roadmapping",
  "Platform & API-First Architecture",
  "Multi-Partner Ecosystem Platforms",
  "Stakeholder Leadership & Execution",
  "CX Optimization",
  "Automation & Decisioning Systems",
  "Risk & Compliance",
  "Metrics & Funnel Optimization",
  "Experimentation",
  "Enterprise AI (RAG, RBAC)",
  "Co-lending & Underwriting",
  "Regulatory-grade UX",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Toolkit" title="What I bring to the table" />
        <div className="mt-20 flex flex-wrap justify-center gap-3 md:gap-4 perspective-1000">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8, rotateZ: -4 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ scale: 1.08, rotateY: 8, y: -4 }}
              className="glass rounded-full px-5 py-3 text-sm text-foreground shadow-elevation cursor-default"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
