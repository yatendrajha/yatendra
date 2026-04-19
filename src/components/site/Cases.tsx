import { motion } from "framer-motion";
import { SectionHeader } from "./Journey";
import { useCaseStudies } from "@/hooks/use-content";

export function Cases() {
  const cases = useCaseStudies();
  return (
    <section id="cases" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Case studies" title="Bets that paid off" />
        <div className="mt-20 grid md:grid-cols-3 gap-6 perspective-1000">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 60, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -10, rotateX: 4, rotateY: 4 }}
              className="glass rounded-2xl p-7 preserve-3d shadow-elevation relative overflow-hidden group"
            >
              <div
                className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${c.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700`}
              />
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{c.sub}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground leading-snug">
                {c.title}
              </h3>
              <div className="mt-5 space-y-3 text-sm">
                <Row label="Problem" body={c.problem} />
                <Row label="Bet" body={c.bet} />
              </div>
              <div className="mt-6 pt-5 border-t border-border/40 flex flex-wrap gap-2">
                {c.impact.map((ix) => (
                  <span
                    key={ix}
                    className="rounded-full bg-primary/10 text-primary text-[11px] px-2.5 py-1"
                  >
                    {ix}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-foreground/90 mt-1 leading-relaxed">{body}</p>
    </div>
  );
}
