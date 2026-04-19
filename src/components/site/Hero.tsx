import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/yatendra.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 perspective-1000"
    >
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-6xl mx-auto pt-32 pb-20 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              14+ years · Mumbai, India
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] tracking-tight"
          >
            <span className="block text-foreground">Yatendra</span>
            <span className="block text-gradient glow-text">Jha</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            Product leader building <span className="text-foreground">API-first, multi-tenant lending platforms</span>.
            Drove <span className="text-primary font-semibold">₹40,000+ Cr disbursement</span> across 30+ institutions —
            turning regulatory complexity into simple, scalable product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#journey"
              className="group relative overflow-hidden rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow"
            >
              <span className="relative z-10">Explore the journey</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-7 py-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-card transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ scale, rotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative preserve-3d"
        >
          <div className="absolute -inset-8 bg-aurora rounded-[2rem] blur-2xl opacity-70 animate-pulse-glow" />
          <motion.div
            whileHover={{ rotateY: 8, rotateX: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass shadow-elevation preserve-3d"
          >
            <img
              src={portrait}
              alt="Yatendra Jha portrait"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Now</p>
                  <p className="font-display text-base text-foreground">Chief Manager — Transformation</p>
                  <p className="text-xs text-muted-foreground">Avanse Financial Services</p>
                </div>
                <span className="font-mono text-[10px] text-primary">2024 →</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
