import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Home, Heart, BookOpen, CalendarDays, Images, Gift, MailCheck } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "couple", label: "Couple", icon: Heart },
  { id: "story", label: "Story", icon: BookOpen },
  { id: "event", label: "Event", icon: CalendarDays },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "gift", label: "Gift", icon: Gift },
  { id: "rsvp", label: "RSVP", icon: MailCheck },
];

export function Navigation() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      aria-label="Navigasi undangan"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 md:top-5 md:bottom-auto"
    >
      <ul className="glass-card flex w-full max-w-md items-center justify-between gap-0.5 rounded-full px-2 py-2 md:w-auto md:max-w-none md:gap-1 md:px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li key={item.id} className="min-w-0 flex-1 md:flex-none">
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex w-full flex-col items-center gap-1 rounded-full px-2 py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:flex-row md:gap-2 md:px-4 ${
                  isActive ? "text-chocolate" : "text-mocha/70 hover:text-chocolate"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-beige/70"
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  />
                )}
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate text-[0.55rem] tracking-[0.14em] uppercase md:text-[0.65rem] md:tracking-[0.2em]">
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
