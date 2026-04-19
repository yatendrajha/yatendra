import { motion } from "framer-motion";
import { SectionHeader } from "./Journey";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader eyebrow="Let's talk" title="Build something that scales" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Open to product leadership roles, advisory engagements, and conversations on
          platforms, co-lending, and enterprise AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-3 gap-4"
        >
          <ContactCard label="Email" value="hi@yatendrajha.in" href="mailto:hi@yatendrajha.in" />
          <ContactCard label="Phone" value="+91 99679 58271" href="tel:+919967958271" />
          <ContactCard
            label="LinkedIn"
            value="/in/yatendra1990"
            href="https://linkedin.com/in/yatendra1990"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 font-mono text-xs text-muted-foreground"
        >
          Mumbai, India · © {new Date().getFullYear()} Yatendra Jha
        </motion.p>
      </div>
    </section>
  );
}

function ContactCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      whileHover={{ y: -6, rotateX: 6 }}
      className="glass rounded-2xl p-6 preserve-3d shadow-elevation block group"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{label}</p>
      <p className="mt-2 font-display text-base text-foreground group-hover:text-gradient transition-colors break-all">
        {value}
      </p>
    </motion.a>
  );
}
