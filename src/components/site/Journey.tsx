import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    year: "2011 – 2013",
    title: "The Foundation",
    org: "Lala Lajpat Rai College — BMS",
    body: "Bachelor of Management Studies. Curiosity meets discipline.",
    tag: "Beginnings",
  },
  {
    year: "Early Career",
    title: "Built for scale",
    org: "NCR Corporation — IT Analyst",
    body: "Supported large-scale payment & fintech systems. Learned the cost of every minute of downtime.",
    tag: "Reliability",
  },
  {
    year: "2016 – 2018",
    title: "Product mind",
    org: "L.N. Welingkar Institute — PGDM",
    body: "Frameworks meet field reality. Began thinking in systems, funnels, and unit economics.",
    tag: "Education",
  },
  {
    year: "2018 – 2020",
    title: "Digitizing the fleet",
    org: "Western India Transport Finance — Sr. IT Manager",
    body: "Owned digital transformation of commercial vehicle lending. Grew AUM ₹60 Cr → ₹120 Cr.",
    tag: "Transformation",
  },
  {
    year: "2020",
    title: "Gold, but digital",
    org: "Mangal Credit & Fincorp — AVP Technology",
    body: "Replaced spreadsheet-driven gold-loan processes. 40% faster approvals, 30% fewer errors.",
    tag: "Automation",
  },
  {
    year: "2020 – 2024",
    title: "Platform thinking",
    org: "Dvara Solutions — Business Consultant (Product)",
    body: "Partnered with 30+ Banks & NBFCs. ₹40,000+ Cr AUM managed, 1L+ end customers.",
    tag: "Ecosystem",
  },
  {
    year: "2024 – Now",
    title: "Co-lending, reimagined",
    org: "Avanse Financial Services — Chief Manager, Transformation",
    body: "T+15 → T+1 payouts. +18–22% conversion. +40% lending capacity. API-first, multi-partner.",
    tag: "Today",
  },
];

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section id="journey" ref={ref} className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="The Journey" title="A 14-year arc through fintech" />

        <div className="relative mt-20">
          {/* center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/40 -translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2"
          >
            <div className="h-full w-full bg-gradient-to-b from-primary via-secondary to-accent" />
          </motion.div>

          <ul className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => (
              <Milestone key={m.title} m={m} side={i % 2 === 0 ? "left" : "right"} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Milestone({
  m,
  side,
  index,
}: {
  m: (typeof milestones)[number];
  side: "left" | "right";
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.05 * index }}
      className={`relative grid grid-cols-[2rem_1fr] md:grid-cols-2 gap-6 md:gap-12 items-center ${
        side === "right" ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      {/* dot on the line */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-70 animate-pulse-glow" />
          <div className="relative h-4 w-4 rounded-full bg-primary border-2 border-background" />
        </div>
      </div>

      <div className={`hidden md:block ${side === "right" ? "md:text-left" : "md:text-right"}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{m.year}</p>
      </div>

      <motion.div
        whileHover={{ y: -6, rotateX: 4, rotateY: side === "left" ? 2 : -2 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="glass rounded-2xl p-6 md:p-8 preserve-3d shadow-elevation col-start-2 md:col-auto"
      >
        <p className="md:hidden font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
          {m.year}
        </p>
        <span className="inline-block rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-widest px-2.5 py-1 mb-3">
          {m.tag}
        </span>
        <h3 className="font-display text-2xl font-semibold text-foreground">{m.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{m.org}</p>
        <p className="text-sm text-foreground/80 mt-4 leading-relaxed">{m.body}</p>
      </motion.div>
    </motion.li>
  );
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
        <span className="text-gradient">{title}</span>
      </h2>
    </motion.div>
  );
}
