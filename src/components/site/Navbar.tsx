import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { id: "hero", label: "Home" },
  { id: "journey", label: "Journey" },
  { id: "impact", label: "Impact" },
  { id: "skills", label: "Skills" },
  { id: "cases", label: "Cases" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500",
          scrolled ? "glass shadow-elevation" : "bg-transparent",
        )}
      >
        <a href="#hero" className="font-display text-sm sm:text-base font-bold tracking-tight">
          <span className="text-gradient">YJ</span>
          <span className="text-muted-foreground ml-2 hidden sm:inline">/ Product Leader</span>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden sm:inline rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-card transition-colors"
            >
              Admin
            </Link>
          )}
          <a
            href="#contact"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:shadow-glow transition-shadow"
          >
            Connect
          </a>
        </div>
      </nav>
    </header>
  );
}
