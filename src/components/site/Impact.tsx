import { motion } from "framer-motion";
import { SectionHeader } from "./Journey";

const stats = [
  { value: "₹40,000+ Cr", label: "AUM managed across 30+ institutions" },
  { value: "1,00,000+", label: "End customers served" },
  { value: "T+15 → T+1", label: "Payout TAT reduced" },
  { value: "+40%", label: "Lending capacity unlocked" },
  { value: "+18–22%", label: "Loan conversion uplift" },
  { value: "+60%", label: "Operations efficiency" },
];

export function Impact() {
  return (
    <section id="impact" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Impact in numbers" title="Outcomes, not output" />
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8, rotateX: 6, rotateY: 4 }}
              className="glass rounded-2xl p-6 md:p-8 preserve-3d shadow-elevation"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-gradient">{s.value}</p>
              <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
