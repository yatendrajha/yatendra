import { useEffect, useRef } from "react";

/**
 * 3D parallax aurora background — multiple gradient orbs that drift,
 * react to cursor, and provide a sense of depth across the entire site.
 */
export function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty("--mx", `${x * 30}px`);
      el.style.setProperty("--my", `${y * 30}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ transform: "translate3d(var(--mx,0), var(--my,0), 0)" }}
    >
      <div className="absolute inset-0 bg-aurora opacity-90" />
      <div
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full animate-drift"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.22 290 / 0.5), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full animate-drift"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.18 60 / 0.45), transparent 70%)",
          filter: "blur(70px)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full animate-drift"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.2 200 / 0.4), transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "-12s",
        }}
      />
      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
